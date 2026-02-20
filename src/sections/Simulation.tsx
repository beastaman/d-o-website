import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SimulationProps {
  className?: string;
}

export default function Simulation({ className = '' }: SimulationProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Background
      scrollTl.fromTo(
        section.querySelector('.bg-image'),
        { scale: 1.06, opacity: 0.7 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Label
      scrollTl.fromTo(
        labelRef.current,
        { y: '-6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Headline from bottom
      scrollTl.fromTo(
        headlineRef.current,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // Subheadline
      scrollTl.fromTo(
        subheadlineRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.2
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, subheadlineRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div className="bg-image absolute inset-0 z-0">
        <img
          src="/simulation_cfd.jpg"
          alt="Computational Analysis"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/80 via-[#0B0C0E]/60 to-[#0B0C0E]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Label */}
        <span
          ref={labelRef}
          className="font-mono text-xs tracking-[0.2em] text-amber-500 uppercase mb-6"
        >
          Simulation
        </span>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-sora font-bold text-[clamp(40px,6vw,80px)] text-white text-center leading-[1.05] mb-6 text-shadow-glow"
        >
          Computational{' '}
          <span className="text-gradient">Analysis</span>
        </h2>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-center text-gray-300 text-lg max-w-2xl"
        >
          CFD, FEA, and multi-physics modeling—optimized before prototyping.
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {['CFD Analysis', 'FEA & Structural', 'Multi-Physics', 'Design Optimization'].map(
            (tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:border-amber-500/30 hover:text-amber-400 transition-colors cursor-default"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
