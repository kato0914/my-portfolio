import React, { lazy, Suspense, useEffect, useState } from 'react';
import Header from './components/header';
import Footer from './components/Footer';
import { loadScript } from './utils/loadScript';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [showHeroAnimation, setShowHeroAnimation] = useState(true);
  const [heroKey, setHeroKey] = useState(0);

  const resetHeroAnimation = () => {
    setShowHeroAnimation(false);
    setHeroKey(prevKey => prevKey + 1);
    setTimeout(() => setShowHeroAnimation(true), 100);
  };

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

    // 重要なスクリプトをプリロード
    const preloadScript = (src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      document.head.appendChild(link);
    };

    preloadScript('https://www.googletagmanager.com/gtag/js?id=G-1WE6MNJQ8N');
    preloadScript('https://www.clarity.ms/tag/nbn3ob3k6i');

    const loadThirdPartyScripts = async () => {
      try {
        await loadScript('https://www.googletagmanager.com/gtag/js?id=G-1WE6MNJQ8N', { async: true });
        await loadScript('https://www.clarity.ms/tag/nbn3ob3k6i', { async: true });
      } catch (error) {
        console.error('サードパーティスクリプトの読み込みに失敗しました:', error);
      }
    };

    loadThirdPartyScripts();

    return () => {
      // クリーンアップ関数（必要に応じて）
    };
  }, []);

  return (
    <div className="App">
      <Header resetHeroAnimation={resetHeroAnimation} />
      <Suspense fallback={<div>Loading...</div>}>
        <main className="main-content">
          <Hero key={heroKey} showAnimation={showHeroAnimation} />
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