"use client";

import { motion } from "framer-motion";

const skills = {
  Product: [
    "User Research",
    "Problem Definition",
    "Roadmapping",
    "Prioritization",
  ],
  Technical: ["Python", "JavaScript", "SQL", "Data Analysis"],
  Design: ["Figma", "Wireframing", "User Flows", "Prototyping"],
  Tools: ["Git", "Jira", "Notion", "Excel"],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-8 md:px-12 border-t border-[#e5e5e5]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column - About text */}
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-widest text-[#737373] mb-3 block"
            >
              About
            </motion.span>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight mb-8"
            >
              A bit about me
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-[#737373]">
                I&apos;m a{" "}
                <span className="text-[#171717] font-medium">creative</span>{" "}
                with a technical background who loves turning{" "}
                <span className="text-[#171717] font-medium">
                  user problems
                </span>{" "}
                into{" "}
                <span className="text-[#171717] font-medium">
                  working solutions
                </span>
                . My projects focus on identifying pain points and shipping
                products that make a real difference.
              </p>
              <p className="text-lg leading-relaxed text-[#737373]">
                From founding a social startup to managing warehouse operations
                for Toyota and Mazda, I bring{" "}
                <span className="text-[#171717] font-medium">
                  cross-functional experience
                </span>{" "}
                and a bias for action. Currently pursuing my degree at Baruch
                College while building in NYC.
              </p>
            </motion.div>
          </div>

          {/* Right column - Skills */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-widest text-[#737373] mb-3 block"
            >
              Skills
            </motion.span>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight mb-8"
            >
              What I work with
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {Object.entries(skills).map(([category, items]) => (
                <motion.div key={category} variants={itemVariants}>
                  <h4 className="font-bold tracking-tight mb-4 text-sm">
                    {category}
                  </h4>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-[#737373] flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-[#d4d4d4]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
