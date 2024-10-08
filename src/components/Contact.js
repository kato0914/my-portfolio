import React, { useState, useRef, useEffect } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requestType: '',
    message: '',
    agreeToTerms: false
  });
  const [showAlert, setShowAlert] = useState(false);
  const alertRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (showAlert && alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showAlert]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (type === 'checkbox' && checked) {
      setShowAlert(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.requestType || !formData.message) {
      alert('すべての必須フィールドを入力してください。');
      return;
    }
    if (!formData.agreeToTerms) {
      setShowAlert(true);
      return;
    }
    setIsSubmitting(true);
    setIsActive(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();
        if (response.ok) {
          console.log(result);
          setSubmitSuccess(true);
          setFormData({
            name: '',
            email: '',
            requestType: '',
            message: '',
            agreeToTerms: false
          });
          setIsActive(false);
        } else {
          throw new Error(result.error || 'サーバーエラーが発生しました');
        }
      } else {
        // JSONでない場合はテキストとして読み取る
        const text = await response.text();
        if (response.ok) {
          setSubmitSuccess(true);
          setFormData({
            name: '',
            email: '',
            requestType: '',
            message: '',
            agreeToTerms: false
          });
        } else {
          throw new Error(text || 'サーバーエラーが発生しました');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitError(`メッセージの送信に失敗しました: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 380);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div id="contact">
      <div className="contact-content">
        <form onSubmit={onSubmit}>
          <label htmlFor="name">お名前<a className="required">*</a></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">メールアドレス<a className="required">*</a></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="radio-buttons">
            <p>相談項目<a className="required">*</a></p>
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
              <label htmlFor="webDesign">WEB制作のご相談</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="appDevelopment"
                name="requestType"
                value="appDevelopment"
                checked={formData.requestType === 'appDevelopment'}
                onChange={handleChange}
                required
              />
              <label htmlFor="appDevelopment">業務効率化アプリ作成のご相談</label>
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

          <label htmlFor="message">お問合せ内容<a className="required">*</a></label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <div className="terms-agreement">
            <h4>個人情報の取り扱いについて</h4>
            <p>
              ご記入いただいた個人情報は、<br />
              お問い合わせへの対応及び確認のためのみに利用します。
            </p>
            <div className="checkbox-wrapper">
              <label>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <span>同意する</span>
              </label>
            </div>
            {showAlert && (
              <div className="alert" ref={alertRef}>
                個人情報の取り扱いに同意してください。
              </div>
            )}
          </div>

          {submitSuccess && <p className="success-message">メッセージが正常に送信されました。</p>}
          {submitError && <p className="error-message">{submitError}</p>}
          <div className={`fancy-button ${isActive ? 'active' : ''}`}>
            <div className="frills left-frills"></div>
            <button 
              className="button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? '送信中...' : isSubmitted ? '送信完了！' : '送信'}
            </button>
            <div className="frills right-frills"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;