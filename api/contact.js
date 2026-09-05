import nodemailer from 'nodemailer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort, per-warm-instance rate limiting. Not durable across cold starts
// or multiple instances, but enough to blunt casual spam of this endpoint
// without pulling in a datastore. Tune via env if needed.
const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX || 5);
const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000);
const recentByIp = new Map();

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const hits = (recentByIp.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);
  // Opportunistic cleanup so the map does not grow unbounded.
  if (recentByIp.size > 5000) {
    for (const [key, times] of recentByIp) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentByIp.delete(key);
    }
  }
  return hits.length > RATE_LIMIT_MAX;
}

function clientIp(request) {
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) return forwarded.split(',')[0].trim();
  return request.socket?.remoteAddress || '';
}

/**
 * Only accept submissions that originate from our own site. This is what stops
 * the endpoint being used as an open relay: since we CC the caller-supplied
 * address, an arbitrary external caller must not be able to drive it. Set
 * ALLOWED_ORIGINS (comma-separated) in the environment for production.
 */
function isAllowedOrigin(request) {
  const allowed = String(process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  // No allow-list configured: fail open only in non-production so local dev
  // and previews keep working; in production an unset list blocks by default.
  if (allowed.length === 0) return process.env.NODE_ENV !== 'production';

  const origin = request.headers.origin;
  if (origin) return allowed.includes(origin);

  // Some same-origin requests omit Origin; fall back to the Referer host.
  const referer = request.headers.referer;
  if (referer) {
    try {
      return allowed.includes(new URL(referer).origin);
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * For single-line fields that end up in email headers. Strips every control
 * character so nothing user-supplied can be smuggled into a header.
 */
function clean(value, maxLength) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/** For the message body: keeps newlines and tabs, drops other control chars. */
function cleanMultiline(value, maxLength) {
  return String(value ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  // Reject anything not coming from our own site. Because we CC the
  // caller-supplied email, this prevents the endpoint being abused as an open
  // relay to send mail to arbitrary external recipients.
  if (!isAllowedOrigin(request)) {
    return response.status(403).json({ error: 'Forbidden' });
  }

  if (isRateLimited(clientIp(request))) {
    return response.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const body = request.body || {};

  // Which form sent this? The quote form carries origin/destination and may
  // omit the free-text message, so validation and formatting differ slightly.
  const isQuote = clean(body.formType, 20).toLowerCase() === 'quote'
    || Boolean(body.origin || body.destination || body.service || body.commodity);

  const enquiry = {
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    email: clean(body.email, 254),
    phone: clean(body.phone, 40),
    subject: clean(body.subject, 160),
    service: clean(body.service, 160),
    origin: clean(body.origin, 120),
    destination: clean(body.destination, 120),
    commodity: clean(body.commodity, 200),
    message: cleanMultiline(body.message, 5000),
  };

  // Fields required for every submission, plus form-specific ones.
  const required = isQuote
    ? ['name', 'email', 'phone', 'origin', 'destination']
    : ['name', 'email', 'phone', 'message'];

  if (required.some((field) => !enquiry[field])) {
    return response.status(400).json({ error: 'Please complete all required fields' });
  }

  if (!EMAIL_RE.test(enquiry.email)) {
    return response.status(400).json({ error: 'Please enter a valid email address' });
  }

  const { SMTP_USER, SMTP_APP_PASSWORD, CONTACT_RECIPIENT } = process.env;
  if (!SMTP_USER || !SMTP_APP_PASSWORD || !CONTACT_RECIPIENT) {
    console.error('Contact email service is not configured');
    return response.status(503).json({ error: 'Email service is temporarily unavailable' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: SMTP_USER, pass: SMTP_APP_PASSWORD },
  });

  const receivedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const kind = isQuote ? 'Quote request' : 'Website enquiry';

  // Build the body lines, showing quote-specific fields only for a quote.
  const lines = [
    `Type: ${kind}`,
    `Received: ${receivedAt} IST`,
    '',
    `Name: ${enquiry.name}`,
    `Company: ${enquiry.company || 'Not provided'}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone}`,
  ];

  if (isQuote) {
    lines.push(
      `Origin: ${enquiry.origin}`,
      `Destination: ${enquiry.destination}`,
      `Service: ${enquiry.service || 'Not provided'}`,
      `Commodity: ${enquiry.commodity || 'Not provided'}`
    );
  } else {
    lines.push(`Subject: ${enquiry.subject || 'Not provided'}`);
  }

  lines.push('', enquiry.message || 'No additional message provided.');

  const subjectLabel = isQuote
    ? `Quote request${enquiry.origin && enquiry.destination ? `: ${enquiry.origin} → ${enquiry.destination}` : ''}`
    : `Website enquiry${enquiry.subject ? `: ${enquiry.subject}` : ''}`;

  try {
    await transporter.sendMail({
      from: `"AGL Website Enquiry" <${SMTP_USER}>`,
      to: CONTACT_RECIPIENT,
      // CC the person who submitted the form so both parties get the same email.
      cc: enquiry.email,
      replyTo: enquiry.email,
      subject: `${subjectLabel} — ${enquiry.name} <${enquiry.email}>`,
      text: lines.join('\n'),
    });
  } catch (error) {
    console.error('Contact enquiry email failed', error);
    return response.status(502).json({ error: 'Unable to send your enquiry right now' });
  }

  return response.status(200).json({ ok: true });
}
