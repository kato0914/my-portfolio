import React, { lazy, Suspense, useEffect } from 'react';
import Header from './components/header';
import Footer from './components/Footer';
import { loadScript } from './utils/loadScript';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

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

    const loadThirdPartyScripts = async () => {
      try {
        await loadScript('https://www.googletagmanager.com/gtag/js?id=G-1WE6MNJQ8N', { async: true });
        await loadScript('https://www.clarity.ms/tag/nbn3ob3k6i', { async: true });
        // 他のサードパーティスクリプトもここに追加
      } catch (error) {
        console.error('サードパーティスクリプトの読み込みに失敗しました:', error);
      }
    };

    // ページの主要なコンテンツが読み込まれた後にスクリプトを読み込む
    document.addEventListener('DOMContentLoaded', loadThirdPartyScripts);

    return () => {
      window.removeEventListener('load', loadThirdPartyScripts);
    };
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
      <Footer />
    </div>
  );
}

export default App;