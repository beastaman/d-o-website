import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Wrench, Cpu, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface InnovationProps {
  className?: string;
}

const innovations = [
  { icon: Lightbulb, label: 'Materials Innovation' },
  { icon: Wrench, label: 'Design & Engineering' },
  { icon: Cpu, label: 'Process Innovation' },
  { icon: Rocket, label: 'Technology Integration' },
];

const values = [
  { title: 'Precision', desc: 'Zero tolerance for error in critical systems' },
  { title: 'Innovation', desc: 'Continuous improvement through R&D' },
  { title: 'Integrity', desc: 'Transparent operations and ethical practices' },
  { title: 'Safety', desc: 'Prioritizing user safety in all designs' },
];

export default function Innovation({ className = '' }: InnovationProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const innovationsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

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

      // Innovations
      scrollTl.fromTo(
        innovationsRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.22
      );

      // Values
      scrollTl.fromTo(
        valuesRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.25
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
        [labelRef.current, subheadlineRef.current, innovationsRef.current, valuesRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        section.querySelector('.bg-image'),
        { scale: 1 },
        { scale: 1.04, ease: 'power2.in' },
        0.7
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
          src="/rnd_lab.jpg"
          alt="Continuous Innovation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/85 via-[#0B0C0E]/70 to-[#0B0C0E]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Label */}
        <span
          ref={labelRef}
          className="font-mono text-xs tracking-[0.2em] text-amber-500 uppercase mb-6"
        >
          R&D
        </span>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-sora font-bold text-[clamp(40px,6vw,80px)] text-white text-center leading-[1.05] mb-4 text-shadow-glow"
        >
          Continuous{' '}
          <span className="text-gradient">Innovation</span>
        </h2>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-center text-gray-300 text-lg max-w-2xl mb-8"
        >
          Investing in advanced research and development to maintain technological leadership. 
          Materials, design, and process research—built into every program.
        </p>

        {/* Innovation Areas */}
        <div ref={innovationsRef} className="flex flex-wrap justify-center gap-4 mb-12">
          {innovations.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:border-amber-500/30 hover:text-amber-400 transition-colors"
            >
              <item.icon className="w-4 h-4 text-amber-500" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div ref={valuesRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
          {values.map((value) => (
            <div
              key={value.title}
              className="text-center p-4"
            >
              <h4 className="font-sora font-semibold text-amber-500 mb-1">{value.title}</h4>
              <p className="text-gray-400 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
