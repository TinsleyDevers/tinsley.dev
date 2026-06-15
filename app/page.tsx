import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Spotify from "./components/Spotify";
import About from "./components/About";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function Home() {
  return (
    <>
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
