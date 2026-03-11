import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronRight, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  className?: string;
}

// ── D&O project images for the marquee ────────────────────────────────────────
// User will drop real photos into these paths; placeholder.svg shown until then.
const MARQUEE_IMAGES = [
  '/images/indrajaal/hero.png',
  '/images/mingo/hero.png',
  '/images/nhai/hero.png',
  '/images/automotive/bmw-m2-bic.jpg',
  '/images/automotive/e30-s54.jpg',
  '/images/automotive/hd-titanium-exhaust.jpg',
  '/images/automotive/m4-ero-disc.jpg',
  '/images/media-pics/gallery-01.jpg',
  '/images/media-pics/gallery-02.jpg',
  '/images/media-pics/gallery-03.jpg',
  '/images/media-pics/gallery-04.jpg',
  '/images/media-pics/gallery-05.jpg',
  '/images/media-pics/gallery-06.jpg',
  '/images/media-pics/gallery-07.jpg',
  '/images/media-pics/gallery-08.jpg',
  '/images/media-pics/gallery-09.jpg',
  '/images/media-pics/gallery-10.jpg',
];

const FALLBACK = '/images/placeholder.svg';

export default function Hero({ className = '' }: HeroProps) {
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(eyebrowRef.current,  { y: -22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
      .fromTo(line1Ref.current,    { y: 80,  opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, '-=0.3')
      .fromTo(line2Ref.current,    { y: 80,  opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, '-=0.75')
      .fromTo(subtitleRef.current, { y: 26,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
      .fromTo(ctaRef.current,      { y: 20,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5');
    return () => { tl.kill(); };
  }, []);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  // Duplicate for seamless loop (50% shift = exactly one full set)
  const loopImages = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <section
      id="hero"
      className={`relative w-full h-[100dvh] overflow-hidden bg-[#0B0C0E]
        flex flex-col items-center justify-center text-center px-4 ${className}`}
    >
      {/* ── Inline scan keyframe ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes scan {
          0%   { transform: translateX(-200%); }
          100% { transform: translateX(500%);  }
        }
      `}</style>

      {/* ── Grid BG (top 600 px, radial-masked) ─────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 h-[600px] w-full
          bg-[linear-gradient(to_right,rgba(246,168,0,0.06)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(246,168,0,0.06)_1px,transparent_1px)]
          bg-[size:6rem_5rem]
          [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* ── Top scan shimmer ─────────────────────────────────────────────────── */}
      <div aria-hidden className="absolute top-0 left-0 w-full h-[2px] overflow-hidden pointer-events-none">
        <div
          className="h-full w-[30%] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent"
          style={{ animation: 'scan 5s ease-in-out infinite' }}
        />
      </div>

      {/* ── Edge rule ────────────────────────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      {/* ── Corner brackets ──────────────────────────────────────────────────── */}
      {/* <div aria-hidden className="absolute top-28 left-7  w-7 h-7 border-t border-l border-amber-500/25 pointer-events-none" />
      <div aria-hidden className="absolute top-28 right-7 w-7 h-7 border-t border-r border-amber-500/25 pointer-events-none" /> */}

      {/* ── HUD labels ───────────────────────────────────────────────────────── */}
      {/* <span aria-hidden className="absolute top-[7.5rem] left-[4.5rem] font-mono text-[9px] text-amber-500/30 tracking-widest select-none hidden sm:block">
        19.0760°N · 72.8777°E
      </span>
      <span aria-hidden className="absolute top-[7.5rem] right-[4.5rem] font-mono text-[9px] text-amber-500/30 tracking-widest select-none hidden sm:block">
        SYS.STATUS : ACTIVE
      </span> */}

      {/* ── Text content — shifted up to sit above the marquee ───────────────── */}
      <div
        className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto"
        style={{ transform: 'translateY(-8vh)' }}
      >

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="mb-5 sm:mb-6 px-2">
          <span
            className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2
              rounded-full border border-amber-500/25
              bg-gradient-to-tr from-white/5 via-amber-500/5 to-transparent
              backdrop-blur-sm font-mono text-[8px] sm:text-[10px] text-amber-400
              tracking-[0.12em] sm:tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shrink-0" />
            <span>India's Premier Advance Engineering Company</span>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500/55 shrink-0" />
          </span>
        </div>

        {/* Title — two lines, GSAP entrance */}
        <h1
          className="font-sora font-black leading-[0.88] tracking-tighter mb-5 sm:mb-6 px-2"
          style={{ fontSize: 'clamp(42px, 8vw, 116px)' }}
        >
          <span
            ref={line1Ref}
            className="block bg-gradient-to-b from-white from-30% to-white/40
              bg-clip-text text-transparent"
          >
            Built in India.
          </span>
          <span
            ref={line2Ref}
            className="block bg-gradient-to-br from-amber-400 from-30% to-amber-300/50
              bg-clip-text text-transparent"
            style={{ filter: 'drop-shadow(0 0 32px rgba(246,168,0,0.32))' }}
          >
            Engineered for Battle.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mb-8 sm:mb-10 max-w-xs sm:max-w-md md:max-w-xl
            text-sm sm:text-base md:text-lg lg:text-xl
            tracking-tight text-gray-400 px-2"
        >
          Advanced indigenous systems for defence, mobility, and strategic
          infrastructure.{' '}
          <span className="text-amber-400 font-medium">Proudly Made in India.</span>
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-3 sm:gap-4 justify-center px-2">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 44px rgba(246,168,0,0.45)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#capabilities')}
            className="group relative overflow-hidden bg-amber-500 hover:bg-amber-400
              px-6 sm:px-9 py-3 sm:py-4 text-xs sm:text-sm rounded-full font-bold tracking-wide text-black
              transition-colors duration-300 shadow-lg shadow-amber-500/20"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30
              to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Explore Capabilities
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              borderColor: 'rgba(246,168,0,0.5)',
              backgroundColor: 'rgba(246,168,0,0.07)',
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#projects')}
            className="px-6 sm:px-9 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-wide text-white
              border border-white/20 rounded-full transition-all duration-300 hover:text-amber-400"
          >
            View Projects
          </motion.button>
        </div>
      </div>

      {/* ── Animated image marquee (hero-3 pattern) ──────────────────────────── *
       *   Positioned absolute at the bottom third of the viewport.               *
       *   Masked top+bottom so images fade in/out gracefully.                    *
       *   Seamless loop: duplicate images + shift by exactly –50%.               *
       *   loading="lazy" + decoding="async" — don't block first paint.           */}
      <div
        className="absolute bottom-0 left-0 w-full h-[34%] sm:h-[36%] md:h-[40%]
          [mask-image:linear-gradient(to_bottom,transparent_0%,black_28%,black_72%,transparent_100%)]"
      >
        <motion.div
          className="flex gap-3 sm:gap-4 h-full w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 38, repeat: Infinity }}
        >
          {loopImages.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 h-full aspect-[3/4] sm:aspect-[4/3]"
              style={{ transform: `rotate(${i % 2 === 0 ? '-2deg' : '2deg'})` }}
            >
              <img
                src={src}
                alt="D&O project showcase"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-2xl
                  shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                  border border-amber-500/10"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK;
                }}
              />
              {/* Amber tint overlay for dark-theme cohesion */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0B0C0E]/50 to-transparent pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Hard bottom fade into next section ───────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0B0C0E 40%, transparent)' }}
      />
    </section>
  );
}
