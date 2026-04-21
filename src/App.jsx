<<<<<<< HEAD
"use client";

import React, { useEffect } from 'react';
=======
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
>>>>>>> eb141e4b0794902ed9945ed4174e46afd704a8f3
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import Portfolio from './components/Portfolio.jsx';
<<<<<<< HEAD
import BottomNavBar from './components/ui/bottom-nav-bar';
import { CinematicFooter } from './components/ui/motion-footer';

function App() {
  useEffect(() => {
    const handleScroll = () => {
=======
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

>>>>>>> eb141e4b0794902ed9945ed4174e46afd704a8f3
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
<<<<<<< HEAD
=======

    // Initialize scroll position on load
>>>>>>> eb141e4b0794902ed9945ed4174e46afd704a8f3
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

<<<<<<< HEAD
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
=======
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
>>>>>>> eb141e4b0794902ed9945ed4174e46afd704a8f3
    </div>
  );
}

export default App;
