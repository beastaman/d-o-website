import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Radio, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectProps {
  className?: string;
}

const features = [
  { icon: Shield, label: 'Multi-functional Design' },
  { icon: Radio, label: 'Advanced Jamming System' },
  { icon: Eye, label: 'Spoofing Technology' },
  { icon: Zap, label: 'Rapid Deployment' },
];

export default function FeaturedProject({ className = '' }: FeaturedProjectProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
      // Image from right
      scrollTl.fromTo(
        imageRef.current,
        { x: '20vw', opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0
      );

      // Label
      scrollTl.fromTo(
        labelRef.current,
        { y: '-6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      // Headline words from bottom
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        scrollTl.fromTo(
          words,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, ease: 'power2.out' },
          0.1
        );
      }

      // Badge
      scrollTl.fromTo(
        badgeRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.7)' },
        0.15
      );

      // Microcopy
      scrollTl.fromTo(
        microcopyRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.2
      );

      // Features
      scrollTl.fromTo(
        featuresRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.22
      );

      // CTA
      scrollTl.fromTo(
        ctaRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.25
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      if (words) {
        scrollTl.fromTo(
          words,
          { x: 0, opacity: 1 },
          { x: '-14vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        [labelRef.current, microcopyRef.current, ctaRef.current, featuresRef.current, badgeRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0 },
        { x: '10vw', opacity: 0.5, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#0B0C0E]">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left - Text Content */}
        <div className="flex flex-col justify-center px-6 lg:px-16 xl:px-24 py-20">
          {/* Label */}
          <span
            ref={labelRef}
            className="font-mono text-xs tracking-[0.2em] text-amber-500 uppercase mb-4"
          >
            Featured Project
          </span>

          {/* Headline */}
          <div ref={headlineRef} className="mb-4">
            <h2 className="font-sora font-bold tracking-tight leading-[0.95]">
              <span className="word block text-[clamp(36px,5vw,64px)] text-white">
                INDRAJAAL
              </span>
              <span className="word block text-[clamp(36px,5vw,64px)] text-gradient mt-1">
                RANGER
              </span>
            </h2>
          </div>

          {/* Badge */}
          <div ref={badgeRef} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-sm text-amber-400">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              India's 1st Indigenous Anti-Drone Vehicle
            </span>
          </div>

          {/* Microcopy */}
          <p
            ref={microcopyRef}
            className="text-gray-300 text-lg max-w-lg mb-6"
          >
            Helped create India's first indigenously developed anti-drone vehicle 
            for emergency response. Displayed at 61st BSF Parade 2025.
          </p>

          {/* Features */}
          <div ref={featuresRef} className="flex flex-wrap gap-3 mb-8">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300"
              >
                <feature.icon className="w-4 h-4 text-amber-500" />
                <span className="text-sm">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef}>
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(246,168,0,0.4)] group"
            >
              View Project Details
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Right - Image */}
        <div 
          ref={imageRef}
          className="relative hidden lg:flex items-center justify-center p-8"
        >
          <div className="relative w-full max-w-lg">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full" />
            
            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl">
              <img
                src="/indrajaal-project.png"
                alt="Indrajaal Ranger - India's First Indigenous Anti-Drone Vehicle"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/60 via-transparent to-transparent" />
            </div>
            
            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500/50" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
