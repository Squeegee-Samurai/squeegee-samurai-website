import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendOwnerEstimateEmail, sendCustomerConfirmationEmail } from '../lib/email.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS wrappers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid request payload.' });
  }

  const { customer, property, estimate, timestamp } = body;

  const errors: string[] = [];
  if (!customer?.name || typeof customer.name !== 'string') errors.push('customer.name is required');
  if (!customer?.email || typeof customer.email !== 'string') errors.push('customer.email is required');
  if (!property?.address || typeof property.address !== 'string') errors.push('property.address is required');
  if (!['residential', 'commercial'].includes(property?.type)) errors.push('property.type must be residential or commercial');
  if (!Array.isArray(estimate?.line_items)) errors.push('estimate.line_items must be an array');
  if (typeof estimate?.total !== 'number') errors.push('estimate.total must be a valid number');
  if (!timestamp || typeof timestamp !== 'string') errors.push('timestamp must be a valid ISO string');

  if (errors.length > 0) {
    return res.status(400).json({ ok: false, error: 'Invalid request payload.', details: errors });
  }

  try {
    // Owner email is authoritative
    await sendOwnerEstimateEmail(body);

    let warning;
    if (process.env.ENABLE_CUSTOMER_CONFIRMATION === 'true') {
      try {
        await sendCustomerConfirmationEmail(body);
      } catch (e) {
        warning = 'Owner email sent, but customer confirmation email failed.';
        console.error('[email] Customer confirmation failed:', e);
      }
    }

    if (warning) {
      return res.status(200).json({
        ok: true,
        message: 'Estimate submitted successfully.',
        warning,
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Estimate submitted successfully.',
    });
  } catch (e) {
    console.error('[email] Owner email failed:', e);
    return res.status(500).json({ ok: false, error: 'Failed to submit estimate.' });
  }
}
