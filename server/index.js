import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Send intentions email
app.post('/api/send-intentions', async (req, res) => {
  const { fullName, email, whatsappNumber, intention } = req.body || {};

  if (!fullName || !email || !whatsappNumber || !intention) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const to = process.env.INTENTIONS_TO || process.env.VITE_INTENTIONS_EMAIL;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!to || !from || !user || !pass) {
    return res.status(500).json({
      error: 'Email credentials not configured',
      hint: 'Set SMTP_USER, SMTP_PASS, SMTP_FROM, and INTENTIONS_TO in .env'
    });
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
    res.json({ ok: true });
  } catch (err) {
    console.error('Error sending intentions email:', err);
    let message = 'Failed to send email';
    if (err && err.code === 'EAUTH') {
      message = 'SMTP authentication failed. Check SMTP_USER/SMTP_PASS (Gmail App Password).';
    } else if (err && (err.code === 'ENOTFOUND' || err.code === 'ECONNECTION')) {
      message = 'Unable to connect to Gmail SMTP. Check network/firewall.';
    }
    res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`Intentions server listening on http://localhost:${PORT}`);
});