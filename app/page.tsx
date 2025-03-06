// app/page.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  Variants,
  AnimatePresence,
} from "framer-motion";
import React from "react";

interface Project {
  name: string;
  description: string;
  skills: string[];
  github: string;
  image: string;
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

// 3D tilt card component
const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: -y * 10, y: x * 10 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setTilt({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        boxShadow: isHovering
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const cardContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardItem: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

export default function HomePage() {
  // Projects
  const projectsData: Project[] = useMemo(
    () => [
      {
        name: "tinsley.dev",
        description: "My Portfolio Website",
        skills: ["React", "Framer Motion", "Tailwind CSS"],
        github: "https://github.com/TinsleyDevers/tinsley.dev",
        image: "/images/projects/tinsleydev.png",
      },
      {
        name: "Excelbnb",
        description:
          "Python application to convert Airbnb listings into a structured Excel spreadsheet.",
        skills: ["Python", "Web Scraping", "Data Analysis"],
        github: "https://github.com/TinsleyDevers/Excelbnb",
        image: "/images/projects/EXCELBNB.png",
      },
      {
        name: "Zone7 Utility",
        description: "Minecraft Java Plugin.",
        skills: ["Java", "OOP", "API"],
        github: "https://github.com/TinsleyDevers/Zone7-Utility",
        image: "/images/projects/zone7utility.png",
      },
      {
        name: "Calhoun Grades Webscraper",
        description:
          "Python app for scraping grades from Blackboard and converting into an Excel spreadsheet.",
        skills: ["Python", "Web Scraping", "Data Analysis"],
        github: "https://github.com/TinsleyDevers/CalhounGrades",
        image: "/images/projects/calhoungrades.png",
      },
      {
        name: "WORK IN PROGRESS",
        description:
          "This webpage is a work in progress and is actively being worked on.\nCheck out my GitHub for more info.",
        skills: [],
        github: "https://github.com/TinsleyDevers",
        image: "/api/placeholder/600/340",
      },
    ],
    []
  );

  // Experience
  const experienceData = [
    {
      jobName: "Operations Supervisor",
      companyName: "Carter Express, Inc",
      dateWorked: "Mar 2022 - Jun 2023",
      description:
        "Managed supply chain warehouse operations for Toyota and Mazda, optimizing warehouse logistics and leading a team of 40 operators.",
      skills: [
        "Project Management",
        "Data Analysis",
        "Process Improvement",
        "KPIs, OKRs",
      ],
      icon: "📊",
    },
    {
      jobName: "Web Developer Intern",
      companyName: "Lorem Ipsum",
      dateWorked: "2021 - 2022",
      description:
        "Maintained internal tools, lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.",
      skills: ["HTML", "CSS", "JavaScript"],
      icon: "💻",
    },
  ];

  // Education
  const educationData = [
    {
      major: "B.S. in Computer Science",
      school: "Undecided",
      graduationDate: "Expected: December 2026 / May 2027",
      icon: "🎓",
    },
    {
      major: "A.S. in Computer Science",
      school: "Calhoun Community College",
      graduationDate: "Graduated: May 2025",
      icon: "📚",
    },
  ];

  // Skills
  const technicalSkills = [
    { name: "HTML5", level: 90, category: "Frontend" },
    { name: "CSS3", level: 85, category: "Frontend" },
    { name: "JavaScript", level: 80, category: "Frontend" },
    { name: "React", level: 75, category: "Frontend" },
    { name: "Next.js", level: 70, category: "Frontend" },
    { name: "Tailwind CSS", level: 85, category: "Frontend" },
    { name: "Python", level: 75, category: "Backend" },
    { name: "Java", level: 70, category: "Backend" },
    { name: "Git", level: 80, category: "Tools" },
  ];

  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // In-view
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.3 });
  const isProjectsInView = useInView(projectsRef, { once: true, amount: 0.1 });

  // Active project
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Skill filter
  const [skillFilter, setSkillFilter] = useState("All");
  const filteredSkills =
    skillFilter === "All"
      ? technicalSkills
      : technicalSkills.filter((skill) => skill.category === skillFilter);

  // Scroll progress for top bar
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top scroll-progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/10">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        id="hero"
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-indigo-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block">Hi, I&apos;m</span>
            <span
              className="blend-glow text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              data-text="Tinsley Devers"
            >
              Tinsley Devers
            </span>
          </motion.h1>

          <motion.div
            className="flex flex-col gap-3 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-base sm:text-lg mb-2 max-w-xl text-center">
              Software developer building real world applications.
            </p>
            <div className="relative">
              <p className="text-xs sm:text-sm mb-8 max-w-xl text-center text-gray-400">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    x: [null, 0, 0, 20],
                  }}
                  transition={{
                    duration: 4,
                    times: [0, 0.1, 0.9, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="inline-block mr-1"
                >
                  ⚡
                </motion.span>
                Always looking for new opportunities and challenges.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              <motion.a
                href="https://github.com/tinsleydevers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/tinsley-devers-40820a1b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 0h.003z" />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:contact@tinsley.dev"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <motion.a
              href="#about"
              className="relative inline-block px-8 py-3 font-semibold text-white rounded-full bg-purple-700 overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <span className="absolute -inset-x-1 bottom-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
              <span className="relative z-10 flex items-center">
                <span>Explore</span>
                <svg
                  className="w-4 h-4 ml-2 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </span>
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        ref={aboutRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative"
        variants={sectionVariants}
        initial="hidden"
        animate={isAboutInView ? "visible" : "hidden"}
      >
        <div className="absolute top-40 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/5 to-pink-500/10 rounded-full blur-3xl" />

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 relative"
          variants={fadeInUp}
        >
          About Me
          <span className="absolute -bottom-3 left-1/2 w-12 h-1 bg-purple-500 transform -translate-x-1/2"></span>
        </motion.h2>

        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 items-center">
          <motion.div className="w-full md:w-2/5" variants={childVariants}>
            <TiltCard className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-1 rounded-xl overflow-hidden">
              <div className="relative aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-800/30 to-indigo-800/30 text-white text-opacity-80">
                  <svg
                    className="w-32 h-32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div className="w-full md:w-3/5" variants={childVariants}>
            <motion.h3
              className="text-xl sm:text-2xl font-bold mb-4 text-gradient bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
              variants={childVariants}
            >
              Software Developer & Creative Problem Solver
            </motion.h3>
            <motion.p
              className="mb-6 text-sm sm:text-base text-gray-300 leading-relaxed"
              variants={childVariants}
            >
              With over 5 years of programming experience, I’ve focused on
              developing user-friendly applications that solve real-world
              problems. My journey in technology has been driven by curiosity
              and a passion for creating efficient, scalable solutions.
            </motion.p>
            <motion.p
              className="mb-6 text-sm sm:text-base text-gray-300 leading-relaxed"
              variants={childVariants}
            >
              I believe in continuous learning and staying updated with emerging
              technologies. My goal is to build innovative products that make a
              positive impact on users’ lives while maintaining clean,
              maintainable code.
            </motion.p>

            {/* Personal highlights */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              variants={childVariants}
            >
              {[
                { label: "Based in", value: "Huntsville, AL" },
                { label: "Experience", value: "5+ Years" },
                { label: "Availability", value: "Open to opportunities" },
                { label: "Focus", value: "Full-stack development" },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-purple-500"></div>
                  <div>
                    <span className="block text-sm font-medium text-gray-400">
                      {item.label}:
                    </span>
                    <span className="block text-sm text-white">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={childVariants}
            >
              <motion.a
                href="#projects"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 py-2 rounded-full bg-white/10 text-white font-medium text-sm border border-white/20 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        ref={skillsRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative"
        variants={sectionVariants}
        initial="hidden"
        animate={isSkillsInView ? "visible" : "hidden"}
      >
        <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/5 rounded-full blur-3xl" />

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 relative"
          variants={fadeInUp}
        >
          Skills & Expertise
          <span className="absolute -bottom-3 left-1/2 w-12 h-1 bg-purple-500 transform -translate-x-1/2"></span>
        </motion.h2>

        {/* Skill filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          variants={childVariants}
        >
          {["Frontend", "Backend", "Tools"].map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                skillFilter === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setSkillFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skill bars */}
        <motion.div
          className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={childVariants}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-1">
                <span className="font-medium text-sm text-white">
                  {skill.name}
                </span>
                <span className="text-xs text-gray-400">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    delay: 0.2 + index * 0.1,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Tech Stack */}
        <motion.div className="mt-16 w-full max-w-4xl" variants={childVariants}>
          <h3 className="text-xl font-bold mb-6 text-center">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "HTML5",
              "CSS3",
              "JavaScript",
              "TypeScript",
              "React",
              "Next.js",
              "Tailwind CSS",
              "Node.js",
              "Python",
              "Java",
              "Git",
              "GitHub",
              "VS Code",
              "Figma",
              "REST API",
              "MongoDB",
            ].map((tech) => (
              <motion.div
                key={tech}
                className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-2xl text-sm transition-all duration-300 hover:shadow-md hover:shadow-purple-500/10"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        ref={projectsRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
        variants={sectionVariants}
        initial="hidden"
        animate={isProjectsInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 relative"
          variants={fadeInUp}
        >
          Featured Projects
          <span className="absolute -bottom-3 left-1/2 w-12 h-1 bg-purple-500 transform -translate-x-1/2"></span>
        </motion.h2>

        <motion.div className="w-full max-w-6xl" variants={cardContainer}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <motion.div
                key={project.name}
                className="h-full"
                variants={cardItem}
              >
                <TiltCard className="bg-white/5 hover:bg-white/10 text-white h-full p-1 rounded-xl overflow-hidden">
                  <div className="h-full flex flex-col rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm">
                    {/* Project image */}
                    <div className="relative h-40 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-black/70 text-white text-sm rounded-full backdrop-blur-sm hover:bg-black/90 transition-colors"
                        >
                          View Code
                        </a>
                      </div>
                    </div>

                    {/* Project details */}
                    <div className="flex-1 p-5 flex flex-col">
                      <h3 className="text-lg font-bold mb-2 text-purple-400 whitespace-pre-line">
                        {project.name}
                      </h3>
                      <p className="mb-4 text-gray-300 text-sm whitespace-pre-line flex-grow">
                        {project.description}
                      </p>
                      {project.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-purple-600/50 text-white px-2 py-1 rounded-full text-xs transition-transform duration-300 hover:scale-105"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-auto pt-2 border-t border-white/10">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-block group text-gray-300 hover:text-white transition-colors text-sm"
                        >
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                          </span>
                          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>

                        <button
                          onClick={() => setActiveProject(project)}
                          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Project details modal */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-1 rounded-xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-purple-400">
                      {activeProject.name}
                    </h3>
                    <button
                      onClick={() => setActiveProject(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <img
                    src={activeProject.image}
                    alt={activeProject.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />

                  <p className="text-gray-300 mb-6">
                    {activeProject.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.skills?.map((skill: string) => (
                        <span
                          key={skill}
                          className="bg-purple-600/50 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                    >
                      View Project on GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 relative"
          variants={fadeInUp}
        >
          Work Experience
          <span className="absolute -bottom-3 left-1/2 w-12 h-1 bg-purple-500 transform -translate-x-1/2"></span>
        </motion.h2>

        <div className="w-full max-w-4xl relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 to-pink-500 transform md:translate-x-px"></div>
          {experienceData.map((job, index) => (
            <motion.div
              key={job.jobName}
              className={`mb-12 md:mb-24 relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              variants={childVariants}
            >
              <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transform -translate-x-2.5 md:-translate-x-3 z-10"></div>

              <div
                className={`w-full md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <TiltCard className="bg-white/5 hover:bg-white/10 text-white p-6 rounded-lg">
                  <div className="inline-block text-4xl mb-4">{job.icon}</div>
                  <h3 className="text-xl font-bold text-purple-400 mb-1">
                    {job.jobName}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-1 font-semibold">
                    {job.companyName}
                  </p>
                  <h4 className="text-xs sm:text-sm text-gray-400 mb-3">
                    {job.dateWorked}
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base mb-4">
                    {job.description}
                  </p>
                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-purple-600/40 text-white px-3 py-1 rounded-full text-xs sm:text-sm transition-transform duration-300 hover:scale-105 hover:shadow-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </TiltCard>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 relative"
          variants={fadeInUp}
        >
          Education
          <span className="absolute -bottom-3 left-1/2 w-12 h-1 bg-purple-500 transform -translate-x-1/2"></span>
        </motion.h2>

        <div className="max-w-4xl w-full mx-auto grid gap-6">
          {educationData.map((ed, index) => (
            <motion.div key={ed.school} variants={childVariants} custom={index}>
              <TiltCard className="w-full bg-white/5 hover:bg-white/10 text-white p-6 rounded-lg relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-10">
                  {ed.icon}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-purple-400 mb-2">
                    {ed.major}
                  </h3>
                  <h4 className="text-sm text-gray-300 mb-2 font-medium">
                    {ed.school}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {ed.graduationDate}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 rounded-full blur-3xl" />

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 relative"
          variants={fadeInUp}
        >
          Contact Me
          <span className="absolute -bottom-3 left-1/2 w-12 h-1 bg-purple-500 transform -translate-x-1/2"></span>
        </motion.h2>

        <motion.div
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={childVariants}
        >
          <TiltCard className="bg-white/5 p-1 rounded-xl overflow-hidden">
            <div className="h-full flex flex-col p-6 rounded-lg bg-black/30 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Let’s Connect
              </h3>
              <p className="text-gray-300 mb-8">
                Have a project in mind or want to discuss opportunities? I’m
                always open to new ideas and collaborations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a
                      href="mailto:contact@tinsley.dev"
                      className="text-white hover:text-purple-300 transition-colors"
                    >
                      contact@tinsley.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">Huntsville, Alabama</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Response Time</p>
                    <p className="text-white">Within 24 hours</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-8">
                <p className="text-sm text-gray-400 mb-4">
                  Connect with me on social media
                </p>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/tinsleydevers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/tinsley-devers-40820a1b9/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 0h.003z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="mailto:contact@tinsley.dev"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </TiltCard>

          <TiltCard className="bg-white/5 p-1 rounded-xl overflow-hidden">
            <div className="h-full flex flex-col p-6 rounded-lg bg-black/30 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Send Me a Message
              </h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-gray-400 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-400 mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-gray-400 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="Hello Tinsley, I'd like to discuss a project..."
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div
          className="w-full max-w-4xl mt-20 text-center"
          variants={childVariants}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            Ready to Work Together?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            I’m currently available for freelance work and open to discussing
            new opportunities.
          </p>
          <motion.a
            href="mailto:contact@tinsley.dev"
            className="inline-block px-8 py-3 font-semibold text-white rounded-full bg-gradient-to-r from-purple-600 to-pink-600 overflow-hidden group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="relative z-10 flex items-center">
              Email Me
              <svg
                className="w-5 h-5 ml-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </span>
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Back to top button */}
      <AnimatePresence>
        {scrollProgress > 20 && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 15l7-7 7 7"></path>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
