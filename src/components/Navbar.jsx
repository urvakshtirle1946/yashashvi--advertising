import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Briefcase, Layers, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      setScrolled(window.scrollY > 20);
      setVisible(!(window.scrollY > lastScrollY && window.scrollY > 300));
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: '#home', label: 'Home', icon: <Home size={18} /> },
    { href: '#about', label: 'About', icon: <Info size={18} /> },
    { href: '#services', label: 'Services', icon: <Briefcase size={18} /> },
    { href: '#portfolio', label: 'Portfolio', icon: <Layers size={18} /> },
    { href: '#contact', label: 'Contact', icon: <Mail size={18} /> }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href.substring(1));
    setIsOpen(false);
  };

  return (
    <motion.nav 
      className="fixed w-full z-50 bg-[#FF3D00] shadow-md py-0.5"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
        
        {/* Compact Logo */}
        <motion.div 
          className="flex-shrink-0 bg-[#FF3D00] px-2 py-1 rounded-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img 
            src="/logo1.png"
            alt="Yashashvi Advertising"
            className="h-12 w-auto"
          />
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3">
          {navLinks.map(({ href, label, icon }, index) => (
            <motion.a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`flex items-center gap-1 px-3 py-1 text-sm font-medium text-white transition-all duration-300 ${
                activeSection === href.slice(1) ? 'font-semibold' : 'opacity-80 hover:opacity-100'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {icon} {label}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-white/90 focus:outline-none"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden absolute w-full bg-[#FF3D00] shadow-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(({ href, label, icon }, index) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="flex items-center gap-2 px-3 py-2 text-base font-medium text-white transition-all duration-300 opacity-80 hover:opacity-100"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  {icon} {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
