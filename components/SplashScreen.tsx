// components/SplashScreen.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const fullText = "ﾠ{tinsley.dev}";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [typingDone, setTypingDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 rounded-full";

      // Randomize particle properties
      const size = Math.random() * 3 + 1;
      const colors = [
        "bg-purple-400",
        "bg-pink-400",
        "bg-blue-400",
        "bg-indigo-400",
      ];
      const colorClass = colors[Math.floor(Math.random() * colors.length)];

      particle.classList.add(colorClass);
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      particle.style.filter = `blur(${Math.random()}px)`;

      // Position randomly around the text
      const angle = Math.random() * Math.PI * 2;
      const radius = 100 + Math.random() * 100;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      particle.style.left = `calc(50% + ${x}px)`;
      particle.style.top = `calc(50% + ${y}px)`;

      // Animation
      const duration = Math.random() * 2 + 2;
      particle.animate(
        [
          {
            transform: `translate(0, 0) scale(1)`,
            opacity: Math.random() * 0.7 + 0.3,
          },
          {
            transform: `translate(${Math.random() * 100 - 50}px, ${
              Math.random() * 100 - 50
            }px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: duration * 1000,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        }
      );

      particlesRef.current?.appendChild(particle);

      setTimeout(() => {
        if (particlesRef.current?.contains(particle)) {
          particlesRef.current.removeChild(particle);
        }
      }, duration * 1000);
    };

    // Only create particles when typing is done
    let interval: NodeJS.Timeout;
    if (typingDone) {
      interval = setInterval(createParticle, 100);

      setTimeout(() => {
        setShowSubtitle(true);
      }, 300);

      // Start transition out after delay
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 1000);
      }, 2200);
    }

    return () => {
      clearInterval(interval);
    };
  }, [typingDone, onComplete]);

  // Typing animation
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === fullText.length) {
        clearInterval(typingInterval);
        setTypingDone(true);
      }
    }, 120);

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 400);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [fullText]);

  // Fake completion
  useEffect(() => {
    if (typingDone) {
      // Show subtitle
      setShowSubtitle(true);
      // Then fade out after a bit
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 1000);
      }, 2200);
    }
  }, [typingDone, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#070b19] to-[#0e1b38]">
      <AnimatePresence>
        {!fadeOut && (
          <motion.div
            className="relative flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Particles container */}
            <div ref={particlesRef} className="absolute inset-0"></div>

            {/* Main text */}
            <div className="relative leading-[1.2] whitespace-nowrap">
              {/* Invisible text */}
              <h1 className="invisible text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.2]">
                {fullText}
              </h1>

              <motion.div
                layoutId="siteTitle"
                className={`
                  absolute inset-0 flex items-center justify-center
                  text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.2]
                  transition-all duration-700
                  ${typingDone ? "blend-glow" : "text-white"}
                `}
                data-text={typingDone ? fullText : undefined}
              >
                {displayedText}
                <span
                  className="animate-pulse"
                  style={{ visibility: showCursor ? "visible" : "hidden" }}
                >
                  _
                </span>
              </motion.div>
            </div>

            {/* Subtitle */}
            <AnimatePresence>
              {showSubtitle && (
                <motion.p
                  className="mt-6 text-sm md:text-base text-gray-300 opacity-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Software Developer & Creative Problem Solver
                </motion.p>
              )}
            </AnimatePresence>

            {/* Pulsing circle behind text */}
            <motion.div
              className="absolute w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: typingDone ? [1, 1.2, 1] : 0.8,
                opacity: typingDone ? 0.6 : 0,
              }}
              transition={{
                duration: 2,
                repeat: typingDone ? Infinity : 0,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
