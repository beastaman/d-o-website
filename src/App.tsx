import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import './App.css';

// Components
import { Navbar1 } from '@/components/ui/navbar-1';

// Sections
import Hero from './sections/Hero';
import Features from './sections/Features';
import Capabilities from './sections/Capabilities';
import FeaturedProject from './sections/FeaturedProject';
import Manufacturing from './sections/Manufacturing';
import Partners from './sections/Partners';
import Quality from './sections/Quality';
import Innovation from './sections/Innovation';
import Contact from './sections/Contact';
import AIChat from './sections/AIChat';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for ultra-smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use RAF for smooth animation
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ticker with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Wait for all sections to mount before setting up global snap
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.2, max: 0.5 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 800);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#0B0C0E] min-h-screen overflow-x-hidden">
      {/* Fixed noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] noise-overlay opacity-40" />
      
      {/* Navigation */}
      <Navbar1 />
      
      {/* Main content */}
      <main className="relative">
        <Hero className="z-10" />
        <Features className="z-20" />
        <Capabilities className="z-30" />
        <FeaturedProject className="z-40" />
        <Manufacturing className="z-50" />
        <Partners className="z-[60]" />
        <Quality className="z-[70]" />
        <Innovation className="z-[80]" />
        <Contact className="z-[90]" />
      </main>
      
      {/* AI Chat Widget */}
      <AIChat />
    </div>
  );
}

export default App;
