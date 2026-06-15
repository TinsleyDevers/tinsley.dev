"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

interface TimelineItem {
  type: "work" | "education";
  title: string;
  organization: string;
  location?: string;
  date: string;
  description: string;
  current?: boolean;
}

const workItems: TimelineItem[] = [
  {
    type: "work",
    title: "IT Chair",
    organization: "Baruch Esports Association — Baruch College",
    location: "New York, NY",
    date: "Jan 2026 - Present",
    description:
      "Lead IT for a 100+ member organization: manage and schedule a team across live esports events, provide Tier 1/2 support for Windows workstations, networking, A/V, and streaming gear, and administer the community's Discord roles and access.",
    current: true,
  },
  {
    type: "work",
    title: "Associate Systems Administrator",
    organization: "Calhoun Community College — Esports",
    location: "Huntsville, AL",
    date: "Jan 2024 - May 2025",
    description:
      "Built, deployed, and validated 26 Windows 11 workstations end-to-end (imaging, driver packaging, SCCM distribution). Administered Active Directory, resolved BSOD/boot/hardware faults, and authored SOPs that reduced repeat incidents.",
  },
  {
    type: "work",
    title: "Operations Supervisor",
    organization: "Carter Express",
    location: "Madison, AL",
    date: "Mar 2022 - Jun 2023",
    description:
      "Supervised a 40-person warehouse team across supply chain operations; tracked KPIs and implemented process improvements that increased retention and attendance.",
  },
];

const educationItems: TimelineItem[] = [
  {
    type: "education",
    title: "B.B.A. in Computer Information Systems",
    organization: "Baruch College (CUNY), Zicklin School of Business",
    location: "New York, NY",
    date: "Jan 2026 - Present",
    description: "Computer Information Systems.",
    current: true,
  },
  {
    type: "education",
    title: "A.S. in Computer Science",
    organization: "Calhoun Community College",
    location: "Huntsville, AL",
    date: "Jan 2024 - May 2025",
    description: "Cum Laude, Choir Bass Vocalist, Varsity Esports Player.",
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

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  return (
    <motion.div
      key={`${item.title}-${index}`}
      variants={itemVariants}
      className="relative grid grid-cols-1 md:grid-cols-[24px_1fr] gap-4 md:gap-6"
    >
      {/* Icon */}
      <div className="hidden md:flex items-start justify-center pt-1">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            item.current
              ? "bg-[#171717] text-white"
              : "bg-[#fafafa] border border-[#e5e5e5] text-[#737373]"
          }`}
        >
          {item.type === "work" ? (
            <Briefcase size={12} />
          ) : (
            <GraduationCap size={12} />
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={`p-5 border transition-colors ${
          item.current
            ? "bg-white border-[#171717]"
            : "bg-white border-[#e5e5e5] hover:border-[#d4d4d4]"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="md:hidden">
                {item.type === "work" ? (
                  <Briefcase size={14} className="text-[#737373]" />
                ) : (
                  <GraduationCap size={14} className="text-[#737373]" />
                )}
              </span>
              {item.current && (
                <span className="text-[10px] px-2 py-0.5 bg-[#171717] text-white font-medium">
                  CURRENT
                </span>
              )}
            </div>
            <h3 className="font-bold tracking-tight">{item.title}</h3>
            <p className="text-sm text-[#737373]">
              {item.organization}
              {item.location && ` · ${item.location}`}
            </p>
          </div>
          <span className="text-xs text-[#737373] whitespace-nowrap">
            {item.date}
          </span>
        </div>
        <p className="text-sm text-[#525252] leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

function TimelineTrack({
  label,
  icon,
  items,
}: {
  label: string;
  icon: React.ReactNode;
  items: TimelineItem[];
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Track label */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[#737373]">{icon}</span>
        <span className="text-[10px] uppercase tracking-widest font-medium text-[#525252]">
          {label}
        </span>
        <span className="flex-1 h-px bg-[#e5e5e5]" />
      </div>

      {/* Track items + connecting line */}
      <div className="relative">
        <div className="absolute left-[11px] top-3 bottom-3 w-px bg-[#e5e5e5] hidden md:block" />
        <div className="space-y-6">
          {items.map((item, index) => (
            <TimelineCard key={`${item.title}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section
      id="experience"
      className="py-24 px-8 md:px-12 bg-[#fafafa] border-y border-[#e5e5e5]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column - Header */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-xs uppercase tracking-widest text-[#737373] mb-3 block">
                Background
              </span>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Experience & Education
              </h2>
              <p className="text-[#737373] leading-relaxed">
                From IT Support to managing warehouse operations, my path
                has been defined by solving problems and shipping solutions.
              </p>
            </motion.div>
          </div>

          {/* Right column - Separate Work & Education tracks */}
          <div className="lg:col-span-8 space-y-14">
            <TimelineTrack
              label="Experience"
              icon={<Briefcase size={14} />}
              items={workItems}
            />
            <TimelineTrack
              label="Education"
              icon={<GraduationCap size={14} />}
              items={educationItems}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
