require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

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

// データベース接続
const db = new sqlite3.Database('./contacts.sqlite');

// テーブル作成（アプリケーション起動時に一度だけ実行）
db.run(`CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  requestType TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// 日本時間に変換する関数
function toJapanTime(date) {
  return new Date(date.getTime() + (9 * 60 * 60 * 1000));
}

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
      相談項目: ${requestTypeText}
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
      res.status(200).json({ message: 'メッセージが送信されました' });
    }
  });

  // データベースに保存
  db.run(`INSERT INTO contacts (name, email, requestType, message) VALUES (?, ?, ?, ?)`,
    [name, email, requestType, message],
    function(err) {
      if (err) {
        console.error('Error saving to database:', err);
        res.status(500).json({ error: 'データベースへの保存に失敗しました' });
      } else {
        console.log('Data saved to database');
        // 保存されたデータを即座に取得して確認
        db.get(`SELECT created_at FROM contacts WHERE id = ?`, [this.lastID], (err, row) => {
          if (err) {
            console.error('Error fetching saved data:', err);
          } else {
            const savedJapanTime = toJapanTime(new Date(row.created_at));
            console.log('保存された日本時間:', savedJapanTime.toISOString().replace('T', ' ').substr(0, 19));
          }
        });
        res.status(200).json({ message: 'メッセージが送信され、データベースに保存されました' });
      }
    }
  );
});

// GETリクエストの修正
app.get('/contacts', (req, res) => {
  db.all(`SELECT 
            id,
            name,
            email,
            requestType,
            message,
            created_at
          FROM 
            contacts`, [], (err, rows) => {
    if (err) {
      console.error('Error fetching contacts:', err);
      res.status(500).json({ error: 'データの取得に失敗しました' });
    } else {
      const japanTimeRows = rows.map(row => ({
        ...row,
        created_at_japan: toJapanTime(new Date(row.created_at)).toISOString().replace('T', ' ').substr(0, 19)
      }));
      res.status(200).json(japanTimeRows);
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