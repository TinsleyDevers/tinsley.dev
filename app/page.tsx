import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import LiveActivity from "./components/LiveActivity";
import About from "./components/About";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { getTopTracks, getRecentCommits } from "./lib/activity";

// Regenerate the page (and its Last.fm/GitHub data) at most every 30 minutes.
export const revalidate = 1800;

export default async function Home() {
  const [songs, commits] = await Promise.all([
    getTopTracks(),
    getRecentCommits(),
  ]);

  return (
    <>
      <BackToTop />
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <Timeline />
        <LiveActivity songs={songs} commits={commits} />
        <About />
      </main>
      <Footer />
    </>
  );
}
