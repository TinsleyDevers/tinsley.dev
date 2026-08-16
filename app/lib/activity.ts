// Server-side fetchers for the "What I'm Up To" section.
// Runs at build/revalidate time, so API keys never reach the browser
// and visitors don't spend their own GitHub rate limit.

export interface Song {
  title: string;
  artist: string;
  playcount: string;
  url: string;
  image: string;
}

export interface Commit {
  message: string;
  repo: string;
  url: string;
  sha: string;
  date: string; // ISO timestamp
}

// Fall back to the old NEXT_PUBLIC_ names so an existing .env.local keeps
// working; nothing here is shipped to the client either way.
const LASTFM_API_KEY =
  process.env.LASTFM_API_KEY ?? process.env.NEXT_PUBLIC_LASTFM_API_KEY;
const LASTFM_USERNAME =
  process.env.LASTFM_USERNAME ?? process.env.NEXT_PUBLIC_LASTFM_USERNAME;
const GITHUB_USERNAME =
  process.env.GITHUB_USERNAME ?? process.env.NEXT_PUBLIC_GITHUB_USERNAME;

const REVALIDATE_SECONDS = 1800;

const LASTFM_PLACEHOLDER = "2a96cbd8b46e442fc41c2b86b821562f";

interface LastfmImage {
  size: string;
  "#text": string;
}

async function fetchAlbumImage(
  artist: string,
  track: string
): Promise<string> {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(
        artist
      )}&track=${encodeURIComponent(track)}&format=json`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!response.ok) return "";
    const data = await response.json();
    const images: LastfmImage[] = data.track?.album?.image ?? [];
    const bySize = (size: string) =>
      images.find((img) => img.size === size)?.["#text"] || "";
    const imageUrl =
      bySize("extralarge") || bySize("large") || bySize("medium");
    return imageUrl && !imageUrl.includes(LASTFM_PLACEHOLDER) ? imageUrl : "";
  } catch {
    return "";
  }
}

export async function getTopTracks(): Promise<Song[]> {
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) return [];
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&period=1month&limit=3&format=json`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!response.ok) return [];
    const data = await response.json();
    const tracks = data.toptracks?.track;
    if (!Array.isArray(tracks) || tracks.length === 0) return [];

    return Promise.all(
      tracks.map(
        async (track: {
          name: string;
          artist: { name: string };
          playcount: string;
          url: string;
        }) => ({
          title: track.name,
          artist: track.artist.name,
          playcount: track.playcount,
          url: track.url,
          image: await fetchAlbumImage(track.artist.name, track.name),
        })
      )
    );
  } catch (error) {
    console.error("Failed to fetch Last.fm tracks:", error);
    return [];
  }
}

interface GithubPushEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: { sha: string; message: string }[];
  };
}

export async function getRecentCommits(): Promise<Commit[]> {
  if (!GITHUB_USERNAME) return [];
  try {
    // The public events feed returns recent pushes across all repos in a
    // single request, unlike listing repos and then commits per repo.
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "tinsley.dev",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );
    if (!response.ok) return [];
    const events: GithubPushEvent[] = await response.json();
    if (!Array.isArray(events)) return [];

    const commits: Commit[] = [];
    for (const event of events) {
      if (event.type !== "PushEvent") continue;
      for (const commit of event.payload.commits ?? []) {
        if (commits.some((c) => c.sha === commit.sha.substring(0, 7))) continue;
        commits.push({
          message: commit.message.split("\n")[0],
          repo: event.repo.name.split("/")[1] ?? event.repo.name,
          url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          sha: commit.sha.substring(0, 7),
          date: event.created_at,
        });
        if (commits.length >= 3) return commits;
      }
    }
    return commits;
  } catch (error) {
    console.error("Failed to fetch GitHub commits:", error);
    return [];
  }
}
