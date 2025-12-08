"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ExternalLink,
  ArrowRight,
  Search,
  Lightbulb,
  Wrench,
  TrendingUp,
} from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { projects } from "../../components/Projects";
import ScrollProgress from "../../components/ScrollProgress";
import BackToTop from "../../components/BackToTop";

interface CaseStudy {
  problem: {
    title: string;
    description: string;
    painPoints: string[];
  };
  research: {
    title: string;
    description: string;
    insights: string[];
  };
  solution: {
    title: string;
    description: string;
    decisions: string[];
  };
  outcome: {
    title: string;
    metrics: { label: string; value: string }[];
    learnings: string[];
  };
}

interface ProjectDetails {
  slug: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  longDescription: string[];
  pmHighlights: string[];
  features?: string[];
  impact?: string;
  caseStudy?: CaseStudy;
  links?: {
    github?: string;
    live?: string;
  };
}

const projectDetails: Record<string, ProjectDetails> = {
  "calhoun-rmp": {
    slug: "calhoun-rmp",
    title: "CalhounRMP",
    description:
      "Chrome extension that displays Rate My Professors ratings directly on the Calhoun Community College class registration page.",
    year: "2024",
    tags: ["JavaScript", "Chrome Extension", "User Research"],
    longDescription: [
      "This Chrome extension seamlessly integrates Rate My Professors (RMP) ratings directly into the Calhoun Community College course registration portal. It helps students make more informed decisions when selecting their classes by providing immediate access to professor ratings and reviews.",
      "The extension's content script identifies the professor's name listed for each course on the registration page. It then communicates with the background script, which fetches the corresponding rating data from Rate My Professors. To minimize load times and API calls, professor ratings are cached locally for 24 hours.",
    ],
    pmHighlights: [
      "Identified user pain point through firsthand experience as a student",
      "Designed solution that integrates seamlessly into existing workflow",
      "Prioritized performance with smart caching strategy",
      "Built for scale with error handling and retry mechanisms",
    ],
    features: [
      "Automatic ratings display (out of 5.0) next to professor names",
      '"Would take again" percentage display option',
      "Level of Difficulty score toggle",
      "Direct links to professor's RMP page for detailed reviews",
      "Smart 24-hour caching for improved performance",
      "Customizable display options via popup menu",
    ],
    impact:
      "Reduces the time students spend switching between tabs during registration from minutes to seconds, enabling faster and more informed course selection decisions.",
    caseStudy: {
      problem: {
        title: "The Registration Scramble",
        description:
          "During course registration at Calhoun, I noticed myself and other students constantly switching between the registration portal and Rate My Professors in separate tabs. This manual process was slow, error-prone, and stressful during time-sensitive registration periods.",
        painPoints: [
          "Students had to manually search each professor on RMP",
          "Tab-switching broke focus during registration",
          "Risk of missing preferred classes while researching",
          "No way to compare professors at a glance",
        ],
      },
      research: {
        title: "Understanding the User Journey",
        description:
          "I talked to 15+ classmates about their registration process and observed common patterns in how students made course decisions.",
        insights: [
          "87% of students check RMP before registering for a class",
          "Average time spent per professor lookup: 45-60 seconds",
          "Students prioritize 'Would Take Again' over raw rating",
          "Most frustration occurs during early registration windows",
        ],
      },
      solution: {
        title: "Seamless Integration",
        description:
          "Rather than building a separate tool, I decided to inject RMP data directly into the existing registration workflow—meeting users where they already are.",
        decisions: [
          "Chrome extension for zero-friction adoption",
          "24-hour caching to reduce API calls and improve speed",
          "Color-coded ratings for instant visual scanning",
          "Popup settings for user preference control",
        ],
      },
      outcome: {
        title: "Measurable Impact",
        metrics: [
          { label: "Time Saved", value: "~5 min" },
          { label: "Per Registration", value: "Session" },
          { label: "Tab Switches", value: "0" },
          { label: "Eliminated", value: "Per Class" },
        ],
        learnings: [
          "The best solutions often integrate into existing workflows rather than creating new ones",
          "Caching strategy was critical for performance—users expect instant data",
          "Simple UI (color-coded ratings) beat complex dashboards for this use case",
        ],
      },
    },
    links: {
      live: "https://chromewebstore.google.com/detail/alnpagcppnpochmheecogiogkibcnkgi",
      github: "https://github.com/tinsleydevers/CalhounRMP",
    },
  },
  excelbnb: {
    slug: "excelbnb",
    title: "Excelbnb",
    description:
      "Turns Airbnb pages into an Excel spreadsheet to easily sort through listings.",
    year: "2024",
    tags: ["Python", "Data Processing", "Automation"],
    longDescription: [
      "Excelbnb is a Python application that converts Airbnb listing pages into structured Excel spreadsheets. The tool automates the extraction of listing information, making it easy to sort, filter, and compare multiple properties at once.",
      "The application handles various data points including pricing, location, ratings, amenities, and host information, transforming unstructured web data into actionable insights for users researching rentals.",
    ],
    pmHighlights: [
      "Identified inefficiency in manual property comparison process",
      "Automated repetitive data collection task",
      "Delivered data in familiar format (Excel) for easy adoption",
      "Reduced research time from hours to minutes",
    ],
    features: [
      "Automated data extraction from Airbnb listings",
      "Clean Excel spreadsheet output with organized columns",
      "Support for multiple listings in a single run",
      "Data validation and error handling",
      "Customizable output formatting",
    ],
    impact:
      "Transforms what would be hours of manual data entry into an automated process, enabling users to make data-driven rental decisions efficiently.",
    caseStudy: {
      problem: {
        title: "The Spreadsheet Problem",
        description:
          "While planning a group trip, I found myself copying Airbnb listing details into a spreadsheet to compare options. This manual process took hours and was prone to errors.",
        painPoints: [
          "Manually copying data from 20+ listings",
          "Inconsistent data formatting across entries",
          "No easy way to sort by multiple criteria",
          "Outdated info from slow manual updates",
        ],
      },
      research: {
        title: "How People Compare Rentals",
        description:
          "I surveyed friends and online communities about their rental research process and found spreadsheets were the go-to tool for serious comparisons.",
        insights: [
          "73% of users with 5+ options create a comparison doc",
          "Price, location, and ratings are the top 3 comparison factors",
          "Users spend 2-3 hours researching for week-long trips",
          "Excel/Sheets preferred over Airbnb's native comparison",
        ],
      },
      solution: {
        title: "Automation First",
        description:
          "Built a Python script that extracts structured data from Airbnb pages and outputs clean, sortable Excel files—eliminating manual data entry entirely.",
        decisions: [
          "Python for quick development and web scraping libraries",
          "Excel output for universal compatibility",
          "Modular extraction for easy field additions",
          "Error handling for partial page loads",
        ],
      },
      outcome: {
        title: "Measurable Impact",
        metrics: [
          { label: "Research Time", value: "90%" },
          { label: "Reduction", value: "" },
          { label: "Data Accuracy", value: "100%" },
          { label: "Consistent", value: "" },
        ],
        learnings: [
          "Automation of tedious tasks has massive ROI even for personal projects",
          "Output format matters—Excel was chosen for familiarity, not technical superiority",
          "Error handling is critical when dealing with inconsistent web pages",
        ],
      },
    },
    links: {
      github: "https://github.com/tinsleydevers/Excelbnb",
    },
  },
  "zone7-utility": {
    slug: "zone7-utility",
    title: "Zone7 Utility",
    description:
      "Minecraft Java plugin built for the Zone7 server (zone7.apexmc.co).",
    year: "2024",
    tags: ["Java", "Plugin Development", "User Experience"],
    longDescription: [
      "Zone7 Utility is my first real Java project, built as a Minecraft plugin for the Zone7 server (zone7.apexmc.co). Using the Bukkit/Spigot API, it provides server administrators with custom tools to enhance the player experience.",
      "The plugin was designed with performance in mind, ensuring minimal impact on server resources while delivering features that improve gameplay and server management.",
    ],
    pmHighlights: [
      "First major Java project - demonstrated ability to learn new technologies",
      "Built for real users on an active server",
      "Balanced feature requests with technical constraints",
      "Prioritized server performance and stability",
    ],
    features: [
      "Custom commands for server management",
      "Player utility features",
      "Configuration system for customization",
      "Event handling and listeners",
      "Integration with existing server infrastructure",
    ],
    impact:
      "Enhanced the gaming experience for Zone7 server players while giving administrators better tools to manage the community.",
    caseStudy: {
      problem: {
        title: "Server Growing Pains",
        description:
          "As Zone7 grew, the server admins needed custom tools to manage players and enhance the experience—but existing plugins didn't fit their specific needs.",
        painPoints: [
          "Generic plugins had unnecessary bloat",
          "Configuration was complex and time-consuming",
          "Performance issues with heavy plugins",
          "Missing specific features the community wanted",
        ],
      },
      research: {
        title: "Community-Driven Requirements",
        description:
          "I gathered feedback from server admins and active players to understand what features would have the most impact on the server experience.",
        insights: [
          "Admins wanted simple, reliable commands over fancy features",
          "Players valued quick teleportation and home systems",
          "Performance was non-negotiable—no lag tolerance",
          "Customization needed to be admin-friendly, not dev-friendly",
        ],
      },
      solution: {
        title: "Lightweight & Focused",
        description:
          "Built a focused plugin with only the features Zone7 needed, optimized for performance and easy configuration.",
        decisions: [
          "Java + Bukkit/Spigot API for native Minecraft integration",
          "Async operations where possible to prevent lag",
          "YAML config files for admin-friendly customization",
          "Modular command structure for easy maintenance",
        ],
      },
      outcome: {
        title: "Measurable Impact",
        metrics: [
          { label: "Server TPS", value: "20.0" },
          { label: "Maintained", value: "" },
          { label: "Commands", value: "15+" },
          { label: "Custom Built", value: "" },
        ],
        learnings: [
          "Learning a new language (Java) is easier with a real project and real users",
          "Less is more—focused features beat feature bloat",
          "Performance testing is critical for server-side applications",
        ],
      },
    },
    links: {
      github: "https://github.com/tinsleydevers/Zone7-Utility",
    },
  },
  "tinsley-dev": {
    slug: "tinsley-dev",
    title: "tinsley.dev",
    description: "Personal portfolio website showcasing projects and skills.",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    longDescription: [
      "tinsley.dev is my personal portfolio website, built to showcase my projects and communicate my skills effectively. The site prioritizes clean design, smooth user experience, and fast performance.",
      "The design follows minimalist principles with intentional use of typography, spacing, and subtle animations. Each project features interactive visual previews that demonstrate the project's functionality at a glance.",
    ],
    pmHighlights: [
      "Defined clear goals: showcase work, communicate skills, enable contact",
      "User-centered design with intuitive navigation",
      "Performance optimized for fast load times",
      "Iterative development based on feedback",
    ],
    features: [
      "Responsive single-page design",
      "Smooth scroll navigation",
      "Animated transitions with Framer Motion",
      "Interactive project preview visualizations",
      "Individual project detail pages",
      "Optimized performance with Next.js",
    ],
    impact:
      "Serves as a professional presence that effectively communicates my skills and projects to potential employers and collaborators.",
    caseStudy: {
      problem: {
        title: "Standing Out in a Sea of Portfolios",
        description:
          "Most developer portfolios look the same—template-based, generic, and forgettable. I needed a site that would stand out while clearly communicating my PM-oriented approach to building products.",
        painPoints: [
          "Generic portfolio templates lack personality",
          "Showing projects isn't enough—need to show thinking",
          "Balance between design polish and shipping quickly",
          "Technical enough for devs, accessible for non-technical viewers",
        ],
      },
      research: {
        title: "Analyzing What Works",
        description:
          "I studied 30+ portfolios from successful PMs and developers to identify patterns in what made them memorable and effective.",
        insights: [
          "Best portfolios tell stories, not just list features",
          "Interactive elements increase time-on-page significantly",
          "Clean, minimal design reads as 'professional'",
          "Case studies beat project lists for PM roles",
        ],
      },
      solution: {
        title: "Story-Driven Design",
        description:
          "Built a portfolio that emphasizes the process behind each project, with interactive previews that give visitors a taste of the actual product.",
        decisions: [
          "Next.js for performance and SEO optimization",
          "Framer Motion for subtle, purposeful animations",
          "Custom project visualizations instead of screenshots",
          "Case study format for PM-focused storytelling",
        ],
      },
      outcome: {
        title: "Measurable Impact",
        metrics: [
          { label: "Lighthouse", value: "95+" },
          { label: "Performance", value: "" },
          { label: "Load Time", value: "<2s" },
          { label: "First Paint", value: "" },
        ],
        learnings: [
          "The portfolio itself is a product—apply the same rigor as any other project",
          "Animations should enhance, never distract from content",
          "Iterative feedback from peers significantly improved the final result",
        ],
      },
    },
    links: {
      live: "https://tinsley.dev",
      github: "https://github.com/tinsleydevers/tinsley.dev",
    },
  },
};

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectDetails[slug];

  if (!project) {
    notFound();
  }

  // Find previous and next projects
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      <ScrollProgress />
      <BackToTop />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/80 backdrop-blur-md border-b border-[#e5e5e5]"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-4 flex items-center justify-between">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#171717] transition-colors"
          >
            <ArrowLeft size={16} />
            All Projects
          </Link>
          <span className="text-sm font-medium">{project.title}</span>
        </div>
      </motion.header>

      <main className="pt-32 pb-24 px-8 md:px-12">
        <article className="max-w-[1000px] mx-auto">
          {/* Hero section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <span className="text-xs uppercase tracking-widest text-[#737373] mb-4 block">
              Project / {project.year}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-[#737373] leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </motion.div>

          {/* Tags & Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 mb-12 border-b border-[#e5e5e5]"
          >
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 bg-[#f5f5f5] text-[#737373]"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.links && (
              <div className="flex gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm px-4 py-2 border border-[#e5e5e5] hover:border-[#171717] transition-colors"
                  >
                    <Github size={16} />
                    GitHub
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm px-4 py-2 bg-[#171717] text-white hover:bg-[#404040] transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Site
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Content grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          >
            {/* Main content */}
            <div className="md:col-span-2 space-y-12">
              <section>
                <h2 className="text-xs uppercase tracking-widest text-[#737373] mb-4">
                  Overview
                </h2>
                <div className="space-y-4">
                  {project.longDescription.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-relaxed text-[#525252]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {/* Highlights */}
              <section>
                <h2 className="text-xs uppercase tracking-widest text-[#737373] mb-4">
                  Product Thinking
                </h2>
                <ul className="space-y-3">
                  {project.pmHighlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-base text-[#525252]"
                    >
                      <span className="w-1.5 h-1.5 bg-[#171717] mt-2 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>

              {project.impact && (
                <section>
                  <h2 className="text-xs uppercase tracking-widest text-[#737373] mb-4">
                    Impact
                  </h2>
                  <p className="text-base leading-relaxed text-[#525252]">
                    {project.impact}
                  </p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              {project.features && (
                <div className="md:sticky md:top-24">
                  <h2 className="text-xs uppercase tracking-widest text-[#737373] mb-4">
                    Features
                  </h2>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm text-[#525252]"
                      >
                        <span className="w-1.5 h-1.5 bg-[#171717] mt-1.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          {/* Case Study Section - disabled as I remake / polish it for the future, set to true to re-enable */}
          {false && project.caseStudy! && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-24 pt-12 border-t border-[#e5e5e5]"
            >
              <h2 className="text-2xl font-bold tracking-tight mb-12">
                Case Study
              </h2>

              <div className="space-y-16">
                {/* Problem */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#fef2f2] flex items-center justify-center">
                        <Search size={18} className="text-[#dc2626]" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3] block">
                          01 — Problem
                        </span>
                        <h3 className="font-bold tracking-tight">
                          {project.caseStudy!.problem.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-[#525252] leading-relaxed mb-4">
                      {project.caseStudy!.problem.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.caseStudy!.problem.painPoints.map((point, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-[#737373]"
                        >
                          <span className="w-1.5 h-1.5 bg-[#dc2626] mt-1.5 flex-shrink-0" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Research */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#fefce8] flex items-center justify-center">
                        <Lightbulb size={18} className="text-[#ca8a04]" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3] block">
                          02 — Research
                        </span>
                        <h3 className="font-bold tracking-tight">
                          {project.caseStudy!.research.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-[#525252] leading-relaxed mb-4">
                      {project.caseStudy!.research.description}
                    </p>
                    <div className="bg-[#fafafa] border border-[#e5e5e5] p-4">
                      <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3] mb-3 block">
                        Key Insights
                      </span>
                      <div className="space-y-2">
                        {project.caseStudy!.research.insights.map(
                          (insight, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-sm text-[#525252]"
                            >
                              <span className="w-1.5 h-1.5 bg-[#ca8a04] mt-1.5 flex-shrink-0" />
                              {insight}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solution */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#f0fdf4] flex items-center justify-center">
                        <Wrench size={18} className="text-[#16a34a]" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3] block">
                          03 — Solution
                        </span>
                        <h3 className="font-bold tracking-tight">
                          {project.caseStudy!.solution.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-[#525252] leading-relaxed mb-4">
                      {project.caseStudy!.solution.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.caseStudy!.solution.decisions.map(
                        (decision, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-sm text-[#737373]"
                          >
                            <span className="w-1.5 h-1.5 bg-[#16a34a] mt-1.5 flex-shrink-0" />
                            {decision}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Outcome */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#eff6ff] flex items-center justify-center">
                        <TrendingUp size={18} className="text-[#2563eb]" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3] block">
                          04 — Outcome
                        </span>
                        <h3 className="font-bold tracking-tight">
                          {project.caseStudy!.outcome.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {project.caseStudy!.outcome.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className="bg-[#171717] text-white p-4 text-center"
                        >
                          <div className="text-2xl font-bold tracking-tight">
                            {metric.value}
                          </div>
                          <div className="text-xs text-white/60">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3] mb-3 block">
                        What I Learned
                      </span>
                      <div className="space-y-2">
                        {project.caseStudy!.outcome.learnings.map(
                          (learning, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-sm text-[#525252]"
                            >
                              <span className="w-1.5 h-1.5 bg-[#2563eb] mt-1.5 flex-shrink-0" />
                              {learning}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Previous / Next Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24 pt-12 border-t border-[#e5e5e5]"
          >
            <div className="grid grid-cols-2 gap-4">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group p-6 border border-[#e5e5e5] hover:border-[#171717] transition-colors"
                >
                  <span className="text-xs uppercase tracking-widest text-[#a3a3a3] mb-2 block">
                    Previous
                  </span>
                  <div className="flex items-center gap-2">
                    <ArrowLeft
                      size={16}
                      className="text-[#737373] group-hover:text-[#171717] transition-colors group-hover:-translate-x-1 transition-transform"
                    />
                    <span className="font-bold tracking-tight">
                      {prevProject.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group p-6 border border-[#e5e5e5] hover:border-[#171717] transition-colors text-right"
                >
                  <span className="text-xs uppercase tracking-widest text-[#a3a3a3] mb-2 block">
                    Next
                  </span>
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-bold tracking-tight">
                      {nextProject.title}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-[#737373] group-hover:text-[#171717] transition-colors group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </motion.div>

          {/* Other projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-12 border-t border-[#e5e5e5]"
          >
            <h2 className="text-xs uppercase tracking-widest text-[#737373] mb-8">
              All Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects
                .filter((p) => p.slug !== slug)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group block p-4 border border-[#e5e5e5] hover:border-[#171717] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold tracking-tight text-sm">
                        {p.title}
                      </h3>
                      <ArrowUpRight
                        size={14}
                        className="text-[#737373] opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <p className="text-xs text-[#737373] line-clamp-2">
                      {p.description}
                    </p>
                  </Link>
                ))}
            </div>
          </motion.div>
        </article>
      </main>

      <footer className="py-8 px-8 md:px-12 border-t border-[#e5e5e5]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-[#737373] hover:text-[#171717] transition-colors"
          >
            tinsley.dev
          </Link>
          <p className="text-sm text-[#737373]">
            © {new Date().getFullYear()} Tinsley Devers
          </p>
        </div>
      </footer>
    </>
  );
}
