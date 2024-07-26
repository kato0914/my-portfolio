import React from 'react';
import './Hero.css';

const Hero = React.memo(() => (
  <section id="hero" className="hero">
    <picture>
      <source media="(max-width: 600px)" srcSet="../img/hero-background-mobile.webp" type="image/webp" />
      <source media="(min-width: 601px)" srcSet="../img/hero-background-desktop.webp" type="image/webp" />
    </picture>
    <div className="hero-content">
      <h1>WEB,ITの力を使って<br />あなたの困りごと解決をお手伝いします</h1>
      <p>Web Designer & Coder</p>
    </div>
  </section>
));

export default Hero;