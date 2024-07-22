const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(name, email, message) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `新しいお問い合わせ: ${name}様より`,
    text: `
      名前: ${name}
      メールアドレス: ${email}
      
      メッセージ:
      ${message}
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };