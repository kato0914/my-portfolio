import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = ({ showAnimation }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showAnimation) {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 50);
    }
  }, [showAnimation]);

  return (
    <section id="hero" className="hero">
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <h1>WEB,ITの力を使って<br />あなたの困りごと解決を<br />お手伝いします</h1>
        <p>Web Designer & Coder</p>
      </div>
    </section>
  );
};

export default Hero;