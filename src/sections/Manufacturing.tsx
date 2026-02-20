import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Settings, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ManufacturingProps {
  className?: string;
}

const features = [
  {
    title: 'Cutting-Edge Materials',
    description: 'PEEK, ULTEM, composites, and custom formulations for superior performance.',
    icon: Layers,
  },
  {
    title: 'Production Optimization',
    description: 'Lean workflows, in-house QA, and tight tolerances for maximum efficiency.',
    icon: Settings,
  },
];

const capabilities = [
  'Advanced Manufacturing Equipment',
  'Rigorous Quality Assurance',
  'Lean Process Implementation',
  'Complete In-House Capabilities',
];

export default function Manufacturing({ className = '' }: ManufacturingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const capsRef = useRef<HTMLDivElement>(null);

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

      // Label + Headline from left
      scrollTl.fromTo(
        [labelRef.current, headlineRef.current],
        { x: '-14vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Paragraph from right
      scrollTl.fromTo(
        paragraphRef.current,
        { x: '14vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      // Horizontal rule
      scrollTl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'power2.out' },
        0.14
      );

      // Features from bottom
      featuresRef.current.forEach((feature, i) => {
        if (feature) {
          scrollTl.fromTo(
            feature,
            { y: '16vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'power2.out' },
            0.18 + i * 0.04
          );
        }
      });

      // Capabilities
      scrollTl.fromTo(
        capsRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.22
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        [labelRef.current, headlineRef.current, paragraphRef.current],
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      featuresRef.current.forEach((feature) => {
        if (feature) {
          scrollTl.fromTo(
            feature,
            { y: 0, opacity: 1 },
            { y: '10vh', opacity: 0, ease: 'power2.in' },
            0.72
          );
        }
      });

      scrollTl.fromTo(
        [ruleRef.current, capsRef.current],
        { opacity: 1 },
        { opacity: 0.2, ease: 'power2.in' },
        0.75
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
          src="/manufacturing_cnc.jpg"
          alt="Precision Manufacturing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/90 via-[#0B0C0E]/80 to-[#0B0C0E]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 xl:px-24">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Left - Headline */}
          <div>
            <span
              ref={labelRef}
              className="font-mono text-xs tracking-[0.2em] text-amber-500 uppercase mb-4 block"
            >
              Manufacturing
            </span>
            <h2
              ref={headlineRef}
              className="font-sora font-bold text-[clamp(36px,5vw,72px)] text-white leading-[1.05]"
            >
              Precision at{' '}
              <span className="text-gradient">Scale.</span>
            </h2>
          </div>

          {/* Right - Paragraph */}
          <div className="flex items-end">
            <p
              ref={paragraphRef}
              className="text-gray-300 text-lg leading-relaxed max-w-lg"
            >
              From advanced polymers to multi-material assemblies—engineered with
              repeatability and built to perform in the most demanding environments.
              Implementing lean manufacturing principles for maximum efficiency.
            </p>
          </div>
        </div>

        {/* Horizontal Rule */}
        <div
          ref={ruleRef}
          className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mb-10 origin-left"
        />

        {/* Bottom Row - Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => { featuresRef.current[index] = el; }}
              className="group relative"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-sora font-semibold text-xl text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Capabilities List */}
        <div ref={capsRef} className="flex flex-wrap gap-3">
          {capabilities.map((cap) => (
            <div
              key={cap}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
            >
              <CheckCircle className="w-4 h-4 text-amber-500" />
              {cap}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
