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

interface WorkExperience {
  jobName: string;
  companyName: string;
  dateWorked: string;
  description: string;
  skills: string[];
  icon: string;
}

interface Education {
  major: string;
  school: string;
  graduationDate: string;
  icon: string;
}

type TimelineItem = WorkExperience | Education;

// 3D tilt card component
const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number | null>(null);
  const lastPosition = useRef({ x: 0, y: 0 });

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !isHovering) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate position relative to center of card
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Normalize values between -1 and 1
    const normalizedX = mouseX / (rect.width / 2);
    const normalizedY = mouseY / (rect.height / 2);

    // Apply tilt
    const targetX = -normalizedY * 10;
    const targetY = normalizedX * 10;

    // Use RAF for animation
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      // Apply easing for transitions
      const newX =
        lastPosition.current.x + (targetX - lastPosition.current.x) * 0.2;
      const newY =
        lastPosition.current.y + (targetY - lastPosition.current.y) * 0.2;

      setTilt({ x: newX, y: newY });
      lastPosition.current = { x: newX, y: newY };
      rafRef.current = null;
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    // Smoothly reset position
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const resetX = lastPosition.current.x * 0.8;
      const resetY = lastPosition.current.y * 0.8;

      if (Math.abs(resetX) < 0.1 && Math.abs(resetY) < 0.1) {
        setTilt({ x: 0, y: 0 });
        lastPosition.current = { x: 0, y: 0 };
        rafRef.current = null;
      } else {
        setTilt({ x: resetX, y: resetY });
        lastPosition.current = { x: resetX, y: resetY };
        rafRef.current = requestAnimationFrame(handleMouseLeave);
      }
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformPerspective: 1000,
        boxShadow: isHovering
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
      }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 150,
        mass: 0.5,
      }}
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
      jobName: "Co-founder & CEO",
      companyName: "ATK.social",
      dateWorked: "2025 – Present",
      description:
        "Founded ATK.social, leading social strategy, influencer partnerships, and brand storytelling.",
      skills: [
        "Content Creation",
        "Social Media Strategy",
        "Influencer Marketing",
        "Brand Development",
        "Audience Engagement"
      ],
      icon: "🚀",
    },
  ];

  // Education
  const educationData = [
    {
      major: "B.S. in Computer Science",
      school: "Baruch College, CUNY",
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
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:contact@tinsley.dev";
                }}
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
                        loading="lazy"
                        decoding="async"
                        style={{ contentVisibility: "auto" }}
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

        <motion.div className="w-full max-w-5xl" variants={childVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <TiltCard className="bg-white/5 hover:bg-white/10 text-white p-1 rounded-xl overflow-hidden">
              <div className="h-full flex flex-col p-6 rounded-lg bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-6 text-purple-400 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Frontend Development
                </h3>
                <div className="space-y-3">
                  {[
                    "HTML5",
                    "CSS3",
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Tailwind CSS",
                    "Responsive Design",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>

            <TiltCard className="bg-white/5 hover:bg-white/10 text-white p-1 rounded-xl overflow-hidden">
              <div className="h-full flex flex-col p-6 rounded-lg bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-6 text-purple-400 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  Backend Development
                </h3>
                <div className="space-y-3">
                  {[
                    "Python",
                    "Java",
                    "C++",
                    "Lua",
                    "Node.js",
                    "React",
                    "SQL",
                    "API Integration",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>

            <TiltCard className="bg-white/5 hover:bg-white/10 text-white p-1 rounded-xl overflow-hidden">
              <div className="h-full flex flex-col p-6 rounded-lg bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-6 text-purple-400 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                  Tools & Workflow
                </h3>
                <div className="space-y-3">
                  {[
                    "Git",
                    "GitHub",
                    "VS Code",
                    "Vercel",
                    "Figma",
                    "Adobe Creative Suite",
                    "Unreal Engine",
                    "Godot",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>

          <motion.div
            className="mt-12 bg-white/5 p-6 rounded-xl backdrop-blur-sm text-center"
            variants={fadeInUp}
          >
            <h3 className="text-lg font-bold mb-6 text-purple-400">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Python",
                "C++",
                "Java",
                "React",
                "Next.js",
                "Tailwind CSS",
                "Git",
                "GitHub",
                "VS Code",
                "Figma",
                "Adobe Creative Suite",
                "Unreal Engine",
                "Godot",
              ].map((tech) => (
                <motion.div
                  key={tech}
                  className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-2xl text-sm transition-all duration-300"
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
        </motion.div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="absolute top-40 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/3 w-72 h-72 bg-gradient-to-r from-pink-500/10 to-indigo-500/5 rounded-full blur-3xl" />

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 relative"
          variants={fadeInUp}
        >
          Experience
          <span className="absolute -bottom-3 left-1/2 w-12 h-1 bg-purple-500 transform -translate-x-1/2"></span>
        </motion.h2>

        <div className="w-full max-w-5xl relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 transform -translate-x-[0.5px]"></div>

          {/* Top dot */}
          <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-purple-600/50 backdrop-blur-sm transform -translate-x-1/2 flex items-center justify-center z-10 border-2 border-purple-500">
            <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
          </div>
          <div className="mt-24"></div>

          {/* experiences and education */}
          {[...experienceData, ...educationData]
            .sort((a, b) => {
              // Sort by year in descending order
              const getYear = (item: TimelineItem) => {
                const dateString =
                  "dateWorked" in item ? item.dateWorked : item.graduationDate;
                const match = dateString.match(/\d{4}/);
                return match ? parseInt(match[0]) : 0;
              };
              return getYear(b) - getYear(a);
            })
            .map((item, index) => {
              const isEducation = "school" in item;
              const date = isEducation
                ? (item as Education).graduationDate
                : (item as WorkExperience).dateWorked;

              // Calculate date offset based on text length
              const dateLength = date.length;
              const baseOffset = index % 2 === 0 ? -12 : 3;
              const lengthOffset = Math.max(0, dateLength - 20) * 0.4;
              const finalOffset =
                index % 2 === 0
                  ? baseOffset - lengthOffset
                  : baseOffset + lengthOffset;

              return (
                <motion.div
                  key={
                    isEducation
                      ? (item as Education).school
                      : (item as WorkExperience).jobName
                  }
                  className={`mb-16 md:mb-32 relative flex flex-col md:flex-row mt-32 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                  variants={childVariants}
                >
                  {/* Timeline dot  */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30 transform -translate-x-1/2 flex items-center justify-center z-10 border border-white/20"></div>

                  {/* Date indicator */}
                  <div
                    className={`hidden md:block absolute left-1/2 top-0`}
                    style={{
                      transform: `translateX(${finalOffset}rem)`,
                    }}
                  >
                    <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium shadow-lg shadow-purple-500/10 whitespace-nowrap">
                      {date}
                    </div>
                  </div>

                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-24" : "md:pl-24"
                    }`}
                  >
                    <TiltCard className="bg-white/5 hover:bg-white/10 text-white p-1 rounded-xl overflow-hidden">
                      <div className="h-full flex flex-col p-6 rounded-lg bg-black/30 backdrop-blur-sm border border-white/5">
                        <div className="flex justify-between items-start">
                          <div className="inline-block text-4xl mb-4">
                            {item.icon}
                          </div>
                          <div className="md:hidden px-3 py-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full text-xs">
                            {date}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-1">
                          {isEducation
                            ? (item as Education).major
                            : (item as WorkExperience).jobName}
                        </h3>

                        <p className="text-sm sm:text-base text-gray-300 mb-1 font-semibold flex items-center">
                          {isEducation ? (
                            <>
                              <svg
                                className="w-4 h-4 mr-1 text-purple-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                              </svg>
                              {(item as Education).school}
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-4 h-4 mr-1 text-purple-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              {(item as WorkExperience).companyName}
                            </>
                          )}
                        </p>

                        {!isEducation && (
                          <p className="text-gray-300 text-sm sm:text-base mt-3 mb-4 leading-relaxed">
                            {(item as WorkExperience).description}
                          </p>
                        )}

                        {!isEducation && (item as WorkExperience).skills && (
                          <div className="flex flex-wrap gap-2 mt-auto pt-2">
                            {(item as WorkExperience).skills.map((skill) => (
                              <span
                                key={skill}
                                className="bg-gradient-to-r from-purple-600/40 to-pink-600/40 text-white px-3 py-1 rounded-full text-xs transition-all duration-300 hover:scale-105 hover:from-purple-600/60 hover:to-pink-600/60"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </TiltCard>
                  </div>
                </motion.div>
              );
            })}

          <div className="mb-24"></div>

          {/* Timeline end dot */}
          <div className="absolute left-0 md:left-1/2 bottom-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-600/50 to-blue-600/50 backdrop-blur-sm transform -translate-x-1/2 flex items-center justify-center z-10 border-2 border-pink-500">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
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

        <motion.div className="w-full max-w-4xl" variants={childVariants}>
          <TiltCard className="bg-white/5 p-1 rounded-xl overflow-hidden">
            <div className="h-full flex flex-col rounded-lg bg-black/30 backdrop-blur-sm p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side - Contact info */}
                <div>
                  <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                    Let&apos;s Connect
                  </h3>
                  <p className="text-gray-300 mb-8">
                    Have a project in mind or want to discuss opportunities?
                    I&apos;m always open to new ideas and collaborations.
                  </p>
                  <div className="space-y-6">
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
                        <motion.a
                          href="mailto:contact@tinsley.dev"
                          className="text-white hover:text-purple-300 transition-colors"
                        >
                          contact@tinsley.dev
                        </motion.a>
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

                  <div className="mt-8">
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

                {/* Right side - Contact */}
                <div className="flex flex-col justify-center">
                  <div className="mb-8">
                    <motion.div
                      className="text-5xl text-center md:text-left mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      ✨
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                      Ready to Work Together?
                    </h3>
                    <p className="text-gray-300 mb-6">
                      I&apos;m currently available for freelance work and open
                      to discussing new opportunities.
                    </p>

                    <motion.a
                      href="mailto:contact@tinsley.dev"
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-pink-600 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56"></span>
                      <span className="relative flex items-center">
                        Email Me
                        <svg
                          className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 duration-200"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </motion.a>
                  </div>

                  {/* Project inquiry box */}
                  <motion.div
                    className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-5 rounded-lg mt-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-purple-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      Project Inquiry
                    </h4>
                    <p className="text-sm text-gray-300 mb-2">
                      For faster responses, please include:
                    </p>
                    <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                      <li>Project timeline</li>
                      <li>Project scope</li>
                      <li>Budget expectations</li>
                      <li>Your preferred communication method</li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </TiltCard>
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
