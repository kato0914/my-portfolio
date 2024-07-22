require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 5000, // 5秒
  greetingTimeout: 5000 // 5秒
});

app.post('/send-email', (req, res) => {
  const { name, email, requestType, message } = req.body;
  console.log('受信したデータ:', req.body);  // この行を追加

  let requestTypeText;
  switch (requestType) {
    case 'webDesign':
      requestTypeText = 'WEB制作のご相談';
      break;
    case 'appDevelopment':
      requestTypeText = '業務効率化アプリ作成のご相談';
      break;
    case 'other':
      requestTypeText = 'その他';
      break;
    default:
      requestTypeText = '未指定';
  }
  console.log('変換後の requestTypeText:', requestTypeText);  // この行を追加

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: '新しいお問い合わせがありました',
    text: `
      名前: ${name}
      メールアドレス: ${email}
      依頼項目: ${requestTypeText}
      メッセージ: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      res.status(500).json({ error: error.message });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('メッセージが送信されました');
    }
  });
});

// エラーハンドリングミドルウェアを追加
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});