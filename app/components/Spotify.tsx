"use client";

import { motion } from "framer-motion";
import { Music2, GitCommit, ArrowUpRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface Song {
  title: string;
  artist: string;
  playcount: string;
  url: string;
  image: string;
}

interface Commit {
  message: string;
  repo: string;
  time: string;
  url: string;
}

// Credentials from .env.local
const LASTFM_API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY!;
const LASTFM_USERNAME = process.env.NEXT_PUBLIC_LASTFM_USERNAME!;
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME!;

function SoundBars() {
  return (
    <div className="flex items-end gap-[2px] h-3">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
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

// Helper to fetch album image from Last.fm
async function fetchAlbumImage(artist: string, track: string): Promise<string> {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(
        artist
      )}&track=${encodeURIComponent(track)}&format=json`
    );
    const data = await response.json();

    // Try to get album image
    if (data.track?.album?.image) {
      const images = data.track.album.image;
      const large = images.find(
        (img: { size: string; "#text": string }) => img.size === "large"
      );
      const medium = images.find(
        (img: { size: string; "#text": string }) => img.size === "medium"
      );
      const extralarge = images.find(
        (img: { size: string; "#text": string }) => img.size === "extralarge"
      );

      const imageUrl =
        extralarge?.["#text"] || large?.["#text"] || medium?.["#text"] || "";
      if (imageUrl && !imageUrl.includes("2a96cbd8b46e442fc41c2b86b821562f")) {
        return imageUrl;
      }
    }
    return "";
  } catch {
    return "";
  }
}

export default function Spotify() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [loadingCommits, setLoadingCommits] = useState(true);

  // Fetch Last.fm top tracks
  useEffect(() => {
    async function fetchTopTracks() {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&period=1month&limit=3&format=json`
        );
        const data = await response.json();

        if (data.toptracks?.track && data.toptracks.track.length > 0) {
          // map basic track info
          const basicTracks = data.toptracks.track.map(
            (track: {
              name: string;
              artist: { name: string };
              playcount: string;
              url: string;
            }) => ({
              title: track.name,
              artist: track.artist.name,
              playcount: track.playcount,
              url: track.url,
              image: "",
            })
          );

          // fetch album images for each track
          const tracksWithImages = await Promise.all(
            basicTracks.map(async (track: Song) => {
              const albumImage = await fetchAlbumImage(
                track.artist,
                track.title
              );
              return { ...track, image: albumImage };
            })
          );

          setSongs(tracksWithImages);
        } else {
          setSongs([]);
        }
      } catch (error) {
        console.error("Failed to fetch Last.fm tracks:", error);
        setSongs([]);
      } finally {
        setLoadingSongs(false);
      }
    }

    fetchTopTracks();
  }, []);

  // Fetch GitHub commits
  useEffect(() => {
    async function fetchCommits() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`
        );
        const events = await response.json();

        if (!Array.isArray(events)) {
          setCommits([]);
          return;
        }

        // Filter for push events and extract commits
        const pushEvents = events.filter(
          (event: { type: string }) => event.type === "PushEvent"
        );

        const recentCommits: Commit[] = [];
        for (const event of pushEvents) {
          if (recentCommits.length >= 3) break;

          const repoName = event.repo.name.replace(`${GITHUB_USERNAME}/`, "");
          const eventCommits = event.payload.commits || [];

          for (const commit of eventCommits) {
            if (recentCommits.length >= 3) break;

            // Calculate relative time
            const commitDate = new Date(event.created_at);
            const now = new Date();
            const diffMs = now.getTime() - commitDate.getTime();
            const diffMins = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffHours / 24);

            let timeAgo = "";
            if (diffDays > 0) {
              timeAgo = `${diffDays}d ago`;
            } else if (diffHours > 0) {
              timeAgo = `${diffHours}h ago`;
            } else if (diffMins > 0) {
              timeAgo = `${diffMins}m ago`;
            } else {
              timeAgo = "Just now";
            }

            recentCommits.push({
              message: commit.message.split("\n")[0],
              repo: repoName,
              time: timeAgo,
              url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
            });
          }
        }

        setCommits(recentCommits);
      } catch (error) {
        console.error("Failed to fetch GitHub commits:", error);
        setCommits([]);
      } finally {
        setLoadingCommits(false);
      }
    }

    fetchCommits();
  }, []);

  // Generate a color based on song index for fallback
  const getColor = (index: number) => {
    const colors = ["#171717", "#404040", "#525252"];
    return colors[index % colors.length];
  };

  return (
    <section className="py-24 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column - Header */}
          <div className="lg:col-span-4">
            <motion.div
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
                Live data from Spotify and GitHub showing what I&apos;m
                listening to and building.
              </p>
            </motion.div>
          </div>

          {/* Right column - Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Last.fm Section */}
            <motion.div
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
                {loadingSongs ? (
                  // Loading skeleton with staggered animation
                  Array.from({ length: 3 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4"
                    >
                      <div className="w-12 h-12 bg-[#f5f5f5] animate-pulse" />
                      <div className="flex-1">
                        <div className="h-4 bg-[#f5f5f5] rounded w-3/4 mb-2 animate-pulse" />
                        <div className="h-3 bg-[#f5f5f5] rounded w-1/2 animate-pulse" />
                      </div>
                    </motion.div>
                  ))
                ) : songs.length === 0 ? (
                  // Empty state
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
                    <motion.a
                      key={`${song.title}-${index}`}
                      href={`https://open.spotify.com/search/${encodeURIComponent(
                        song.title + " " + song.artist
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="group flex items-center gap-4 p-4 cursor-pointer"
                    >
                      {/* Album art - color on mobile, grayscale on desktop until hover */}
                      <div
                        className="relative w-12 h-12 flex-shrink-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-300 overflow-hidden"
                        style={{ backgroundColor: getColor(index) }}
                      >
                        {song.image ? (
                          <img
                            src={song.image}
                            alt={`${song.title} by ${song.artist}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Music2 size={16} className="text-white/40" />
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
                    </motion.a>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-[#e5e5e5] bg-[#fafafa] mt-auto">
                <p className="text-[10px] text-[#a3a3a3]">
                  Last 30 days • via Last.fm
                </p>
              </div>
            </motion.div>

            {/* GitHub Commits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border border-[#e5e5e5] bg-white flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#e5e5e5]">
                <div className="flex items-center gap-3">
                  <GitCommit size={16} className="text-[#737373]" />
                  <span className="text-sm font-bold tracking-tight">
                    Latest Commits
                  </span>
                </div>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
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
                {loadingCommits ? (
                  // Loading skeleton with staggered animation
                  Array.from({ length: 3 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4"
                    >
                      <div className="h-4 bg-[#f5f5f5] rounded w-3/4 mb-2 animate-pulse" />
                      <div className="h-3 bg-[#f5f5f5] rounded w-1/3 animate-pulse" />
                    </motion.div>
                  ))
                ) : commits.length === 0 ? (
                  // Empty state
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
                    <motion.a
                      key={index}
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="block p-4 group"
                    >
                      <p className="text-sm font-mono truncate text-[#171717] mb-1">
                        {commit.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#737373] font-medium">
                          {commit.repo}
                        </span>
                        <span className="text-[#d4d4d4]">•</span>
                        <span className="text-[10px] text-[#a3a3a3]">
                          {commit.time}
                        </span>
                      </div>
                    </motion.a>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-[#e5e5e5] bg-[#fafafa] mt-auto">
                <p className="text-[10px] text-[#a3a3a3]">Live from GitHub</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
