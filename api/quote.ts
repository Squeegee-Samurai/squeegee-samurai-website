/**
 * Vercel Serverless Function: POST /api/quote
 * Handles quote submissions with PDF generation and email delivery
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { PoolClient } from 'pg';
import { pool } from '../lib/db.js';
import { computeQuote, type QuoteBody, type QuoteResult } from '../lib/quoteLogic.js';
// pdfService is dynamically imported below (its .tsx dependency can fail in some bundlers)
import { sendQuoteEmail, sendOwnerNotification } from '../lib/email.js';

// Vercel function configuration (Node.js runtime, extended timeout for PDF generation)
export const config = {
  maxDuration: 30, // seconds (requires Pro plan; Hobby default is 10s)
};

function validateBody(body: unknown): { ok: true; data: QuoteBody } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Request body must be JSON object' };
  }
  const b = body as Record<string, unknown>;
  const contact = b.contact;
  const formInput = b.formInput;
  if (!contact || typeof contact !== 'object') {
    return { ok: false, error: 'Missing or invalid contact' };
  }
  if (!formInput || typeof formInput !== 'object') {
    return { ok: false, error: 'Missing or invalid formInput' };
  }
  const c = contact as Record<string, unknown>;
  const email = typeof c.email === 'string' ? c.email.trim() : '';
  const firstName = typeof c.firstName === 'string' ? c.firstName.trim() : '';
  const lastName = typeof c.lastName === 'string' ? c.lastName.trim() : '';
  if (!email) return { ok: false, error: 'Contact email is required' };
  // firstName/lastName are optional for streamlined commercial flow

  return {
    ok: true,
    data: {
      contact: {
        firstName,
        lastName,
        email,
        phone: typeof c.phone === 'string' ? c.phone.trim() : undefined,
        address: typeof c.address === 'string' ? c.address.trim() : undefined,
        city: typeof c.city === 'string' ? c.city.trim() : undefined,
        zipCode: typeof c.zipCode === 'string' ? c.zipCode.trim() : undefined,
      },
      formInput: formInput as QuoteBody['formInput'],
    },
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers (must be set before any response)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Validate request body
  const validated = validateBody(req.body);
  if (!validated.ok) {
    return res.status(400).json({ success: false, error: validated.error });
  }

  // Compute quote
  let result: QuoteResult;
  try {
    result = computeQuote(validated.data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Quote computation failed';
    return res.status(400).json({ success: false, error: msg });
  }

  // Get database connection
  let client: PoolClient;
  try {
    client = await pool.connect();
  } catch (e) {
    console.error('DB connection failed:', e);
    return res.status(500).json({ success: false, error: 'Database unavailable' });
  }

  let quoteId: string;
  try {
    // Insert quote into database
    const row = await client.query(
      `INSERT INTO quotes (
        first_name, last_name, email, phone, address, city, zip_code,
        property_type, service_type, segment,
        form_input, quote_breakdown, quote_total_cents, image_urls, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'new')
      RETURNING id`,
      [
        validated.data.contact.firstName || 'Commercial',
        validated.data.contact.lastName || 'Lead',
        validated.data.contact.email,
        validated.data.contact.phone ?? null,
        validated.data.contact.address ?? null,
        validated.data.contact.city ?? null,
        validated.data.contact.zipCode ?? null,
        validated.data.formInput.propertyType ?? null,
        validated.data.formInput.serviceType ?? null,
        result.segment ?? null,
        JSON.stringify(validated.data.formInput),
        JSON.stringify(result.breakdown),
        result.totalCents,
        (validated.data.formInput.imageUrls ?? []).length > 0
          ? (validated.data.formInput.imageUrls as string[])
          : null,
      ]
    );
    quoteId = row.rows[0].id;
  } catch (e) {
    console.error('DB insert failed:', e);
    return res.status(500).json({ success: false, error: 'Failed to save quote' });
  } finally {
    client.release();
  }

  // Generate PDF and send emails (failures here don't block the quote)
  let pdfPath: string | null = null;
  let pdfExpiresAt: Date | null = null;

  try {
    // Generate PDF and upload to Supabase Storage (dynamic import to avoid startup crash)
    const { generateAndUploadPDF } = await import('../lib/services/pdfService.js');
    const pdfResult = await generateAndUploadPDF(quoteId, validated.data, result);
    pdfPath = pdfResult.path;
    pdfExpiresAt = pdfResult.expiresAt;

    // Update database with PDF metadata
    const updateClient = await pool.connect();
    try {
      await updateClient.query(
        `UPDATE quotes SET 
          pdf_path = $1, 
          pdf_generated_at = NOW(), 
          pdf_url_expires_at = $2,
          pdf_object_created_at = NOW(),
          signed_url_last_generated_at = NOW(),
          pdf_status = 'generated'
        WHERE id = $3`,
        [pdfPath, pdfExpiresAt, quoteId]
      );

      // Send customer email with PDF link
      const businessName = (validated.data.formInput as any).businessName;
      await sendQuoteEmail(
        validated.data.contact.email,
        businessName,
        pdfResult.signedUrl,
        quoteId,
        pdfExpiresAt
      );

      // Send owner notification
      await sendOwnerNotification(validated.data, result, quoteId, pdfResult.signedUrl);

      // Mark email as sent
      await updateClient.query(
        `UPDATE quotes SET email_sent_at = NOW(), email_status = 'sent' WHERE id = $1`,
        [quoteId]
      );

      console.log(`[quote] Successfully processed quote ${quoteId} with PDF and emails`);
    } finally {
      updateClient.release();
    }
  } catch (e) {
    console.error('PDF/Email failed (quote saved):', e);
    
    // Log error to database for debugging
    const errorClient = await pool.connect();
    try {
      await errorClient.query(
        `UPDATE quotes SET 
          pdf_status = 'failed', 
          email_status = 'failed', 
          email_error = $1 
        WHERE id = $2`,
        [e instanceof Error ? e.message : 'Unknown error', quoteId]
      );
    } finally {
      errorClient.release();
    }
    
    // Don't fail the request - quote is already saved
    console.log('[quote] Continuing despite PDF/email failure - quote saved successfully');
  }

  // Return success response
  return res.status(201).json({
    success: true,
    quoteId,
    total: Math.round(result.totalCents / 100),
    breakdown: result.breakdown,
    message: "Quote received. We'll be in touch within 24 hours.",
  });
}
