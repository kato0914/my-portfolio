import React, { useEffect, lazy, Suspense } from 'react';
import Header from './components/header';
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
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

    preloadImage('/img/hero-background-desktop.webp');
    preloadImage('/img/hero-background-mobile.webp');
  }, []);

  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;