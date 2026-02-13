import { Router, Request, Response } from 'express';
import { sendContactEmail, sendApplicationEmail } from './email.js';

export const contactRouter = Router();

// Validation helpers
const isValidEmail = (email: unknown): boolean => 
  typeof email === 'string' && email.includes('@');

const isValidString = (val: unknown): boolean => 
  typeof val === 'string' && val.trim().length > 0;

/* -------------------------------------------------------------------------- */
/*                                Contact Route                               */
/* -------------------------------------------------------------------------- */

contactRouter.post('/contact', async (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body;

  if (!isValidString(name) || !isValidEmail(email) || !isValidString(subject) || !isValidString(message)) {
    res.status(400).json({ success: false, error: 'Missing required fields' });
    return;
  }

  try {
    await sendContactEmail({ name, email, phone, subject, message });
    res.status(200).json({ success: true, message: 'Message sent' });
  } catch (e) {
    console.error('Contact email failed:', e);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

/* -------------------------------------------------------------------------- */
/*                                Career Route                                */
/* -------------------------------------------------------------------------- */

contactRouter.post('/career', async (req: Request, res: Response) => {
  const { name, email, phone, position, experience, availability, message } = req.body;

  if (!isValidString(name) || !isValidEmail(email) || !isValidString(phone) || !isValidString(position)) {
    res.status(400).json({ success: false, error: 'Missing required fields' });
    return;
  }

  try {
    await sendApplicationEmail({ name, email, phone, position, experience, availability, message });
    res.status(200).json({ success: true, message: 'Application submitted' });
  } catch (e) {
    console.error('Career email failed:', e);
    res.status(500).json({ success: false, error: 'Failed to submit application' });
  }
});
