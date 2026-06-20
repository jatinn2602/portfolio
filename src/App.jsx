import { useEffect } from 'react';
import Lenis from 'lenis';
import AboutMe from "./components/AboutMe"
import Hero from "./components/Hero"
import Navbar from "./utils/Navbar"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Contact from "./components/Contact"
import Starfield from "./utils/Starfield"
import LiquidCursor from "./utils/LiquidCursor"


const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    window.lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <>
      <Starfield/>
      <LiquidCursor/>
      <Navbar/>
      <Hero/>
      <AboutMe/>
      <Skills/>
      <Projects/>
      <Contact/>
    </>
  )
}

export default App