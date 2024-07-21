import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('送信中...');
    try {
      await axios.post('http://localhost:3001/api/send-email', formData);
      setStatus('メッセージが送信されました。');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('送信に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">お名前：</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        autocomplete="name"
      />

      <label htmlFor="email">メールアドレス：</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        autocomplete="email"
      />

      <label htmlFor="message">メッセージ：</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        autocomplete="off"
      ></textarea>

      <button type="submit">送信</button>
      {status && <p>{status}</p>}
    </form>
  );
}

export default ContactForm;