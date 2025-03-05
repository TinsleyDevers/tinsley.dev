// components/MainContent.tsx
"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);

  // Handle cursor follower (subtle spotlight effect)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Page transition effect
  useEffect(() => {
    const handleNavigationStart = () => {
      setIsLoading(true);
    };

    const handleNavigationComplete = () => {
      setIsLoading(false);
    };

    window.addEventListener("beforeunload", handleNavigationStart);
    return () =>
      window.removeEventListener("beforeunload", handleNavigationStart);
  }, []);

  // Handle hash navigation smoothly
  useEffect(() => {
    const handleHashChange = (e: HashChangeEvent) => {
      e.preventDefault();

      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Smooth scroll
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Reset initial render state after splash screen
  useEffect(() => {
    if (!showSplash && isInitialRender) {
      setIsInitialRender(false);
    }
  }, [showSplash, isInitialRender]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <LayoutGroup>
      {/* FOR CUSTOM SPOTLIGHT RE-ENABLE SOMETIME LATER OK TY */}
      {/* Cursor spotlight effect (subtle)
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40 hidden md:block"
        style={{
          background: `radial-gradient(circle 200px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(139, 92, 246, 0.15), transparent)`,
          transition: "background 0.1s ease",
        }}
      /> */}

      {/* Page transition overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 bg-black pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={isInitialRender ? "initial" : "loaded"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </LayoutGroup>
  );
}
