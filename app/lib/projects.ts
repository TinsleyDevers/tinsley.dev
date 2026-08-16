// Single source of truth for project data, shared by the home page cards,
// the project detail pages, and the sitemap.

export interface CaseStudy {
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

export interface Project {
  slug: string;
  title: string;
  /** Short blurb shown on the home page card */
  summary: string;
  /** One-liner shown on the detail page hero and in metadata */
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

export const projects: Project[] = [
  {
    slug: "calhoun-rmp",
    title: "CalhounRMP",
    summary:
      "Chrome extension that displays Rate My Professors ratings directly on the Calhoun Community College class registration page, helping students make informed decisions.",
    description:
      "Chrome extension that displays Rate My Professors ratings directly on the Calhoun Community College class registration page.",
    year: "2025",
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
          "Rather than building a separate tool, I decided to inject RMP data directly into the existing registration workflow, meeting users where they already are.",
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
          "Caching strategy was critical for performance. Users expect instant data",
          "Simple UI (color-coded ratings) beat complex dashboards for this use case",
        ],
      },
    },
    links: {
      live: "https://chromewebstore.google.com/detail/alnpagcppnpochmheecogiogkibcnkgi",
      github: "https://github.com/tinsleydevers/CalhounRMP",
    },
  },
  {
    slug: "excelbnb",
    title: "Excelbnb",
    summary:
      "Turns Airbnb pages into an Excel spreadsheet to easily sort through listings, streamlining the property research process for users.",
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
          "Built a Python script that extracts structured data from Airbnb pages and outputs clean, sortable Excel files, eliminating manual data entry entirely.",
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
          "Output format matters. Excel was chosen for familiarity, not technical superiority",
          "Error handling is critical when dealing with inconsistent web pages",
        ],
      },
    },
    links: {
      github: "https://github.com/tinsleydevers/Excelbnb",
    },
  },
  {
    slug: "zone7-utility",
    title: "Zone7 Utility",
    summary:
      "Minecraft Java plugin built for the Zone7 server (zone7.apexmc.co), enhancing player experience with custom utilities.",
    description:
      "Minecraft Java plugin built for the Zone7 server (zone7.apexmc.co).",
    year: "2023",
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
          "As Zone7 grew, the server admins needed custom tools to manage players and enhance the experience, but existing plugins didn't fit their specific needs.",
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
          "Performance was non-negotiable. No lag tolerance",
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
          "Less is more. Focused features beat feature bloat",
          "Performance testing is critical for server-side applications",
        ],
      },
    },
    links: {
      github: "https://github.com/tinsleydevers/Zone7-Utility",
    },
  },
  {
    slug: "tinsley-dev",
    title: "tinsley.dev",
    summary:
      "Personal portfolio website showcasing projects and skills with a focus on clean design and smooth user experience.",
    description: "Personal portfolio website showcasing projects and skills.",
    year: "2026",
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
          "Most developer portfolios look the same: template-based, generic, and forgettable. I needed a site that would stand out while clearly communicating my PM-oriented approach to building products.",
        painPoints: [
          "Generic portfolio templates lack personality",
          "Showing projects isn't enough. I need to show thinking",
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
          "The portfolio itself is a product. Apply the same rigor as any other project",
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
