import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここにフォーム送信のロジックを追加
    console.log('フォームデータ:', formData);
    // フォームをリセット
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div id="contact">
      <div className="contact-content">
        <div className="contact-info">
          <p>お問い合わせやお仕事のご相談は、</p>
          <p>下記のコンタクトフォームからお気軽にご連絡ください。</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">お名前：</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">メールアドレス：</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">メッセージ：</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <div style={{ textAlign: 'center' }}>
            <button type="submit">送信</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;