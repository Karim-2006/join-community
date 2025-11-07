import nodemailer from 'nodemailer';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const headers = { 'Content-Type': 'application/json' };

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { fullName, email, whatsappNumber, intention } = body || {};

  if (!fullName || !email || !whatsappNumber || !intention) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  const to = process.env.INTENTIONS_TO || process.env.VITE_INTENTIONS_EMAIL;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const user = process.env.SMTP_USER;
  const pass = (process.env.SMTP_PASS || '').replace(/\s/g, '');

  if (!to || !from || !user || !pass) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Email credentials not configured',
        hint: 'Set SMTP_USER, SMTP_PASS, SMTP_FROM, and INTENTIONS_TO in Netlify environment.'
      })
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    const subject = `New community join intention - ${fullName}`;
    const text = `Name: ${fullName}\nEmail: ${email}\nWhatsApp: ${whatsappNumber}\n\nIntentions:\n${intention}`;

    await transporter.sendMail({ from, to, subject, text });
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    let message = 'Failed to send email';
    if (err && err.code === 'EAUTH') {
      message = 'SMTP authentication failed. Check Gmail App Password.';
    } else if (err && (err.code === 'ENOTFOUND' || err.code === 'ECONNECTION')) {
      message = 'Unable to connect to Gmail SMTP.';
    }
    return { statusCode: 500, headers, body: JSON.stringify({ error: message }) };
  }
}