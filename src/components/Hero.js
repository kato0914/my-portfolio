import React from 'react';
import './Hero.css';

const Hero = React.memo(() => (
  <section id="hero" className="hero">
    <div className="hero-content">
      <h1>WEB,ITの力を使って<br />あなたの困りごと解決をお手伝いします</h1>
      <p>Web Designer & Coder</p>
    </div>
  </section>
));

export default Hero;