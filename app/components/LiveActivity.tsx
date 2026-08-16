"use client";

import { m } from "framer-motion";
import Image from "next/image";
import {
  Music2,
  GitCommit,
  ArrowUpRight,
  ExternalLink,
  GitBranch,
} from "lucide-react";
import type { Song, Commit } from "../lib/activity";

const GITHUB_URL = "https://github.com/tinsleydevers";

function SoundBars() {
  return (
    <div className="flex items-end gap-[2px] h-3" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <m.div
          key={i}
          animate={{
            height: ["40%", "100%", "60%", "90%", "40%"],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          className="w-[3px] bg-[#171717]"
        />
      ))}
    </div>
  );
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMins > 0) return `${diffMins}m ago`;
  return "Just now";
}

// Fallback background when a track has no album art
const getColor = (index: number) => {
  const colors = ["#171717", "#404040", "#525252"];
  return colors[index % colors.length];
};

export default function LiveActivity({
  songs,
  commits,
}: {
  songs: Song[];
  commits: Commit[];
}) {
  return (
    <section className="py-24 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column - Header */}
          <div className="lg:col-span-4">
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-widest text-[#737373] mb-3 block">
                Currently
              </span>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                What I&apos;m Up To
              </h2>
              <p className="text-[#737373] leading-relaxed">
                What I&apos;ve been listening to and building lately, pulled
                from Last.fm and GitHub.
              </p>
            </m.div>
          </div>

          {/* Right column - Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Last.fm Section */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border border-[#e5e5e5] bg-white flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#e5e5e5]">
                <div className="flex items-center gap-3">
                  <Music2 size={16} className="text-[#737373]" />
                  <span className="text-sm font-bold tracking-tight">
                    Top Tracks
                  </span>
                </div>
                <SoundBars />
              </div>

              {/* Songs list */}
              <div className="divide-y divide-[#e5e5e5] flex-1">
                {songs.length === 0 ? (
                  <div className="flex items-center justify-center h-full min-h-[180px]">
                    <div className="text-center">
                      <Music2
                        size={24}
                        className="text-[#d4d4d4] mx-auto mb-2"
                      />
                      <p className="text-sm text-[#a3a3a3]">
                        No recent listening activity
                      </p>
                    </div>
                  </div>
                ) : (
                  songs.map((song, index) => (
                    <m.a
                      key={`${song.title}-${index}`}
                      href={`https://open.spotify.com/search/${encodeURIComponent(
                        song.title + " " + song.artist
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="group flex items-center gap-4 p-4 cursor-pointer"
                    >
                      {/* Album art - color on mobile, grayscale on desktop until hover */}
                      <div
                        className="relative w-12 h-12 flex-shrink-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-300 overflow-hidden"
                        style={{ backgroundColor: getColor(index) }}
                      >
                        {song.image ? (
                          <Image
                            src={song.image}
                            alt={`${song.title} by ${song.artist}`}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Music2 size={16} className="text-white" />
                          </div>
                        )}
                      </div>

                      {/* Song info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-medium text-sm truncate">
                            {song.title}
                          </h4>
                          <ExternalLink
                            size={12}
                            className="text-[#a3a3a3] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <p className="text-xs text-[#737373] truncate">
                          {song.artist}
                        </p>
                      </div>

                      {/* Play count */}
                      <div className="text-right">
                        <span className="text-xs text-[#a3a3a3] font-medium">
                          {parseInt(song.playcount).toLocaleString()}
                        </span>
                        <p className="text-[9px] text-[#d4d4d4]">plays</p>
                      </div>
                    </m.a>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-[#e5e5e5] bg-[#fafafa] mt-auto">
                <p className="text-[10px] text-[#a3a3a3]">
                  Last 30 days • via Last.fm
                </p>
              </div>
            </m.div>

            {/* GitHub Commits Section */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border border-[#e5e5e5] bg-white flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#e5e5e5]">
                <div className="flex items-center gap-3">
                  <GitBranch size={16} className="text-[#737373]" />
                  <span className="text-sm font-bold tracking-tight">
                    Latest Commits
                  </span>
                </div>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 text-xs text-[#737373] hover:text-[#171717] transition-colors"
                >
                  View all
                  <ArrowUpRight
                    size={12}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </div>

              {/* Commits list */}
              <div className="divide-y divide-[#e5e5e5] flex-1">
                {commits.length === 0 ? (
                  <div className="flex items-center justify-center h-full min-h-[180px]">
                    <div className="text-center">
                      <GitCommit
                        size={24}
                        className="text-[#d4d4d4] mx-auto mb-2"
                      />
                      <p className="text-sm text-[#a3a3a3]">
                        No recent commits
                      </p>
                    </div>
                  </div>
                ) : (
                  commits.map((commit, index) => (
                    <m.a
                      key={commit.sha}
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="group flex items-center gap-4 p-4 cursor-pointer"
                    >
                      {/* Commit indicator */}
                      <div className="relative w-12 h-12 flex-shrink-0 bg-[#171717] flex items-center justify-center">
                        <GitCommit size={18} className="text-white" />
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Commit info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium text-sm truncate">
                            {commit.message}
                          </p>
                          <ExternalLink
                            size={12}
                            className="text-[#a3a3a3] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-[#737373]">
                            {commit.repo}
                          </span>
                          <span className="text-[#d4d4d4]">•</span>
                          <span className="text-xs text-[#a3a3a3] font-mono">
                            {commit.sha}
                          </span>
                        </div>
                      </div>

                      {/* Time */}
                      <div className="text-right flex-shrink-0">
                        <span
                          className="text-xs text-[#a3a3a3]"
                          suppressHydrationWarning
                        >
                          {timeAgo(commit.date)}
                        </span>
                      </div>
                    </m.a>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-[#e5e5e5] bg-[#fafafa] mt-auto">
                <p className="text-[10px] text-[#a3a3a3]">
                  Refreshed every 30 minutes • via GitHub
                </p>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
