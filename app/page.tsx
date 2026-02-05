import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Spotify from "./components/Spotify";
import About from "./components/About";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <Header />
      <main>
        <Hero />
        <Projects />
        <Timeline />
        <Spotify />
        <About />
      </main>
      <Footer />
    </>
  );
}
