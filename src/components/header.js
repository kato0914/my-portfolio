import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
      <div className="logo-container">
        <img src="/PapaPicelLabs.png" alt="PapaPixelLab Logo" className="logo-icon" />
        <span className="logo-text">PapaPixelLab</span>
      </div>
      <nav>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;