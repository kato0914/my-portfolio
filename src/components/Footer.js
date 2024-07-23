import React from 'react';
import './Footer.css';
import logoIcon from '../img/PapaPixelLabs.svg';

const Footer = () => {
  return (
    <footer>
      <img src={logoIcon} alt="Papa Pixel Lab Logo" className="footer-logo" />
      <p className="footer-text">© Papa Pixel Lab</p>
    </footer>
  );
};

export default Footer;