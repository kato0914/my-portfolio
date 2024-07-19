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
    <section id="contact">
      <h2>お問い合わせ</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">お名前：</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">メールアドレス：</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">メッセージ：</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">送信</button>
      </form>
    </section>
  );
}

export default Contact;