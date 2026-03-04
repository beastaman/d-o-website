import { useRef, useLayoutEffect, Suspense, lazy } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const Spline = lazy(() => import('@splinetool/react-spline'));

gsap.registerPlugin(ScrollTrigger);

const SCENE_URL = 'https://prod.spline.design/uF9K753FT1x8k61Q/scene.splinecode';

interface HeroProps {
  className?: string;
}

export default function Hero({ className = '' }: HeroProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered entrance for text block below Spline
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: 'power3.out',
            scrollTrigger: { trigger: headlineRef.current, start: 'top 88%' },
          }
        );
      }

      gsap.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: subtitleRef.current, start: 'top 90%' },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 92%' },
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`relative w-full ${className}`}>

      {/* ── Spline scene — full viewport ───────────────────────────────────────
          pointer-events: none prevents the Spline canvas from capturing
          wheel events, which was causing scroll to feel stuck/slow.         */}
      <div
        className="relative w-full h-screen overflow-hidden"
        style={{ pointerEvents: 'none' }}
      >
        <Suspense
          fallback={
            <div className="w-full h-full bg-[#0B0C0E] flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
            </div>
          }
        >
          <Spline scene={SCENE_URL} style={{ width: '100%', height: '100%' }} />
        </Suspense>

        {/* Bottom gradient — blends Spline into the dark text section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/70 to-transparent pointer-events-none" />

        {/* Top gradient — softens under the navbar */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0B0C0E]/50 to-transparent pointer-events-none" />

        {/* Corner accents */}
        <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-amber-500/25 pointer-events-none" />
        <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-amber-500/25 pointer-events-none" />

        {/* Eyebrow badge — top-left */}
        <div className="absolute top-8 left-8 sm:left-12 lg:left-20 pointer-events-none">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-amber-400 uppercase">
              D&O Advanced Engineering
            </span>
          </span>
        </div>
      </div>

      {/* ── Text — flows naturally below the Spline scene ────────────────────── */}
      <div
        ref={textRef}
        className="relative bg-[#0B0C0E] px-8 sm:px-12 lg:px-20 xl:px-28 pt-14 pb-24"
      >
        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none" />

        {/* Thin amber rule connecting from Spline above */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(246,168,0,0.25), transparent)' }}
        />

        <div className="relative max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-20">

          {/* Left — headline */}
          <div ref={headlineRef} className="flex-1 min-w-0">
            <h1 className="font-sora font-black leading-[0.88] tracking-tight">
              <span
                className="word block text-white"
                style={{
                  fontSize: 'clamp(44px, 7.5vw, 112px)',
                  textShadow: '0 0 60px rgba(246,168,0,0.12)',
                }}
              >
                Built in India.
              </span>
              <span
                className="word block text-gradient"
                style={{
                  fontSize: 'clamp(44px, 7.5vw, 112px)',
                  textShadow: '0 0 80px rgba(246,168,0,0.22)',
                }}
              >
                Engineered for battle.
              </span>
            </h1>
          </div>

          {/* Right — subtitle + CTA */}
          <div className="flex flex-col gap-5 lg:max-w-xs xl:max-w-sm shrink-0 lg:pb-1">
            <p ref={subtitleRef} className="text-gray-400 text-base lg:text-lg leading-relaxed">
              Advanced indigenous systems for defence, mobility, and strategic infrastructure.{' '}
              <span className="text-amber-500 font-medium">Proudly Made in India.</span>
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(246,168,0,0.35)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#capabilities')}
                className="group relative overflow-hidden bg-amber-500 hover:bg-amber-400 px-7 py-3.5 text-sm rounded-full font-bold tracking-wide text-black transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2">
                  Explore Capabilities
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, borderColor: 'rgba(246,168,0,0.4)', backgroundColor: 'rgba(246,168,0,0.06)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#projects')}
                className="px-7 py-3.5 text-sm font-semibold tracking-wide text-white border border-white/20 rounded-full transition-all duration-300 hover:text-amber-400"
              >
                View Projects
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
