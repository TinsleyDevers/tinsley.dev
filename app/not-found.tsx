"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import SpaceBackground from "@/components/SpaceBackground";

export default function NotFound() {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Delay showing particles for visual effect
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <SpaceBackground />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="relative">
          {/* Error number with glow */}
          <motion.h1
            className="text-8xl md:text-9xl font-bold mb-8 text-center blend-glow"
            data-text="404"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            404
          </motion.h1>

          {/* Particles around 404 */}
          {showParticles && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(to right, #9333ea, #ec4899)"
                        : "linear-gradient(to right, #6366f1, #8b5cf6)",
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center max-w-md"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Page Not Found
          </h2>
          <p className="text-gray-300 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved to another URL.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all inline-flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Return Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
