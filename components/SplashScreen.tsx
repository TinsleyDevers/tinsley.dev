// components/SplashScreen.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const fullText = "{tinsley.dev}";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === fullText.length) {
        clearInterval(typingInterval);
        setTypingDone(true);
        setTimeout(onComplete, 1000);
      }
    }, 150);

    // blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [fullText, onComplete]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative text-center">
        {/* 1) Invisible layer to reserve final size */}
        <h1 className="invisible text-4xl font-bold">{fullText}</h1>

        {/* 2) Actual typed text (plain color first, then glow) */}
        <motion.h1
          /* layoutId for shared layout animation to the Navbar */
          layoutId="siteTitle"
          className={`
            absolute inset-0 flex items-center justify-center
            text-4xl font-bold transition-colors duration-700
            ${typingDone ? "blend-glow" : "text-white"}
          `}
          data-text={typingDone ? fullText : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {displayedText}
          {showCursor && <span>_</span>}
        </motion.h1>
      </div>
    </div>
  );
}
