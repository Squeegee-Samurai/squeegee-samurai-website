import { Router, Request, Response } from 'express';
import type { PoolClient } from 'pg';
import { pool } from './db.js';
import { computeQuote, type QuoteBody, type QuoteResult } from './quoteLogic.js';
import { sendOwnerNotification } from './email.js';

export const quoteRouter = Router();

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

quoteRouter.post('/quote', async (req: Request, res: Response) => {
  const validated = validateBody(req.body);
  if (!validated.ok) {
    res.status(400).json({ success: false, error: validated.error });
    return;
  }

  let result: QuoteResult;
  try {
    result = computeQuote(validated.data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Quote computation failed';
    res.status(400).json({ success: false, error: msg });
    return;
  }

  let client: PoolClient;
  try {
    client = await pool.connect();
  } catch (e) {
    console.error('DB connection failed:', e);
    res.status(500).json({ success: false, error: 'Database unavailable' });
    return;
  }

  let quoteId: string;
  try {
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
    res.status(500).json({ success: false, error: 'Failed to save quote' });
    return;
  } finally {
    client.release();
  }

  try {
    await sendOwnerNotification(validated.data, result, quoteId);
  } catch (e) {
    console.error('Owner notification failed (quote saved):', e);
  }

  res.status(201).json({
    success: true,
    quoteId,
    total: Math.round(result.totalCents / 100),
    breakdown: result.breakdown,
    message: "Quote received. We'll be in touch within 24 hours.",
  });
});
