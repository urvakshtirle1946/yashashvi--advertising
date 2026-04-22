"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  LayoutGrid,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, href: "home" },
  { label: "About", icon: User, href: "about" },
  { label: "Services", icon: LayoutGrid, href: "services" },
  { label: "Portfolio", icon: Image, href: "portfolio" },
];

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState(navItems[0].label);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.href));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(navItems[i].label);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, label: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 0; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTab(label);
    }
  };

  return (
    <div className="flex items-center justify-center px-2">
      <nav className="flex items-center gap-0.5 sm:gap-1 p-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg">
        {navItems.map((item) => {
          const isActive = activeTab === item.label;

          return (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href, item.label)}
              className={cn(
                "relative flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors rounded-full",
                isActive
                  ? "text-[#FF3D00]"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#FF3D00]/10 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
