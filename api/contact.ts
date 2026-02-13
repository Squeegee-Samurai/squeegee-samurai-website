import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendContactEmail } from '../lib/email.js';

export const config = {
  maxDuration: 10,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    await sendContactEmail({ name, email, phone, subject, message });
    return res.status(200).json({ success: true, message: 'Message sent' });
  } catch (e) {
    console.error('Contact email failed:', e);
    return res.status(500).json({ success: false, error: 'Failed to send message' });
  }
}
