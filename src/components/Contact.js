import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    requestType: ''
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
    setFormData({
      name: '',
      email: '',
      message: '',
      requestType: ''
    });
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

          <div className="radio-buttons">
            <p>依頼項目：</p>
            <div className="radio-option">
              <input
                type="radio"
                id="graphicDesign"
                name="requestType"
                value="graphicDesign"
                checked={formData.requestType === 'graphicDesign'}
                onChange={handleChange}
                required
              />
              <label htmlFor="graphicDesign">グラフィックデザインのご相談</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="webDesign"
                name="requestType"
                value="webDesign"
                checked={formData.requestType === 'webDesign'}
                onChange={handleChange}
                required
              />
              <label htmlFor="webDesign">WEBデザインのご相談</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="other"
                name="requestType"
                value="other"
                checked={formData.requestType === 'other'}
                onChange={handleChange}
                required
              />
              <label htmlFor="other">その他</label>
            </div>
          </div>

          <label htmlFor="message">メッセージ：</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">送信</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;