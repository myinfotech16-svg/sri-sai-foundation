import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { pool } from '../db.js';

const router = Router();

// Five submissions per IP per fifteen minutes. A public form with no captcha
// will get bot traffic; this keeps the table from filling with junk.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many enquiries from this address. Please try again later.' },
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_ALLOWED_RE = /^[0-9+\-()\s]+$/;

// Strips formatting and an optional +91 / 0 prefix, leaving the 10-digit number.
function normalisePhone(value) {
  let d = (value || '').replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d;
}

function validate(body) {
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const organisation = String(body.organisation || '').trim();
  const message = String(body.message || '').trim();
  const honeypot = String(body.website || '').trim();

  if (honeypot) return { error: 'Rejected.' };
  if (name.length < 2 || name.length > 120) return { error: 'Please enter your name.' };
  if (!EMAIL_RE.test(email) || email.length > 180) return { error: 'Please enter a valid email address.' };
  if (!phone || !PHONE_ALLOWED_RE.test(phone)) return { error: 'Please enter a valid phone number.' };
  if (normalisePhone(phone).length !== 10) return { error: 'Please enter a 10-digit phone number.' };
  if (organisation.length > 180) return { error: 'Organisation name is too long.' };
  if (message.length < 10 || message.length > 5000) return { error: 'Please enter a message of at least 10 characters.' };

  return { data: { name, email, phone, organisation: organisation || null, message } };
}

router.post('/contact', limiter, async (req, res) => {
  const { error, data } = validate(req.body || {});
  if (error) return res.status(400).json({ error });

  try {
    await pool.execute(
      `INSERT INTO enquiries (name, email, phone, organisation, message, ip, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.email,
        data.phone,
        data.organisation,
        data.message,
        req.ip?.slice(0, 45) || null,
        (req.get('user-agent') || '').slice(0, 255) || null,
      ]
    );

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Failed to save enquiry:', err);
    return res.status(500).json({ error: 'Could not save your enquiry. Please email us directly.' });
  }
});

export default router;