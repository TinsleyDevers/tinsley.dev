"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface Project {
  slug: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    slug: "calhoun-rmp",
    title: "CalhounRMP",
    description:
      "Chrome extension that displays Rate My Professors ratings directly on the Calhoun Community College class registration page, helping students make informed decisions.",
    year: "2024",
    tags: ["JavaScript", "Chrome Extension", "User Research"],
  },
  {
    slug: "excelbnb",
    title: "Excelbnb",
    description:
      "Turns Airbnb pages into an Excel spreadsheet to easily sort through listings, streamlining the property research process for users.",
    year: "2024",
    tags: ["Python", "Data Processing", "Automation"],
  },
  {
    slug: "zone7-utility",
    title: "Zone7 Utility",
    description:
      "Minecraft Java plugin built for the Zone7 server (zone7.apexmc.co), enhancing player experience with custom utilities.",
    year: "2024",
    tags: ["Java", "Plugin Development", "User Experience"],
  },
  {
    slug: "tinsley-dev",
    title: "tinsley.dev",
    description:
      "Personal portfolio website showcasing projects and skills with a focus on clean design and smooth user experience.",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
  },
];

// CalhounRMP Chrome Extension Visual
function RMPVisual() {
  const courses = [
    {
      code: "ENG 101",
      prof: "Johnson, M",
      rating: "4.8",
      difficulty: "2.1",
      takeAgain: "95%",
      status: "good",
    },
    {
      code: "MTH 112",
      prof: "Williams, K",
      rating: "3.1",
      difficulty: "4.2",
      takeAgain: "45%",
      status: "mid",
    },
    {
      code: "CS 201",
      prof: "Davis, R",
      rating: "4.5",
      difficulty: "3.0",
      takeAgain: "89%",
      status: "good",
    },
    {
      code: "HIS 101",
      prof: "Brown, S",
      rating: "2.4",
      difficulty: "3.8",
      takeAgain: "32%",
      status: "bad",
    },
  ];

  return (
    <div className="absolute inset-0 bg-[#f5f5f5] overflow-hidden">
      {/* Calhoun header bar */}
      <div className="h-10 bg-[#003594] flex items-center px-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">CC</span>
          </div>
          <span className="text-[11px] text-white font-semibold">
            Calhoun Community College
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="px-2 py-1 bg-[#1a4a8a] rounded-sm flex items-center gap-1"
          >
            <span className="text-[8px] text-white font-medium">RMP</span>
            <span className="text-[7px] text-white/80">Active</span>
          </motion.div>
        </div>
      </div>

      {/* Page title */}
      <div className="px-4 py-2 border-b border-[#e0e0e0] bg-white">
        <span className="text-[10px] font-semibold text-[#333]">
          Course Registration - Fall 2024
        </span>
      </div>

      {/* Course table */}
      <div className="px-3 py-2">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-1 text-[8px] font-semibold text-[#666] mb-1 px-2">
          <div className="col-span-2">Course</div>
          <div className="col-span-3">Instructor</div>
          <div className="col-span-2 text-center">Rating</div>
          <div className="col-span-2 text-center">Difficulty</div>
          <div className="col-span-3 text-center">Take Again</div>
        </div>

        {/* Course rows */}
        <div className="space-y-1">
          {courses.map((course, i) => (
            <motion.div
              key={course.code}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="grid grid-cols-12 gap-1 text-[9px] bg-white border border-[#e0e0e0] p-2 items-center"
            >
              <div className="col-span-2 font-medium text-[#333]">
                {course.code}
              </div>
              <div className="col-span-3 text-[#666]">{course.prof}</div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                className="col-span-2 flex justify-center"
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                    course.status === "good"
                      ? "bg-[#22c55e]/15 text-[#22c55e]"
                      : course.status === "mid"
                      ? "bg-[#f59e0b]/15 text-[#f59e0b]"
                      : "bg-[#ef4444]/15 text-[#ef4444]"
                  }`}
                >
                  ★ {course.rating}
                </span>
              </motion.div>
              <div className="col-span-2 text-center text-[#666]">
                {course.difficulty}
              </div>
              <div className="col-span-3 text-center">
                <span
                  className={`text-[8px] ${
                    parseInt(course.takeAgain) > 70
                      ? "text-[#22c55e]"
                      : parseInt(course.takeAgain) > 50
                      ? "text-[#f59e0b]"
                      : "text-[#ef4444]"
                  }`}
                >
                  {course.takeAgain}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Extension popup hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-3 right-3 bg-white border border-[#e0e0e0] shadow-lg p-2 w-32"
      >
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-4 h-4 bg-[#003594] rounded-sm flex items-center justify-center">
            <span className="text-[6px] font-bold text-white">R</span>
          </div>
          <span className="text-[8px] font-semibold">CalhounRMP</span>
        </div>
        <div className="text-[7px] text-[#666]">Ratings shown!</div>
      </motion.div>
    </div>
  );
}

// Excel Grid Visual for Excelbnb
function ExcelVisual() {
  const headers = ["", "A", "B", "C", "D", "E"];
  const data = [
    ["1", "$299", "Miami, FL", "★★★★☆", "2BR", "Superhost"],
    ["2", "$185", "Austin, TX", "★★★★★", "1BR", "Guest fav"],
    ["3", "$415", "New York", "★★★★★", "1BR", "Superhost"],
    ["4", "$156", "Denver, CO", "★★☆☆☆", "1BR", "New"],
    ["5", "$245", "Seattle", "★★★★★", "2BR", "Superhost"],
    ["6", "$189", "Portland", "★★★☆☆", "1BR", "Plus"],
    ["7", "$385", "San Diego", "★★★★★", "3BR", "Superhost"],
    ["8", "$210", "Phoenix", "★★★★☆", "2BR", "Guest fav"],
  ];

  return (
    <div className="absolute inset-0 bg-[#217346] overflow-hidden">
      {/* Excel ribbon */}
      <div className="h-7 bg-[#217346] flex items-center px-3 border-b border-[#1a5c38]">
        <span className="text-[10px] text-white/90 font-medium">
          airbnb_listings.xlsx - Excel
        </span>
      </div>

      {/* Formula bar */}
      <div className="h-6 bg-[#f3f3f3] flex items-center px-2 border-b border-[#d4d4d4]">
        <span className="text-[9px] text-[#737373] font-mono px-2 border-r border-[#d4d4d4]">
          fx
        </span>
        <div className="ml-2 text-[9px] text-[#171717] font-mono">
          =VLOOKUP(A2, listings, 3, FALSE)
        </div>
      </div>

      {/* Spreadsheet area */}
      <div className="absolute top-[52px] left-0 right-0 bottom-0 bg-white">
        {/* Header row */}
        <div className="flex border-b border-[#d4d4d4] bg-[#f6f6f6]">
          {headers.map((header, i) => (
            <div
              key={i}
              className={`text-[9px] font-medium text-center py-1.5 border-r border-[#d4d4d4] text-[#666] ${
                i === 0 ? "w-8 bg-[#f6f6f6]" : "flex-1"
              }`}
            >
              {header}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {data.map((row, rowIdx) => (
          <motion.div
            key={rowIdx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 + rowIdx * 0.05 }}
            className="flex border-b border-[#e8e8e8]"
          >
            {row.map((cell, colIdx) => (
              <div
                key={colIdx}
                className={`text-[9px] py-1 px-1.5 border-r border-[#e8e8e8] truncate ${
                  colIdx === 0
                    ? "w-8 bg-[#f6f6f6] text-center text-[#666] font-medium"
                    : colIdx === 1
                    ? "flex-1 text-[#217346] font-semibold"
                    : "flex-1 text-[#333]"
                }`}
              >
                {cell}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Minecraft Visual
function MinecraftVisual() {
  const chatMessages = [
    { type: "join", player: "Steve", msg: "joined the game" },
    { type: "chat", player: "Zone7Admin", msg: "Welcome to Zone7!" },
    { type: "cmd", player: "Alex", msg: "/z7 help" },
    {
      type: "system",
      player: "",
      msg: "[Zone7] Commands: /z7 spawn, /z7 home, /z7 tp",
    },
    { type: "chat", player: "Steve", msg: "Thanks! This plugin is great" },
    { type: "cmd", player: "Steve", msg: "/z7 spawn" },
    { type: "system", player: "", msg: "[Zone7] Teleporting to spawn..." },
  ];

  return (
    <div className="absolute inset-0 bg-[#2b2b2b] overflow-hidden">
      {/* Minecraft title bar */}
      <div className="h-8 bg-[#1a1a1a] flex items-center px-3 gap-2 border-b border-[#3d3d3d]">
        <span className="text-[11px] text-[#8b8b8b] font-medium">
          Minecraft 1.20.4 - Zone7 Server
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[9px] text-[#5a5a5a]">zone7.apexmc.co</span>
          <div className="w-2 h-2 bg-[#27ca3f] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Game viewport background */}
      <div className="absolute top-8 left-0 right-0 bottom-0">
        {/* Gradient sky background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a5c] via-[#2d5a7b] to-[#3d7a9b]" />

        {/* Stars */}
        {[
          { top: 12, left: 15, delay: 0 },
          { top: 25, left: 35, delay: 0.3 },
          { top: 18, left: 55, delay: 0.6 },
          { top: 30, left: 75, delay: 0.9 },
          { top: 15, left: 90, delay: 1.2 },
          { top: 35, left: 25, delay: 1.5 },
          { top: 22, left: 65, delay: 1.8 },
          { top: 40, left: 45, delay: 2.1 },
        ].map((star, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: star.delay,
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
            }}
          />
        ))}

        {/* Moon */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 right-10 w-12 h-12 bg-[#e8e8e0] rounded-full shadow-[0_0_30px_rgba(232,232,224,0.4)]"
        >
          <div className="absolute top-2 left-2 w-3 h-3 bg-[#d0d0c8] rounded-full opacity-60" />
          <div className="absolute top-5 right-3 w-2 h-2 bg-[#d0d0c8] rounded-full opacity-40" />
        </motion.div>

        {/* Chat overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
          <div className="space-y-0.5">
            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-[10px] font-mono"
              >
                {msg.type === "join" && (
                  <span className="text-[#ffff55]">
                    {msg.player} {msg.msg}
                  </span>
                )}
                {msg.type === "chat" && (
                  <>
                    <span className="text-white">&lt;{msg.player}&gt;</span>
                    <span className="text-[#aaaaaa]"> {msg.msg}</span>
                  </>
                )}
                {msg.type === "cmd" && (
                  <span className="text-[#aaaaaa]">
                    {msg.player}: {msg.msg}
                  </span>
                )}
                {msg.type === "system" && (
                  <span className="text-[#55ff55]">{msg.msg}</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Chat input */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-2 flex items-center bg-black/50 border border-white/20 px-2 py-1"
          >
            <span className="text-[10px] text-white/60 font-mono">&gt;</span>
            <span className="text-[10px] text-white/80 font-mono ml-1">
              /z7{" "}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-1.5 h-3 bg-white/80 ml-0.5"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Code Terminal Visual
function TerminalVisual() {
  const codeLines = [
    { text: "// Building portfolio...", color: "#6A9955" },
    { text: "import { motion } from 'framer-motion'", color: "#C586C0" },
    { text: "import { NextPage } from 'next'", color: "#C586C0" },
    { text: "", color: "" },
    { text: "const Portfolio: NextPage = () => {", color: "#DCDCAA" },
    { text: "  return (", color: "#D4D4D4" },
    { text: "    <motion.main", color: "#569cd6" },
    { text: "      initial={{ opacity: 0 }}", color: "#9CDCFE" },
    { text: "      animate={{ opacity: 1 }}", color: "#9CDCFE" },
    { text: "    >", color: "#569cd6" },
  ];

  return (
    <div className="absolute inset-0 bg-[#1e1e1e] overflow-hidden flex flex-col">
      {/* VS Code title bar */}
      <div className="h-6 bg-[#323232] flex items-center px-3 gap-2 flex-shrink-0">
        <span className="text-[9px] text-[#808080]">
          page.tsx — tinsley.dev
        </span>
      </div>

      {/* Tab bar */}
      <div className="h-6 bg-[#252526] flex items-center border-b border-[#1e1e1e] flex-shrink-0">
        <div className="h-full px-3 bg-[#1e1e1e] flex items-center gap-2 border-t border-t-[#007acc]">
          <span className="text-[9px] text-[#d4d4d4]">page.tsx</span>
        </div>
        <div className="h-full px-3 flex items-center">
          <span className="text-[9px] text-[#808080]">layout.tsx</span>
        </div>
      </div>

      {/* Code content */}
      <div className="p-3 font-mono text-[10px] leading-relaxed flex-1">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="flex"
          >
            <span className="w-6 text-right pr-3 text-[#5a5a5a] select-none">
              {i + 1}
            </span>
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center"
        >
          <span className="w-6 text-right pr-3 text-[#5a5a5a] select-none">
            11
          </span>
          <span className="text-[#D4D4D4]"> </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-[2px] h-3 bg-[#aeafad]"
          />
        </motion.div>
      </div>

      {/* Status bar */}
      <div className="h-5 bg-[#007acc] flex items-center px-2 text-[8px] text-white flex-shrink-0">
        <span>TypeScript React</span>
        <span className="ml-auto">Ln 11, Col 7</span>
      </div>
    </div>
  );
}

const projectVisuals: Record<string, React.ComponentType> = {
  "calhoun-rmp": RMPVisual,
  excelbnb: ExcelVisual,
  "zone7-utility": MinecraftVisual,
  "tinsley-dev": TerminalVisual,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Projects() {
  return (
    <section id="work" className="py-24 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-widest text-[#737373] mb-3 block">
              Selected Work
            </span>
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-[#737373] max-w-sm text-right hidden md:block"
          >
            A selection of projects focused on solving real user problems
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => {
            const Visual = projectVisuals[project.slug];
            const isWide = index === 0 || index === 3; // First (CalhounRMP) and last (tinsley.dev) are wide
            const isReversed = index === 3; // tinsley.dev has reversed layout (content left, visual right)
            return (
              <motion.div
                key={project.slug}
                variants={itemVariants}
                className={isWide ? "lg:col-span-2" : ""}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block h-full"
                >
                  <article
                    className={`border border-[#e5e5e5] bg-white hover:border-[#171717] transition-colors duration-300 overflow-hidden h-full flex flex-col ${
                      isWide ? "md:flex-row" : ""
                    } ${isReversed ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Visual Preview */}
                    <div
                      className={`relative overflow-hidden ${
                        isWide ? "h-[220px] md:h-[280px] md:w-1/2" : "h-[200px]"
                      }`}
                    >
                      {Visual && <Visual />}
                      <div className="absolute inset-0 bg-[#171717]/0 group-hover:bg-[#171717]/5 transition-colors duration-300" />
                    </div>
                    {/* Content */}
                    <div
                      className={`p-6 border-t border-[#e5e5e5] flex-1 flex flex-col ${
                        isWide && !isReversed
                          ? "md:border-t-0 md:border-l md:w-1/2"
                          : ""
                      } ${
                        isReversed ? "md:border-t-0 md:border-r md:w-1/2" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                          {project.title}
                          <ArrowUpRight
                            size={18}
                            className="opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                          />
                        </h3>
                        <span className="text-xs uppercase tracking-widest text-[#737373] pt-1">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-[#737373] leading-relaxed mb-4 flex-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 bg-[#f5f5f5] text-[#737373]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
