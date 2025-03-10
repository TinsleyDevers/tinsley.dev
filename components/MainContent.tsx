// components/MainContent.tsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import SplashScreen from "./SplashScreen";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { detectDeviceCapabilities, throttle } from "../utils/performance";

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceCapabilities] = useState(detectDeviceCapabilities());
  const [contentReady, setContentReady] = useState(false);

  // Limit loading state changes to improve performance
  const handleNavigationStart = useCallback(
    throttle(() => {
      setIsLoading(true);
    }, 200),
    []
  );

  useEffect(() => {
    window.addEventListener("beforeunload", handleNavigationStart, {
      passive: true,
    });
    return () =>
      window.removeEventListener("beforeunload", handleNavigationStart);
  }, [handleNavigationStart]);

  // Scroll handler
  useEffect(() => {
    const handleHashChange = throttle((e: HashChangeEvent) => {
      e.preventDefault();
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: deviceCapabilities.prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    }, 100);

    window.addEventListener("hashchange", handleHashChange, { passive: true });
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [deviceCapabilities.prefersReducedMotion]);

  // Handle transition from splash screen to main content
  useEffect(() => {
    if (!showSplash && isInitialRender) {
      // Delay showing the content
      const timer = setTimeout(() => {
        setContentReady(true);
        setIsInitialRender(false);
      }, 100);

      return () => clearTimeout(timer);
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

      {/* Main content with fade-in effect */}
      <motion.div
        className="min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentReady || !isInitialRender ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </motion.div>
    </LayoutGroup>
  );
}
