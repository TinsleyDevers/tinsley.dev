"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left side - Main content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs uppercase tracking-widest text-[#737373]">
                  Product Manager & Developer
                </span>
                <span className="w-1 h-1 bg-[#d4d4d4] rounded-full" />
                <span className="text-xs uppercase tracking-widest text-[#737373] flex items-center gap-1">
                  <MapPin size={12} />
                  NYC
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
                Tinsley
                <br />
                Devers
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xl md:text-2xl leading-relaxed text-[#737373] max-w-xl"
            >
              Lorem ipsum dolor sit amet{" "}
              <span className="text-[#171717] font-medium">consectetur</span> adipiscing{" "}
              <span className="text-[#171717] font-medium">
                elit, sed
              </span>
              . do eiusmod tempor incididunt{" "}
              <span className="text-[#171717] font-medium">
                ut labore et
              </span>
              .
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 text-sm font-medium px-6 py-3 bg-[#171717] text-white hover:bg-[#404040] transition-colors"
              >
                View Work
                <ArrowDown
                  size={14}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href="#connect"
                className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 border border-[#e5e5e5] hover:border-[#171717] transition-colors"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Right side - Stats/Info (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="border-l border-[#e5e5e5] pl-8 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#a3a3a3] mb-2">
                  Currently
                </p>
                <a
                  href="https://atk.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#525252] hover:text-[#171717] transition-colors inline-flex items-center gap-1 group"
                >
                  Co-founder & CEO at ATK.social
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#a3a3a3] mb-2">
                  Education
                </p>
                <p className="text-sm text-[#525252]">
                  B.B.A. in CIS at Baruch College
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#a3a3a3] mb-2">
                  Focus Areas
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Product Strategy", "User Research", "Python", "Data"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-[#f5f5f5] text-[#525252]"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid grid-cols-2 gap-4 lg:hidden"
        >
          <div className="p-4 border border-[#e5e5e5]">
            <p className="text-[10px] uppercase tracking-widest text-[#a3a3a3] mb-1">
              Currently
            </p>
            <a
              href="https://atk.social"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#525252] hover:text-[#171717] transition-colors"
            >
              CEO @ ATK.social ↗
            </a>
          </div>
          <div className="p-4 border border-[#e5e5e5]">
            <p className="text-[10px] uppercase tracking-widest text-[#a3a3a3] mb-1">
              Education
            </p>
            <p className="text-sm text-[#525252]">Baruch College</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 h-px bg-gradient-to-r from-[#171717] via-[#737373] to-transparent origin-left"
        />
      </div>
    </section>
  );
}
