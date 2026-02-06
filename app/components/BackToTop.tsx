"use client";

import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShow(latest > 400);
    });
  }, [scrollY]);

  // Listen for mobile menu toggle events from Header
  useEffect(() => {
    const handleMenuToggle = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setMenuOpen(detail?.open ?? false);
    };

    window.addEventListener("mobile-menu-toggle", handleMenuToggle);
    return () =>
      window.removeEventListener("mobile-menu-toggle", handleMenuToggle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && !menuOpen && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-10 h-10 bg-[#171717] text-white flex items-center justify-center hover:bg-[#404040] transition-colors shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
