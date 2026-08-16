"use client";

import { m } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { projects, type Project } from "../../lib/projects";
import BackToTop from "../../components/BackToTop";

export default function ProjectDetail({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      <BackToTop />

      <m.header
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
      </m.header>

      <main id="main" className="pt-32 pb-24 px-8 md:px-12">
        <article className="max-w-[1000px] mx-auto">
          {/* Hero section */}
          <m.div
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
          </m.div>

          {/* Tags & Links */}
          <m.div
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
          </m.div>

          {/* Content grid */}
          <m.div
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
          </m.div>

          {/* Previous / Next Navigation */}
          <m.div
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
                      className="text-[#737373] group-hover:text-[#171717] group-hover:-translate-x-1 transition-all"
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
                      className="text-[#737373] group-hover:text-[#171717] group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </m.div>

          {/* Other projects */}
          <m.div
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
                .filter((p) => p.slug !== project.slug)
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
          </m.div>
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
