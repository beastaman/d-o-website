import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Cog, ClipboardCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface CapabilitiesProps {
  className?: string;
}

const capabilities = [
  {
    id: '01',
    title: 'Design & Simulation',
    description: 'CAD/CAE platforms, multi-physics modeling, CFD analysis, FEA & structural analysis for optimized designs before prototyping.',
    icon: Cpu,
  },
  {
    id: '02',
    title: 'Precision Manufacturing',
    description: 'CNC machining, composites fabrication, polymers processing, and strict process control for repeatability.',
    icon: Cog,
  },
  {
    id: '03',
    title: 'Testing & Validation',
    description: 'Real-world trials, advanced metrology, performance validation, and certification support.',
    icon: ClipboardCheck,
  },
];

export default function Capabilities({ className = '' }: CapabilitiesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Background parallax
      gsap.fromTo(
        section.querySelector('.bg-image'),
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Label entrance
      gsap.fromTo(labelRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Headline entrance
      gsap.fromTo(headlineRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description entrance
      gsap.fromTo(descRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8,
          delay: 0.1,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Vertical rule
      gsap.fromTo(ruleRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger entrance
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { x: 80, opacity: 0 },
            {
              x: 0, opacity: 1,
              duration: 0.8,
              delay: i * 0.12,
              ease: 'power2.out',
              force3D: true,
              scrollTrigger: {
                trigger: section,
                start: 'top 65%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Button entrance
      gsap.fromTo(btnRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          delay: 0.5,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className={`relative w-full min-h-screen flex items-center overflow-hidden py-20 ${className}`}
    >
      {/* Background Image */}
      <div className="bg-image absolute inset-0 z-0 will-change-transform">
        <img
          src="/capabilities_workshop.jpg"
          alt="Engineering Capabilities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/95 via-[#0B0C0E]/85 to-[#0B0C0E]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="max-w-xl">
            <span
              ref={labelRef}
              className="font-mono text-xs tracking-[0.2em] text-amber-500 uppercase mb-4 block will-change-transform"
            >
              Capabilities
            </span>
            <h2
              ref={headlineRef}
              className="font-sora font-bold text-[clamp(32px,4vw,56px)] text-white leading-[1.1] mb-4 will-change-transform"
            >
              What We <span className="text-gradient">Deliver</span>
            </h2>
            <p ref={descRef} className="text-gray-400 text-lg leading-relaxed will-change-transform">
              End-to-end product development from concept to deployment.
              Reverse engineering, multi-dynamic simulations, structural analysis,
              and integrated testing & validation.
            </p>
          </div>

          {/* Vertical Rule */}
          <div
            ref={ruleRef}
            className="hidden lg:block absolute left-[48%] top-[15%] w-px h-[70%] bg-gradient-to-b from-transparent via-amber-500/40 to-transparent origin-top"
          />

          {/* Right Column - Cards */}
          <div className="space-y-5">
            {capabilities.map((cap, index) => (
              <div
                key={cap.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 will-change-transform"
              >
                <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <cap.icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-amber-500/60">{cap.id}</span>
                      <h3 className="font-sora font-semibold text-lg text-white group-hover:text-amber-400 transition-colors">
                        {cap.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <Button
              ref={btnRef}
              variant="outline"
              className="mt-4 border-amber-500/50 text-amber-500 hover:bg-amber-500/10 rounded-full group will-change-transform"
            >
              View All Capabilities
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}