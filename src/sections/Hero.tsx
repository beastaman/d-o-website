import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronRight, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  className?: string;
}

const STATS = [
  { value: '1000+', label: 'Vehicles Engineered' },
  { value: '800+',  label: 'Exhaust Systems'     },
  { value: '3',     label: 'Govt. Deployments'   },
];

export default function Hero({ className = '' }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const line2Ref     = useRef<HTMLSpanElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(eyebrowRef.current,
          { y: -22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(line1Ref.current,
          { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, '-=0.3')
        .fromTo(line2Ref.current,
          { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, '-=0.75')
        .fromTo(subtitleRef.current,
          { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo(ctaRef.current,
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo(statsRef.current,
          { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className={`relative mx-auto w-full pt-40 px-6 text-center md:px-8
        min-h-screen overflow-hidden bg-[#0B0C0E] ${className}`}
    >
      <style>{`
        @keyframes scan {
          0%   { transform: translateX(-200%); }
          100% { transform: translateX(500%);  }
        }
      `}</style>

      {/* ── Grid BG ── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 h-[600px] w-full
          bg-[linear-gradient(to_right,rgba(246,168,0,0.06)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(246,168,0,0.06)_1px,transparent_1px)]
          bg-[size:6rem_5rem]
          [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* ────────────────────────────────────────────────────────────────────────
          RADIAL HORIZON — THE CORRECT 21st.dev TECHNIQUE:

          • top: calc(100% - 90px) → the TOP EDGE of this div is 90px above
            the section's bottom. The rest hangs below, clipped by overflow-hidden.
          • width: 140vw, height: 700px → very wide flat ellipse
          • rounded-[100%] → ellipse shape
          • radial-gradient closest-side → gradient reaches the short axis (top/bottom)
            so the amber rim appears at the edges of the ellipse, not in the center.
          • Only the top 90px arc is actually visible.
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[100%]"
        style={{
          top: 'calc(100% - 100px)',          /* top edge sits 100px above section bottom */
          width: 'max(900px, 140vw)',          /* very wide — wider than viewport          */
          height: '700px',                     /* tall enough so arc shape is smooth       */
          background: [
            'radial-gradient(',
              'closest-side,',
              '#0B0C0E 72%,',                  /* dark centre matches page bg              */
              '#F6A800 84%,',                  /* solid amber rim — the visible arc line   */
              'rgba(246,168,0,0.18) 91%,',     /* soft outer glow                          */
              'transparent 100%',
            ')',
          ].join(''),
        }}
      />

      {/* ── Top scan shimmer ── */}
      <div aria-hidden className="absolute top-0 left-0 w-full h-[2px] overflow-hidden pointer-events-none">
        <div
          className="h-full w-[30%] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent"
          style={{ animation: 'scan 5s ease-in-out infinite' }}
        />
      </div>

      {/* ── Top edge rule ── */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      {/* ── Corner brackets (below navbar, subtle) ── */}
      <div aria-hidden className="absolute top-28 left-7  w-7 h-7 border-t border-l border-amber-500/25 pointer-events-none" />
      <div aria-hidden className="absolute top-28 right-7 w-7 h-7 border-t border-r border-amber-500/25 pointer-events-none" />
      <div aria-hidden className="absolute bottom-12 left-7  w-7 h-7 border-b border-l border-amber-500/25 pointer-events-none" />
      <div aria-hidden className="absolute bottom-12 right-7 w-7 h-7 border-b border-r border-amber-500/25 pointer-events-none" />

      {/* ── HUD labels ── */}
      <span aria-hidden className="absolute top-[7.5rem] left-[4.5rem] font-mono text-[9px] text-amber-500/30 tracking-widest select-none hidden sm:block">
        19.0760°N · 72.8777°E
      </span>
      <span aria-hidden className="absolute top-[7.5rem] right-[4.5rem] font-mono text-[9px] text-amber-500/30 tracking-widest select-none hidden sm:block">
        SYS.STATUS : ACTIVE
      </span>

      {/* ── Content ── */}
      <div ref={containerRef} className="relative z-10">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex justify-center mb-8">
          <a href="#" className="group">
            <span className="inline-flex items-center gap-2.5 px-5 py-2
              bg-gradient-to-tr from-white/5 via-amber-500/5 to-transparent
              border border-amber-500/25 rounded-full
              font-mono text-[10px] text-amber-400 tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              D&O Advanced Engineering
              <ChevronRight className="inline w-3.5 h-3.5 text-amber-500/55 ml-0.5
                transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </div>

        {/* Title */}
        <h1
          className="font-sora font-black leading-[0.9] tracking-tighter py-4"
          style={{ fontSize: 'clamp(50px, 8.5vw, 120px)' }}
        >
          <span
            ref={line1Ref}
            className="block bg-gradient-to-b from-white from-30% to-white/40 bg-clip-text text-transparent"
          >
            Built in India.
          </span>
          <span
            ref={line2Ref}
            className="block bg-gradient-to-br from-amber-400 from-30% to-amber-300/50 bg-clip-text text-transparent"
            style={{ filter: 'drop-shadow(0 0 32px rgba(246,168,0,0.30))' }}
          >
            Engineered for Battle.
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="mb-12 text-lg md:text-xl tracking-tight text-gray-400 max-w-2xl mx-auto">
          Advanced indigenous systems for defence, mobility, and strategic
          infrastructure.{' '}
          <span className="text-amber-400 font-medium">Proudly Made in India.</span>
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center relative z-20">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 44px rgba(246,168,0,0.45)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#capabilities')}
            className="group relative overflow-hidden bg-amber-500 hover:bg-amber-400
              px-9 py-4 text-sm rounded-full font-bold tracking-wide text-black
              transition-colors duration-300 shadow-lg shadow-amber-500/20"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
              -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Explore Capabilities
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, borderColor: 'rgba(246,168,0,0.5)', backgroundColor: 'rgba(246,168,0,0.07)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#projects')}
            className="px-9 py-4 text-sm font-semibold tracking-wide text-white
              border border-white/20 rounded-full transition-all duration-300 hover:text-amber-400"
          >
            View Projects
          </motion.button>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-20 pb-20 mb-4">
          <div className="w-72 mx-auto h-px mb-10"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(246,168,0,0.35),transparent)' }} />
          <div className="flex flex-wrap gap-x-12 gap-y-5 justify-center">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="relative flex flex-col items-center gap-1.5">
                {i > 0 && (
                  <span className="absolute -left-6 top-1/2 -translate-y-1/2 h-6 w-px bg-amber-500/20 hidden sm:block" />
                )}
                <span className="font-sora font-black text-[2rem] text-white leading-none"
                  style={{ textShadow: '0 0 24px rgba(246,168,0,0.3)' }}>
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] text-gray-500 tracking-[0.2em] uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}