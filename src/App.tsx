import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import './App.css';

// Layout
import { Navbar1 } from '@/components/ui/navbar-1';
import Footer from '@/sections/Footer';
import AIChat from '@/sections/AIChat';

// Homepage sections
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import Capabilities from '@/sections/Capabilities';
import FeaturedProject from '@/sections/FeaturedProject';
import Manufacturing from '@/sections/Manufacturing';
import Partners from '@/sections/Partners';
import Quality from '@/sections/Quality';
import Innovation from '@/sections/Innovation';
import Contact from '@/sections/Contact';

// Pages (uncomment as you build each one)
import About from '@/pages/About';
import Automotive from '@/pages/Automotive';
import Defence from '@/pages/Defence';
import ManufacturingPage from '@/pages/ManufacturingPage';
import ContactPage from '@/pages/ContactPage';
// import Materials           from '@/pages/Materials';
// import Analysis            from '@/pages/Analysis';
// import QualityPage         from '@/pages/QualityPage';
// import GovtCollaborations  from '@/pages/GovtCollaborations';
// import WhyDO               from '@/pages/WhyDO';
// import IndrajaalRanger     from '@/pages/projects/IndrajaalRanger';
// import MingoAirboat        from '@/pages/projects/MingoAirboat';
// import NHAIVehicles        from '@/pages/projects/NHAIVehicles';
// import AutomotiveProjects  from '@/pages/projects/AutomotiveProjects';
// import DefenceProjects     from '@/pages/projects/DefenceProjects';
// import Blog                from '@/pages/Blog';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Lenis singleton — lives outside React so it persists across route changes
// ─────────────────────────────────────────────────────────────────────────────
let lenisInstance: Lenis | null = null;

function getLenis(): Lenis {
  if (!lenisInstance) {
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // ✅ CORRECT: Only ONE place that drives Lenis — the GSAP ticker.
    //    The original code had BOTH a requestAnimationFrame loop AND
    //    gsap.ticker, calling lenis.raf() twice per frame which broke
    //    smooth scrolling completely.
    lenisInstance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenisInstance!.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  return lenisInstance;
}

// ─────────────────────────────────────────────────────────────────────────────
// Homepage — all landing sections
// ─────────────────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    // ✅ pt-24 gives exactly the right gap so Hero is fully visible under fixed navbar
    <main className="relative pt-24">
      <Hero />
      <Features />
      <Capabilities />
      <FeaturedProject />
      <Manufacturing />
      <Partners />
      <Quality />
      <Innovation />
      <Contact />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// App shell
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const location = useLocation();
  const snapTriggerRef = useRef<ReturnType<typeof ScrollTrigger.create> | null>(null);

  // ── Boot Lenis once ────────────────────────────────────────────────────────
  useEffect(() => {
    getLenis(); // ensures singleton is created + ticker is wired
    return () => {
      // Don't destroy on unmount — it's a singleton.
      // Only destroy if you want to fully teardown (e.g., app unload).
    };
  }, []);

  // ── On every route change: scroll to top, refresh ScrollTrigger ───────────
  useEffect(() => {
    // Instant scroll reset via Lenis
    lenisInstance?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    // Kill old snap/ScrollTrigger instances from previous route
    if (snapTriggerRef.current) {
      snapTriggerRef.current.kill();
      snapTriggerRef.current = null;
    }

    // Small delay to let the new page paint before refreshing
    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // ── GSAP pin-snap — homepage only ─────────────────────────────────────────
  useEffect(() => {
    if (location.pathname !== '/') return;

    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      snapTriggerRef.current = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;
            return pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
          },
          duration: { min: 0.2, max: 0.5 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 900);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative bg-[#0B0C0E] min-h-screen overflow-x-hidden">
      {/* Film-grain noise */}
      <div className="fixed inset-0 pointer-events-none z-[100] noise-overlay opacity-40" />

      {/* Navbar — always on top, fixed pill */}
      <Navbar1 />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/automotive" element={<Automotive />} />
        <Route path="/defence" element={<Defence />} />
        <Route path="/manufacturing" element={<ManufacturingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/*
         * Uncomment as you build each page:
         * <Route path="/materials"                 element={<Materials />} />
         * <Route path="/analysis"                  element={<Analysis />} />
         * <Route path="/quality"                   element={<QualityPage />} />
         * <Route path="/govt-collaborations"       element={<GovtCollaborations />} />
         * <Route path="/why-do"                    element={<WhyDO />} />
         * <Route path="/projects/indrajaal-ranger" element={<IndrajaalRanger />} />
         * <Route path="/projects/mingo-airboat"    element={<MingoAirboat />} />
         * <Route path="/projects/nhai-vehicles"    element={<NHAIVehicles />} />
         * <Route path="/projects/automotive"       element={<AutomotiveProjects />} />
         * <Route path="/projects/defence"          element={<DefenceProjects />} />
         * <Route path="/blog"                      element={<Blog />} />
         */}
      </Routes>

      {/* Footer — all pages */}
      <Footer />

      {/* AI chat bubble */}
      <AIChat />
    </div>
  );
}

export default App;