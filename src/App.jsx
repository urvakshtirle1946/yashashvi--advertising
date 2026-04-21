"use client";

import React, { useEffect } from 'react';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import Portfolio from './components/Portfolio.jsx';
import BottomNavBar from './components/ui/bottom-nav-bar';
import { CinematicFooter } from './components/ui/motion-footer';

function App() {
  useEffect(() => {
    const handleScroll = () => {
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
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full bg-background min-h-screen overflow-x-hidden">
      {/*
        MAIN CONTENT AREA
        z-10 sits above the fixed footer underneath.
        min-h-[120vh] + rounded bottom gives the "card sliding away" feel.
      */}
      <main className="relative z-10 w-full min-h-[120vh] bg-white shadow-2xl rounded-b-3xl overflow-hidden">
        <Hero />
        <About />
        <Services />
        <Portfolio />

        {/* Top Navigation */}
        <div className="fixed inset-x-0 top-6 z-50 flex justify-center">
          <BottomNavBar />
        </div>
      </main>

      {/* Cinematic Footer — curtain-reveal beneath the main card */}
      <CinematicFooter />
    </div>
  );
}

export default App;
