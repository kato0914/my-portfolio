const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sendEmail } = require('./emailService');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await sendEmail(name, email, message);
    res.status(200).json({ message: 'メールが送信されました' });
  } catch (error) {
    console.error('メール送信エラー:', error);
    res.status(500).json({ message: 'メール送信に失敗しました' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});