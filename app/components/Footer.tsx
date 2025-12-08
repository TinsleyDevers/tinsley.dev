"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const links = [
  {
    name: "GitHub",
    href: "https://github.com/tinsleydevers",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tinsley-devers-40820a1b9/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:contact@tinsley.dev",
    icon: Mail,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Footer() {
  return (
    <footer
      id="connect"
      className="py-24 px-8 md:px-12 border-t border-[#e5e5e5]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Left column */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-widest text-[#737373] mb-3 block">
                Connect
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Let&apos;s build
                <br />
                something great
              </h2>
              <p className="text-lg text-[#737373] max-w-md">
                Looking for opportunities. Let&apos;s chat about how we can work
                together.
              </p>
            </motion.div>
          </div>

          {/* Right column - Links */}
          <div className="lg:col-span-6 flex items-end">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              {links.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  variants={itemVariants}
                  className="group flex items-center gap-3 px-6 py-4 border border-[#e5e5e5] hover:border-[#171717] hover:bg-[#171717] hover:text-white transition-all duration-300"
                >
                  <link.icon size={18} />
                  <span className="font-medium">{link.name}</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-[#e5e5e5] flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <p className="text-sm text-[#737373]">
            © {new Date().getFullYear()} Tinsley Devers
          </p>
          <p className="text-sm text-[#a3a3a3]">
            Built with Next.js, TypeScript & Tailwind
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
