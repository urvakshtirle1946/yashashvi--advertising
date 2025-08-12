import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import Portfolio from './components/Portfolio.jsx';
import Contact from './components/Contact.jsx';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / totalScroll) * 100;
        setScrollProgress(scrollPercentage);
      });

      // Handle reveal animations
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('active');
        } else {
          reveal.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize scroll position on load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll function for navigation
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll Indicator */}
      <div className="fixed top-0 left-0 h-1 bg-[#FF3D00] transition-all z-50" style={{ width: `${scrollProgress}%` }} />

      <Navbar scrollToSection={scrollToSection} />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />

      {/* Back to Top Button */}
      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-[#FF3D00] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#E63600] transition-all z-50 animate-float"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
