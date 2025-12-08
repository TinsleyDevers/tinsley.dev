"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

const navItems = [
  { name: "Work", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Connect", href: "#connect" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100;

      // Check if at bottom of page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection("connect");
        return;
      }

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/80 backdrop-blur-md border-b border-[#e5e5e5]"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg tracking-tight hover:opacity-60 transition-opacity"
        >
          tinsley.dev
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm px-3 py-1.5 transition-all duration-200 ${
                  isActive
                    ? "text-[#171717] bg-[#f5f5f5] font-medium"
                    : "text-[#737373] hover:text-[#171717] hover:bg-[#f5f5f5]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 text-sm px-3 py-1.5 border border-[#e5e5e5] hover:border-[#171717] hover:bg-[#171717] hover:text-white transition-all duration-200"
          >
            <FileText size={14} />
            <span className="hidden sm:inline">Resume</span>
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
