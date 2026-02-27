import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight, Shield, Cpu, Cog } from 'lucide-react';
import { GridBackground } from '@/components/ui/spotlight-new';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  className?: string;
}

const stats = [
  { label: 'Indigenous Projects', value: '20+' },
  { label: 'Govt. Collaborations', value: '3' },
  { label: 'Years of Expertise', value: '5+' },
];

const domains = [
  { icon: Shield, label: 'Defence' },
  { icon: Cpu, label: 'Automotive' },
  { icon: Cog, label: 'Manufacturing' },
];

export default function Hero({ className = '' }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background reveal
      gsap.set(imageRef.current, { scale: 1.18, y: 40 });
      tl.to(imageRef.current, { scale: 1, y: 0, duration: 2.2, ease: 'power2.out' }, 0);

      gsap.set(overlayRef.current, { opacity: 0.95 });
      tl.to(overlayRef.current, { opacity: 0.75, duration: 2 }, 0.2);

      // Decorative elements
      gsap.set(decorRef.current, { opacity: 0 });
      tl.to(decorRef.current, { opacity: 1, duration: 1 }, 0.4);

      // Tag badge
      gsap.set(taglineRef.current, { y: 24, opacity: 0 });
      tl.to(taglineRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.6);

      // Domain pills
      gsap.set(domainsRef.current?.querySelectorAll('.domain-pill') ?? [], { y: 16, opacity: 0 });
      tl.to(domainsRef.current?.querySelectorAll('.domain-pill') ?? [], {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.08,
      }, 0.7);

      // Headline words
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.set(words, { y: 80, opacity: 0, rotateX: -20 });
        tl.to(words, {
          y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1,
          ease: 'power3.out', force3D: true,
        }, 0.7);
      }

      // Subheadline
      gsap.set(subheadlineRef.current, { y: 30, opacity: 0 });
      tl.to(subheadlineRef.current, { y: 0, opacity: 1, duration: 0.8 }, 1.2);

      // CTA
      const buttons = ctaRef.current?.querySelectorAll('button, a');
      if (buttons) {
        gsap.set(buttons, { y: 20, opacity: 0 });
        tl.to(buttons, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, 1.4);
      }

      // Stats
      gsap.set(statsRef.current?.querySelectorAll('.stat-item') ?? [], { y: 20, opacity: 0 });
      tl.to(statsRef.current?.querySelectorAll('.stat-item') ?? [], {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.08,
      }, 1.6);

      // Scroll hint
      gsap.set(scrollHintRef.current, { opacity: 0 });
      tl.to(scrollHintRef.current, { opacity: 1, duration: 0.6 }, 1.9);

      const bounceIcon = scrollHintRef.current?.querySelector('.bounce-icon');
      if (bounceIcon) {
        gsap.to(bounceIcon, {
          y: 8, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll parallax
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: '-18%', scale: 1.1, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: section, start: 'top top', end: 'bottom top', scrub: true,
        },
      });

      gsap.to(
        [taglineRef.current, domainsRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current, statsRef.current, scrollHintRef.current],
        {
          y: -80, opacity: 0, ease: 'none', force3D: true, stagger: 0.015,
          scrollTrigger: {
            trigger: section, start: 'top top', end: '55% top', scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-0 will-change-transform">
        <img
          src="/hero-car.jpg"
          alt="D&O Engineering Excellence"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Layered dark overlay — richer gradient */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(180deg,
              rgba(11,12,14,0.85) 0%,
              rgba(11,12,14,0.45) 40%,
              rgba(11,12,14,0.55) 65%,
              rgba(11,12,14,0.97) 100%
            ),
            linear-gradient(90deg,
              rgba(11,12,14,0.7) 0%,
              transparent 60%
            )
          `
        }}
      />

      {/* Grid Background Pattern */}
      <div className="absolute inset-0 z-[2] opacity-20">
        <GridBackground />
      </div>

      {/* Amber radial glow — subtle center */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(246,168,0,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Decorative corner elements */}
      <div ref={decorRef} className="absolute inset-0 z-[4] pointer-events-none">
        {/* Top-left corner bracket */}
        <div className="absolute top-24 left-8 w-16 h-16 border-t border-l border-amber-500/20" />
        {/* Bottom-right corner bracket */}
        <div className="absolute bottom-24 right-8 w-16 h-16 border-b border-r border-amber-500/20" />
        {/* Horizontal scan line */}
        <div
          className="absolute left-0 right-0 h-[1px] top-[45%]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(246,168,0,0.08) 30%, rgba(246,168,0,0.15) 50%, rgba(246,168,0,0.08) 70%, transparent 100%)',
          }}
        />
        {/* Vertical accent line left */}
        <div className="absolute left-8 top-32 bottom-32 w-[1px] bg-gradient-to-b from-transparent via-amber-500/15 to-transparent hidden lg:block" />
      </div>

      {/* Main Content */}
      <div className="relative z-[5] h-full flex flex-col items-center justify-center px-6 text-center">

        {/* Domain pills */}
        <div ref={domainsRef} className="flex items-center gap-2 mb-6 will-change-transform">
          {domains.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="domain-pill inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
            >
              <Icon className="w-3 h-3 text-amber-500" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-gray-300 uppercase">{label}</span>
            </div>
          ))}
        </div>

        {/* Tagline badge */}
        <motion.div ref={taglineRef} className="mb-5 will-change-transform">
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-amber-500/10 backdrop-blur-sm border border-amber-500/25 rounded-full">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            <span className="font-mono text-xs tracking-[0.22em] text-amber-400 uppercase">
              Engineering the Future, Together
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <div ref={headlineRef} className="mb-7 will-change-transform perspective-1000">
          <h1 className="font-sora font-black tracking-tight leading-[1]">
            <span
              className="word block text-[clamp(44px,9vw,110px)] text-white"
              style={{ textShadow: '0 0 80px rgba(246,168,0,0.25), 0 2px 4px rgba(0,0,0,0.8)' }}
            >
              INDIGENOUS
            </span>
            <span
              className="word block text-[clamp(44px,9vw,110px)] text-gradient mt-0.5"
              style={{ textShadow: '0 0 60px rgba(246,168,0,0.3)' }}
            >
              ENGINEERING
            </span>
            <span
              className="word block text-[clamp(28px,4.5vw,54px)] text-white/70 mt-2 font-light tracking-[0.15em]"
            >
              EXCELLENCE
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-[clamp(14px,1.4vw,18px)] text-gray-300/90 max-w-xl mb-10 font-light tracking-wide leading-relaxed will-change-transform"
        >
          Advanced systems for defence, mobility, and strategic infrastructure.
          <br />
          <span className="text-amber-500 font-medium">Proudly Made in India. 🇮🇳</span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-12 will-change-transform">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(246,168,0,0.45)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#capabilities')}
            className="group relative overflow-hidden bg-amber-500 hover:bg-amber-400 px-9 py-4 text-base rounded-full font-bold tracking-wide text-black transition-all duration-300"
          >
            {/* Shine sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Capabilities
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, borderColor: 'rgba(246,168,0,0.5)', backgroundColor: 'rgba(246,168,0,0.08)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#projects')}
            className="group relative px-9 py-4 text-base font-semibold tracking-wide text-white border border-white/25 rounded-full transition-all duration-300 hover:text-amber-400 backdrop-blur-sm"
          >
            View Projects
          </motion.button>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="flex items-center gap-8 sm:gap-12 will-change-transform"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-item flex flex-col items-center">
              <span className="font-sora font-black text-2xl sm:text-3xl text-white" style={{ textShadow: '0 0 30px rgba(246,168,0,0.4)' }}>
                {stat.value}
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-gray-500 uppercase mt-0.5">{stat.label}</span>
              {i < stats.length - 1 && (
                <div className="absolute translate-x-[calc(100%+2rem)] sm:translate-x-[calc(100%+3rem)] top-1/2 -translate-y-1/2 w-[1px] h-6 bg-white/10 hidden sm:block" />
              )}
            </div>
          ))}
        </div>

        {/* Scroll Hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 will-change-transform"
        >
          <span className="text-[10px] text-gray-600 font-mono tracking-[0.3em] uppercase">Scroll to explore</span>
          <ChevronDown className="bounce-icon w-5 h-5 text-amber-500/70" />
        </div>
      </div>
    </section>
  );
}