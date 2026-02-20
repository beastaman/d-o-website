import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Route, Shield, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PartnersProps {
  className?: string;
}

const partners = [
  {
    id: '01',
    title: 'Maharashtra Government',
    description: 'MINGO Airboat Project: Indigenous disaster management solution.',
    icon: Building2,
  },
  {
    id: '02',
    title: 'NHAI',
    description: 'Infrastructure Solutions: Specialized engineering for national highways.',
    icon: Route,
  },
  {
    id: '03',
    title: 'Indian Army',
    description: 'Defense Technology: Classified projects and advanced equipment.',
    icon: Shield,
  },
  {
    id: '04',
    title: 'Proven Track Record',
    description: 'Demonstrated ability to meet stringent requirements and security protocols.',
    icon: Award,
  },
];

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '100%', label: 'Indigenous' },
];

export default function Partners({ className = '' }: PartnersProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

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
        { scale: 1.08, x: '4vw' },
        { scale: 1, x: 0, ease: 'none' },
        0
      );

      // Left block from left
      scrollTl.fromTo(
        [labelRef.current, headlineRef.current, descRef.current],
        { x: '-16vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Vertical rule
      scrollTl.fromTo(
        ruleRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'power2.out' },
        0.1
      );

      // Partner items from right with stagger
      itemsRef.current.forEach((item, i) => {
        if (item) {
          scrollTl.fromTo(
            item,
            { x: '16vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power2.out' },
            0.12 + i * 0.045
          );
        }
      });

      // Stats
      scrollTl.fromTo(
        statsRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.25
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        [labelRef.current, headlineRef.current, descRef.current],
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      itemsRef.current.forEach((item) => {
        if (item) {
          scrollTl.fromTo(
            item,
            { x: 0, opacity: 1 },
            { x: '10vw', opacity: 0, ease: 'power2.in' },
            0.72
          );
        }
      });

      scrollTl.fromTo(
        [ruleRef.current, statsRef.current],
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
      id="partners"
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div className="bg-image absolute inset-0 z-0">
        <img
          src="/partners_infrastructure.jpg"
          alt="Government Partners"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/95 via-[#0B0C0E]/90 to-[#0B0C0E]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 lg:px-16 xl:px-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Headline */}
          <div className="max-w-xl">
            <span
              ref={labelRef}
              className="font-mono text-xs tracking-[0.2em] text-amber-500 uppercase mb-4 block"
            >
              Government Collaborations
            </span>
            <h2
              ref={headlineRef}
              className="font-sora font-bold text-[clamp(32px,4vw,56px)] text-white leading-[1.1] mb-4"
            >
              Trusted by Government.{' '}
              <span className="text-gradient">Built for the Nation.</span>
            </h2>
            <p ref={descRef} className="text-gray-400 text-lg">
              Successful delivery of complex projects for key government agencies 
              with demonstrated ability to meet stringent requirements and security protocols.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="flex gap-8 mt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-sora font-bold text-3xl text-amber-500">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Rule */}
          <div
            ref={ruleRef}
            className="hidden lg:block absolute left-[48%] top-[22vh] w-px h-[56vh] bg-gradient-to-b from-transparent via-amber-500/40 to-transparent origin-top"
          />

          {/* Right Column - Partner List */}
          <div className="space-y-4">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                ref={(el) => { itemsRef.current[index] = el; }}
                className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <partner.icon className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-xs text-amber-500/60">{partner.id}</span>
                    <h3 className="font-sora font-semibold text-lg text-white group-hover:text-amber-400 transition-colors">
                      {partner.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
