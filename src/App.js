import React from 'react';
import Header from './components/header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="header-spacer"></div>
      <main className="main-content">
        <section id="projects" className="projects-section">
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