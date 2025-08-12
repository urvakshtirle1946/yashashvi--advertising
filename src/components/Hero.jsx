import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const companyName = "Yashashvi Advertising";

  const products = [
    "Billboards",
    "Glow Sign Boards",
    "LED Displays",
    "3D Letters",
    "Shop Signage",
  ];
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [displayProduct, setDisplayProduct] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    let timeout;
    if (!isDeleting) {
      if (displayProduct.length < products[currentProductIndex].length) {
        timeout = setTimeout(() => {
          setDisplayProduct(
            products[currentProductIndex].substring(0, displayProduct.length + 1)
          );
        }, 100);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      if (displayProduct.length > 0) {
        timeout = setTimeout(() => {
          setDisplayProduct(displayProduct.substring(0, displayProduct.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayProduct, currentProductIndex, isDeleting, products]);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.querySelector(".hero-bg");
      if (heroElement) {
        heroElement.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-gray-50 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
          alt="Hero background"
          className="w-full h-full object-cover hero-bg"
        />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        style={{ y, opacity }}
      >
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <motion.span className="text-[#FF3D00]">{companyName}</motion.span>
            <br />
            <span className="inline-flex">
              Provides{" "}
              <span className="relative ml-2 text-[#FF3D00] inline-flex whitespace-nowrap">
                {displayProduct}
                <motion.span
                  className="ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  |
                </motion.span>
              </span>
            </span>
          </motion.h1>
          <motion.p className="text-xl text-gray-200 mb-12 leading-relaxed">
            With over a decade of transforming spaces into powerful branding
            experiences...
          </motion.p>
          <motion.a
            href="#portfolio"
            className="inline-flex items-center gap-2 bg-[#FF3D00] text-white px-8 py-4 rounded-md hover:bg-[#E63600] transition-all transform hover:translate-x-1"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("portfolio").scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            Explore Our Portfolio <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
