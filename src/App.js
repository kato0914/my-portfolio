import React, { useEffect } from 'react';
import Header from './components/header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  useEffect(() => {
    const preloadImage = (src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    };

    // ヒーロー画像をプリロード
    preloadImage('/img/hero-background-desktop.webp');
    preloadImage('/img/hero-background-mobile.webp');
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Hero />
        <section id="projects">
          <div className="section-content">
            <h2>Projects</h2>
            <Projects />
          </div>
        </section>
        <section id="about" className="about-section">
          <div className="section-content">
            <h2>About</h2>
            <About />
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="section-content">
            <h2>Contact</h2>
            <Contact />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;