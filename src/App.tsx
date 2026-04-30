import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Work from './sections/Work';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [ready, setReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const handlePreloaderComplete = () => {
    setReady(true);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  };

  useEffect(() => {
    return () => {
      lenisRef.current?.destroy();
      gsap.ticker.remove(() => { });
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Preloader onComplete={handlePreloaderComplete} />
      <ScrollProgress />
      <Nav />
      {/* Desktop cursor only — hidden on touch via CSS */}
      <Cursor />
      <main id="main">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
