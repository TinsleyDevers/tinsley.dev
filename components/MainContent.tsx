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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleNavigationStart = () => {
      setIsLoading(true);
    };
    window.addEventListener("beforeunload", handleNavigationStart);
    return () =>
      window.removeEventListener("beforeunload", handleNavigationStart);
  }, []);

  // Smooth scroll to hash
  useEffect(() => {
    const handleHashChange = (e: HashChangeEvent) => {
      e.preventDefault();
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
