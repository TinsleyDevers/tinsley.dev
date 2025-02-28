// app/page.tsx
"use client";

import { motion, Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function HomePage() {
  const projectsData = [
    {
      name: "tinsley.dev",
      description: "My Portfolio Website",
      skills: ["React", "Framer Motion", "Tailwind CSS"],
      github: "https://github.com/TinsleyDevers/tinsley.dev",
    },
    {
      name: "Excelbnb",
      description:
        "Python application to convert Airbnb listings into a structured Excel spreadsheet.",
      skills: ["Python", "Web Scraping", "Data Analysis"],
      github: "https://github.com/TinsleyDevers/Excelbnb",
    },
    {
      name: "Zone7 Utility",
      description: "Minecraft Java Plugin.",
      skills: ["Java", "OOP", "API"],
      github: "https://github.com/TinsleyDevers/Zone7-Utility",
    },
    {
      name: "Calhoun Grades Webscraper",
      description:
        "Python app for scraping grades from Blackboard and converting into an Excel spreadsheet.",
      skills: ["Python", "Web Scraping", "Data Analysis"],
      github: "https://github.com/TinsleyDevers/CalhounGrades",
    },
    {
      name: "WORK IN PROGRESS",
      description:
        "This webpage is a work in progress and is actively being worked on.\nCheck out my GitHub for more info.",
      skills: [],
      github: "https://github.com/TinsleyDevers",
    },
  ];

  const experienceData = [
    {
      jobName: "Frontend Developer",
      companyName: "Lorem Ipsum",
      dateWorked: "2022 - Present",
      description:
        "Developing responsive UI components, lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      skills: ["React", "Tailwind CSS", "TypeScript"],
    },
    {
      jobName: "Web Developer Intern",
      companyName: "Lorem Ipsum",
      dateWorked: "2021 - 2022",
      description:
        "Maintained internal tools, lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      skills: ["HTML", "CSS", "JavaScript"],
    },
  ];

  const educationData = [
    {
      major: "B.S. in Computer Science",
      school: "Undecided",
      graduationDate: "Expected: December 2026 / May 2027",
    },
    {
      major: "A.S. in Computer Science",
      school: "Calhoun Community College",
      graduationDate: "Graduated: May 2025",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center min-h-screen px-4"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi, I'm Tinsley Devers
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg mb-2 max-w-xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          I build beautiful, modern, feature-packed, and interactive
          experiences.
        </motion.p>
        <motion.p
          className="text-xs sm:text-sm mb-8 max-w-xl text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          This website is a concept and not a finished product, check out my
          GitHub for now!
        </motion.p>

        {/* CTA button*/}
        <motion.a
          href="#about"
          className="relative inline-block px-8 py-3 font-semibold text-white rounded-full bg-purple-700 overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span
            className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                     opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          />
          <span className="relative z-10">Explore About Me</span>
        </motion.a>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        className="min-h-screen flex flex-col items-center justify-center px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">About Me</h2>
        <p className="max-w-2xl text-center text-sm sm:text-base">
          I’m a developer specializing in dolor sit amet, consectetur adipiscing
          elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
        </p>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Skills</h2>
        <div className="max-w-[800px] mx-auto flex flex-wrap justify-center gap-4">
          {[
            "HTML5",
            "CSS3",
            "JavaScript",
            "React",
            "Next.js",
            "Tailwind CSS",
          ].map((skill) => (
            <div
              key={skill}
              className="bg-white/5 hover:bg-white/10 text-white
                           px-4 py-2 sm:px-5 sm:py-2 rounded-2xl text-sm sm:text-base
                           transition-all duration-300
                           hover:shadow-md hover:scale-105"
            >
              {skill}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Projects</h2>
        <div className="projects flex flex-wrap justify-center gap-4 max-w-[1000px] mx-auto">
          {projectsData.map((project) => (
            <div
              key={project.name}
              className="
                bg-white/5 hover:bg-white/10 text-white p-4 sm:p-6 rounded-lg max-w-[350px]
                flex-1 min-w-[250px] transform
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
                cursor-default relative
              "
            >
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-purple-400 whitespace-pre-line">
                {project.name}
              </h3>
              <p className="mb-2 text-gray-300 whitespace-pre-line text-sm sm:text-base">
                {project.description}
              </p>

              {/* Skill badges */}
              {project.skills?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm transition-transform duration-300 hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* GitHub link */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block group text-gray-100 hover:text-gray-50 transition-colors text-sm"
              >
                View on GitHub
                <span className="absolute left-1/2 -bottom-1 block h-[1px] w-0 underscore-glow transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
              </a>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Experience</h2>
        <div className="max-w-[800px] mx-auto flex flex-col space-y-6">
          {experienceData.map((job) => (
            <div
              key={job.jobName}
              className="
                bg-white/5 hover:bg-white/10 text-white p-6 rounded-lg
                transition-all duration-300 hover:shadow-lg cursor-default
              "
            >
              <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-1">
                {job.jobName}
              </h3>
              {/* New: Company name */}
              <p className="text-sm sm:text-base text-gray-300 mb-1 font-semibold">
                {job.companyName}
              </p>
              <h4 className="text-xs sm:text-sm text-gray-300 mb-2">
                {job.dateWorked}
              </h4>
              <p className="text-gray-300 text-sm sm:text-base mb-3">
                {job.description}
              </p>

              {/* Interactive skill badges for experience */}
              {job.skills && job.skills.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm transition-transform duration-300 hover:scale-105 hover:shadow-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Education</h2>
        <div className="max-w-[800px] w-full mx-auto flex flex-col space-y-6">
          {educationData.map((ed) => (
            <div
              key={ed.school}
              className="w-full bg-white/5 hover:bg-white/10
                         text-white p-6 rounded-lg
                         transition-all duration-300
                         hover:shadow-lg cursor-default"
            >
              <h3 className="text-lg sm:text-xl font-bold text-purple-400">
                {ed.major}
              </h3>
              <h4 className="text-xs sm:text-sm text-gray-300 mb-1">
                {ed.school}
              </h4>
              <p className="text-xs sm:text-sm text-gray-400">
                {ed.graduationDate}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="min-h-screen flex flex-col items-center justify-center px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact Me</h2>
        <p className="mb-2 max-w-md text-center text-sm sm:text-base">
          Have a project or want to say hello? Reach out!
        </p>
        <p className="text-xs sm:text-sm text-gray-400 mb-4">
          contact@tinsley.dev
        </p>
        <motion.a
          href="mailto:contact@tinsley.dev"
          className="relative inline-block px-8 py-3 font-semibold text-white rounded-full bg-purple-600 overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span
            className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                   opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          />
          <span className="relative z-10">Email Me</span>
        </motion.a>
      </motion.section>
    </>
  );
}
