import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, FileCheck, Microscope, ClipboardList } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface QualityProps {
  className?: string;
}

const qualitySteps = [
  {
    id: '01',
    title: 'Material Testing',
    description: 'Strict verification of all raw materials and composites.',
    icon: Microscope,
  },
  {
    id: '02',
    title: 'Precision Inspection',
    description: 'Advanced metrology for dimensional accuracy.',
    icon: CheckCircle,
  },
  {
    id: '03',
    title: 'Performance Validation',
    description: 'Real-world functional testing under stress conditions.',
    icon: ClipboardList,
  },
  {
    id: '04',
    title: 'Certification Compliance',
    description: 'Adherence to international industry standards.',
    icon: FileCheck,
  },
];

export default function Quality({ className = '' }: QualityProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Background parallax
      gsap.fromTo(
        section.querySelector('.bg-image'),
        { scale: 1.08 },
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

      // Label
      gsap.fromTo(labelRef.current,
        { x: -50, opacity: 0 },
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

      // Headline
      gsap.fromTo(headlineRef.current,
        { x: -70, opacity: 0 },
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

      // Paragraph from right
      gsap.fromTo(paragraphRef.current,
        { x: 70, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Horizontal rule
      gsap.fromTo(ruleRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Quality cards stagger from bottom
      itemsRef.current.forEach((item, i) => {
        if (item) {
          gsap.fromTo(item,
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 0.7,
              delay: i * 0.1,
              ease: 'power2.out',
              force3D: true,
              scrollTrigger: {
                trigger: section,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quality"
      className={`relative w-full min-h-screen flex flex-col justify-center overflow-hidden py-20 ${className}`}
    >
      {/* Background Image */}
      <div className="bg-image absolute inset-0 z-0 will-change-transform">
        <img
          src="/quality_testing.jpg"
          alt="Quality Assurance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/90 via-[#0B0C0E]/80 to-[#0B0C0E]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 lg:px-16 xl:px-24">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Left - Headline */}
          <div>
            <span
              ref={labelRef}
              className="font-mono text-xs tracking-[0.2em] text-amber-500 uppercase mb-4 block will-change-transform"
            >
              Quality Assurance
            </span>
            <h2
              ref={headlineRef}
              className="font-sora font-bold text-[clamp(36px,5vw,72px)] text-white leading-[1.05] will-change-transform"
            >
              Rigorous{' '}
              <span className="text-gradient">Standards.</span>
            </h2>
          </div>

          {/* Right - Paragraph */}
          <div className="flex items-end">
            <p
              ref={paragraphRef}
              className="text-gray-300 text-lg leading-relaxed max-w-lg will-change-transform"
            >
              A comprehensive quality control framework ensuring reliability and performance.
              Upholding the highest standards of engineering integrity and safety in every project.
            </p>
          </div>
        </div>

        {/* Horizontal Rule */}
        <div
          ref={ruleRef}
          className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mb-10 origin-left"
        />

        {/* Bottom Row - Quality Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {qualitySteps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 will-change-transform"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <step.icon className="w-5 h-5 text-amber-500" />
                </div>
                <span className="font-mono text-xs text-amber-500/60">{step.id}</span>
              </div>
              <h3 className="font-sora font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}