"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { FileText } from "lucide-react";

const navItems = [
  { name: "Work", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Connect", href: "#connect" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll + notify other components when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    window.dispatchEvent(
      new CustomEvent("mobile-menu-toggle", { detail: { open: mobileOpen } })
    );
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100;

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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/80 backdrop-blur-md border-b border-[#e5e5e5]"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-lg tracking-tight hover:opacity-60 transition-opacity relative z-50"
          >
            tinsley.dev
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
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
              Resume
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden relative z-50 py-1.5 px-3 border border-[#e5e5e5] hover:border-[#171717] transition-colors duration-200"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="text-[10px] uppercase tracking-widest font-medium text-[#171717] block"
                >
                  Close
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="text-[10px] uppercase tracking-widest font-medium text-[#737373] block"
                >
                  Menu
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-[#ffffff] flex flex-col"
          >
            {/* Content area — offset below header */}
            <div className="flex-1 flex flex-col justify-center px-8 pb-16">
              <motion.nav
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                  },
                }}
                className="space-y-1"
              >
                {navItems.map((item) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <motion.div
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className={`block py-3 border-b border-[#e5e5e5] transition-colors duration-200 ${
                          isActive
                            ? "text-[#171717]"
                            : "text-[#737373] hover:text-[#171717]"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span className="text-3xl font-bold tracking-tight">
                            {item.name}
                          </span>
                          {isActive && (
                            <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 bg-[#171717] text-white">
                              Current
                            </span>
                          )}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Resume link */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="pt-6"
                >
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleNavClick}
                    className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 bg-[#171717] text-white hover:bg-[#404040] transition-colors"
                  >
                    <FileText size={14} />
                    Resume
                  </a>
                </motion.div>
              </motion.nav>
            </div>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="px-8 pb-8 flex items-center justify-between"
            >
              <span className="text-xs uppercase tracking-widest text-[#a3a3a3]">
                NYC
              </span>
              <span className="text-xs text-[#a3a3a3]">
                contact@tinsley.dev
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
