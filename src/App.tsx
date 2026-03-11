import { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Lenis from '@studio-freight/lenis';

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

// Pages
import About from '@/pages/About';
import Automotive from '@/pages/Automotive';
import Defence from '@/pages/Defence';
import ManufacturingPage from '@/pages/ManufacturingPage';
import ContactPage from '@/pages/ContactPage';
import Materials from '@/pages/Materials';
import Analysis from '@/pages/Analysis';
import QualityPage from '@/pages/QualityPage';
import GovtCollaborations from '@/pages/GovtCollaborations';
import WhyDO from '@/pages/WhyDO';
import DataLibrary from '@/pages/DataLibrary';
import Blog from '@/pages/Blog';
import IndrajaalRanger from '@/pages/projects/IndrajaalRanger';
import MingoAirboat from '@/pages/projects/MingoAirboat';
import NHAIVehicles from '@/pages/projects/NHAIVehicles';
import AutomotiveProjects from '@/pages/projects/AutomotiveProjects';
import DefenceProjects from '@/pages/projects/DefenceProjects';
import GeneralEngineeringProjects from '@/pages/projects/GeneralEngineeringProjects';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Lenis singleton — lives outside React so it persists across route changes
// ─────────────────────────────────────────────────────────────────────────────
// export let lenisInstance: Lenis | null = null;

// function getLenis(): Lenis {
//   if (!lenisInstance) {
//     lenisInstance = new Lenis({
//       duration: 1.0,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       orientation: 'vertical',
//       gestureOrientation: 'vertical',
//       smoothWheel: true,
//       wheelMultiplier: 1.1,
//       touchMultiplier: 2,
//       infinite: false,
//     });

//     lenisInstance.on('scroll', ScrollTrigger.update);
//     gsap.ticker.add((time) => lenisInstance!.raf(time * 1000));
//     gsap.ticker.lagSmoothing(0);
//   }
//   return lenisInstance;
// }

// ─────────────────────────────────────────────────────────────────────────────
// Homepage — all landing sections
// ─────────────────────────────────────────────────────────────────────────────
function HomePage() {
  return (
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

  // ── Boot Lenis once ────────────────────────────────────────────────────────
  // useEffect(() => {
  //   getLenis();
  // }, []);

  // ── Disable browser's native scroll restoration (it fights our reset) ──────
  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // ── On every route change: scroll to top, refresh ScrollTrigger ───────────
  // useLayoutEffect fires synchronously before paint, before child effects
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  useEffect(() => {
    // After ScrollTrigger recalculates positions, reset scroll again in case
    // pin spacer removal or new triggers shifted it
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    }, 50);
    return () => clearTimeout(t);
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
        <Route path="/materials" element={<Materials />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/quality" element={<QualityPage />} />
        <Route path="/govt-collaborations" element={<GovtCollaborations />} />
        <Route path="/why-do" element={<WhyDO />} />
        <Route path="/data-library" element={<DataLibrary />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/projects/indrajaal-ranger" element={<IndrajaalRanger />} />
        <Route path="/projects/mingo-airboat" element={<MingoAirboat />} />
        <Route path="/projects/nhai-vehicles" element={<NHAIVehicles />} />
        <Route path="/projects/automotive" element={<AutomotiveProjects />} />
        <Route path="/projects/defence" element={<DefenceProjects />} />
        <Route path="/projects/engineering" element={<GeneralEngineeringProjects />} />
      </Routes>

      {/* Footer — all pages */}
      <Footer />

      {/* AI chat bubble */}
      <AIChat />
    </div>
  );
}

export default App;
