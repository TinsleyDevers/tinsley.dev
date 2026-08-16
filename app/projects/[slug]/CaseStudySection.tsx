"use client";

import { m } from "framer-motion";
import { Search, Lightbulb, Wrench, TrendingUp } from "lucide-react";
import type { CaseStudy } from "../../lib/projects";

// Kept out of the page while the case-study content gets reworked.
// Render <CaseStudySection caseStudy={project.caseStudy} /> to bring it back.
export default function CaseStudySection({
  caseStudy,
}: {
  caseStudy: CaseStudy;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-24 pt-12 border-t border-[#e5e5e5]"
    >
      <h2 className="text-2xl font-bold tracking-tight mb-12">Case Study</h2>

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
                  {caseStudy.problem.title}
                </h3>
              </div>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="text-[#525252] leading-relaxed mb-4">
              {caseStudy.problem.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseStudy.problem.painPoints.map((point, i) => (
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
                  {caseStudy.research.title}
                </h3>
              </div>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="text-[#525252] leading-relaxed mb-4">
              {caseStudy.research.description}
            </p>
            <div className="bg-[#fafafa] border border-[#e5e5e5] p-4">
              <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3] mb-3 block">
                Key Insights
              </span>
              <div className="space-y-2">
                {caseStudy.research.insights.map((insight, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-[#525252]"
                  >
                    <span className="w-1.5 h-1.5 bg-[#ca8a04] mt-1.5 flex-shrink-0" />
                    {insight}
                  </div>
                ))}
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
                  {caseStudy.solution.title}
                </h3>
              </div>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="text-[#525252] leading-relaxed mb-4">
              {caseStudy.solution.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseStudy.solution.decisions.map((decision, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-[#737373]"
                >
                  <span className="w-1.5 h-1.5 bg-[#16a34a] mt-1.5 flex-shrink-0" />
                  {decision}
                </div>
              ))}
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
                  {caseStudy.outcome.title}
                </h3>
              </div>
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {caseStudy.outcome.metrics.map((metric, i) => (
                <div key={i} className="bg-[#171717] text-white p-4 text-center">
                  <div className="text-2xl font-bold tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs text-white/60">{metric.label}</div>
                </div>
              ))}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3] mb-3 block">
                What I Learned
              </span>
              <div className="space-y-2">
                {caseStudy.outcome.learnings.map((learning, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-[#525252]"
                  >
                    <span className="w-1.5 h-1.5 bg-[#2563eb] mt-1.5 flex-shrink-0" />
                    {learning}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}
