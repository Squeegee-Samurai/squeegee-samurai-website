import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendApplicationEmail } from '../lib/email.js';

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

  const { name, email, phone, position, experience, availability, message } = req.body;
  if (!name || !email || !phone || !position) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    await sendApplicationEmail({ name, email, phone, position, experience, availability, message });
    return res.status(200).json({ success: true, message: 'Application submitted' });
  } catch (e) {
    console.error('Career email failed:', e);
    return res.status(500).json({ success: false, error: 'Failed to submit application' });
  }
}
