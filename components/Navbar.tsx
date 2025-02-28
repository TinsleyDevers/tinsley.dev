// components/Navbar.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="px-6 py-4 flex items-center justify-between bg-transparent relative z-50">
      {/* Title */}
      <motion.h1
        layoutId="siteTitle"
        className="text-xl font-bold blend-glow"
        data-text="{tinsley.dev}"
      >
        {`{tinsley.dev}`}
      </motion.h1>

      {/* Hamburger (shown on mobile, hidden on md+) */}
      <button
        className="md:hidden text-gray-200 hover:text-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {/* Hamburger Icon */}
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          {isOpen ? (
            /* Icon when menu is open */
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
            />
          ) : (
            /* Icon when menu is closed */
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Desktop Nav (hidden on mobile) */}
      <div className="hidden md:flex space-x-6">
        {navItems.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="relative inline-block group text-sm font-semibold text-gray-200 hover:text-gray-50 transition-colors"
          >
            {link.label}
            <span className="absolute left-1/2 -bottom-1 block h-[1px] w-0 underscore-glow transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
          </a>
        ))}
      </div>

      {/* Mobile Dropdown Menu (shown on mobile when isOpen) */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full bg-[#0b1023] border-t border-white/10 md:hidden
                     flex flex-col space-y-2 py-4"
        >
          {navItems.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative group text-sm font-semibold text-gray-200 hover:text-gray-50 transition-colors px-6 py-2"
              onClick={() => setIsOpen(false)} // close menu
            >
              {link.label}
              <span className="absolute left-1/2 -bottom-0.5 block h-[1px] w-0 underscore-glow transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
