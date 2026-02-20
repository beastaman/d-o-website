import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Shield, Cog, Zap, Layers, type LucideIcon } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

interface FeaturesProps {
  className?: string;
}

const features = [
  {
    id: '01',
    title: 'Automotive & Mobility',
    description: 'High-performance vehicle development with custom architecture, advanced drivetrain solutions, and motorsport-derived engineering methodologies.',
    icon: Cpu,
    area: 'md:[grid-area:1/1/2/5] xl:[grid-area:1/1/2/5]',
  },
  {
    id: '02',
    title: 'Defence & Strategic',
    description: 'Indigenous defence mobility platforms, anti-drone systems, surveillance technologies, and rapid-response disaster management vehicles.',
    icon: Shield,
    area: 'md:[grid-area:1/5/2/9] xl:[grid-area:1/5/2/9]',
  },
  {
    id: '03',
    title: 'Advanced Manufacturing',
    description: 'Reverse engineering, precision fabrication, rapid prototyping with multi-material manufacturing including metals, composites, and polymers.',
    icon: Cog,
    area: 'md:[grid-area:1/9/2/13] xl:[grid-area:1/9/2/13]',
  },
  {
    id: '04',
    title: 'Design & Simulation',
    description: 'CAD/CAE platforms, multi-physics modeling, CFD analysis, FEA & structural analysis for optimized designs before prototyping.',
    icon: Zap,
    area: 'md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/7]',
  },
  {
    id: '05',
    title: 'Cutting-Edge Materials',
    description: 'PEEK, ULTEM, advanced composites, and custom formulations for superior performance and durability in demanding environments.',
    icon: Layers,
    area: 'md:[grid-area:2/7/3/13] xl:[grid-area:2/7/3/13]',
  },
];

export default function Features({ className = '' }: FeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation with reveal
      gsap.fromTo(
        headlineRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );

      // Grid items animation with stagger
      const items = gridRef.current?.querySelectorAll('.feature-card');
      if (items) {
        gsap.fromTo(
          items,
          { y: 100, opacity: 0, rotateX: -15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className={`relative w-full py-24 lg:py-32 bg-[#0B0C0E] ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs tracking-[0.2em] text-amber-500 uppercase mb-4 block"
          >
            Core Capabilities
          </motion.span>
          <h2 className="font-sora font-bold text-[clamp(32px,5vw,56px)] text-white leading-[1.1]">
            End-to-End Engineering,{' '}
            <span className="text-gradient">Built for Extremes</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            From concept to deployment, we deliver robust, scalable, and field-ready engineering systems.
          </p>
        </div>

        {/* Features Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 perspective-1000"
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    area: string;
  };
}

function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;
  
  return (
    <div className={cn("feature-card min-h-[14rem] list-none", feature.area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3 group hover:border-amber-500/40 transition-all duration-500">
        <GlowingEffect
          spread={50}
          glow={true}
          disabled={false}
          proximity={80}
          inactiveZone={0.01}
          borderWidth={2}
          variant="amber"
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/5 bg-[#12131A]/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:bg-[#12131A]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-fit rounded-xl border-[0.75px] border-amber-500/30 bg-amber-500/10 p-3"
              >
                <Icon className="h-6 w-6 text-amber-500" />
              </motion.div>
              <span className="font-mono text-xs text-amber-500/60">{feature.id}</span>
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sora tracking-[-0.02em] md:text-2xl md:leading-[1.875rem] text-balance text-white group-hover:text-amber-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm leading-[1.6rem] text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
