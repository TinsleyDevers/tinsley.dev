"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[120px] md:text-[180px] font-bold tracking-tighter leading-none text-[#171717] select-none"
        >
          404
        </motion.div>
        <p className="text-lg text-[#737373] mb-8 -mt-2">
          This page doesn&apos;t exist
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 bg-[#171717] text-white hover:bg-[#404040] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
