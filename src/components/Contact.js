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
      <div className="section-content">
        <div className="contact-info">
          <p>お問い合わせやお仕事のご相談は、</p>
          <p>下記のコンタクトフォームからお気軽にご連絡ください。</p>
        </div>
        <form>
          <label htmlFor="name">お名前：</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">メールアドレス：</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">メッセージ：</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit">送信</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;