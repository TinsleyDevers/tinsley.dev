// components/Navbar.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const navItems = useMemo(
    () => [
      { label: "Home", href: "#hero", icon: "💫" },
      { label: "About", href: "#about", icon: "👨‍💻" },
      { label: "Skills", href: "#skills", icon: "🛠️" },
      { label: "Projects", href: "#projects", icon: "🚀" },
      { label: "Experience", href: "#experience", icon: "📈" },
      { label: "Education", href: "#education", icon: "🎓" },
      { label: "Contact", href: "#contact", icon: "✉️" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems.map((item) => item.href.substring(1));
      const sectionTops = sections.map((id) => {
        const element = document.getElementById(id);
        return element ? element.offsetTop - 100 : 0;
      });
      const currentPosition = window.scrollY + 100;
      for (let i = sectionTops.length - 1; i >= 0; i--) {
        if (currentPosition >= sectionTops[i]) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 px-6 py-4 flex items-center justify-between z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[#0b1023]/70 shadow-lg shadow-purple-500/10"
          : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.a
        href="#hero"
        layoutId="siteTitle"
        className="text-xl md:text-2xl font-bold blend-glow relative group"
        data-text="{tinsley.dev}"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {`{tinsley.dev}`}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
      </motion.a>

      <motion.button
        className="md:hidden relative w-10 h-10 flex items-center justify-center group"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative w-6 h-6">
          <span
            className={`absolute h-0.5 w-6 bg-white rounded-lg transform transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 bg-white rounded-lg transform transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 bg-white rounded-lg transform transition-all duration-300 ${
              isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            }`}
          ></span>
        </div>
        <span className="absolute inset-0 rounded-full bg-purple-500/20 scale-0 group-hover:scale-100 transition-all duration-300"></span>
      </motion.button>

      <div className="hidden md:flex space-x-1 lg:space-x-2">
        {navItems.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            className={`relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              activeSection === link.href.substring(1)
                ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                : "text-gray-300 hover:text-white"
            } group overflow-hidden`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
              <span className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {link.icon}
              </span>
              {link.label}
            </span>
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 ${
                activeSection === link.href.substring(1)
                  ? "bg-gradient-to-r from-purple-400 to-pink-400"
                  : "bg-white/0 group-hover:bg-gradient-to-r from-purple-400 to-pink-400"
              } transition-all duration-300`}
            ></span>
          </motion.a>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 w-full backdrop-blur-xl bg-[#0b1023]/90 border-t border-white/10 md:hidden flex flex-col py-4 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className={`relative group text-sm font-semibold transition-colors px-6 py-3 flex items-center ${
                  activeSection === link.href.substring(1)
                    ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 ${
                    activeSection === link.href.substring(1)
                      ? "w-full bg-gradient-to-r from-purple-400 to-pink-400"
                      : "w-0 group-hover:w-full bg-gradient-to-r from-purple-400 to-pink-400"
                  } transition-all duration-300`}
                ></span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:flex absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg"></div>
    </motion.nav>
  );
}
