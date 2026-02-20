import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Spotlight, GridBackground } from '@/components/ui/spotlight-new';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  className?: string;
}

export default function Hero({ className = '' }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set(imageRef.current, { scale: 1.15, y: 30 });
      tl.to(imageRef.current, { scale: 1, y: 0, duration: 2, ease: 'power2.out' }, 0);

      gsap.set(overlayRef.current, { opacity: 0.9 });
      tl.to(overlayRef.current, { opacity: 0.7, duration: 1.5 }, 0.3);

      gsap.set(taglineRef.current, { y: 20, opacity: 0 });
      tl.to(taglineRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.5);

      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.set(words, { y: 60, opacity: 0 });
        tl.to(words, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          force3D: true,
        }, 0.6);
      }

      gsap.set(subheadlineRef.current, { y: 30, opacity: 0 });
      tl.to(subheadlineRef.current, { y: 0, opacity: 1, duration: 0.8 }, 1.1);

      const buttons = ctaRef.current?.querySelectorAll('button');
      if (buttons) {
        gsap.set(buttons, { y: 20, opacity: 0 });
        tl.to(buttons, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, 1.3);
      }

      gsap.set(scrollHintRef.current, { opacity: 0 });
      tl.to(scrollHintRef.current, { opacity: 1, duration: 0.6 }, 1.7);

      const bounceIcon = scrollHintRef.current?.querySelector('.bounce-icon');
      if (bounceIcon) {
        gsap.to(bounceIcon, {
          y: 8,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven parallax & exit
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Simple parallax on scroll — no pin, just natural flow
      gsap.to(imageRef.current, {
        y: '-15%',
        scale: 1.08,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Fade out content as user scrolls away
      gsap.to(
        [taglineRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current, scrollHintRef.current],
        {
          y: -60,
          opacity: 0,
          ease: 'none',
          force3D: true,
          stagger: 0.02,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '60% top',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToCapabilities = () => {
    const element = document.querySelector('#capabilities');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src="/hero-car.jpg"
          alt="D&O Engineering Excellence"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0B0C0E]/80 via-[#0B0C0E]/50 to-[#0B0C0E]/95"
      />

      {/* Grid Background Pattern */}
      <div className="absolute inset-0 z-[2] opacity-30">
        <GridBackground />
      </div>

      {/* Spotlight Effect */}
      <div className="absolute inset-0 z-[3]">
        <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(43, 96%, 48%, .12) 0, hsla(43, 96%, 48%, .04) 50%, hsla(43, 96%, 48%, 0) 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(43, 96%, 48%, .08) 0, hsla(43, 96%, 48%, .03) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(43, 96%, 48%, .05) 0, hsla(43, 96%, 48%, .02) 80%, transparent 100%)"
          duration={8}
          xOffset={120}
        />
      </div>

      {/* Content */}
      <div className="relative z-[4] h-full flex flex-col items-center justify-center px-4">
        {/* Tagline */}
        <motion.div
          ref={taglineRef}
          className="mb-6 will-change-transform"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase">
              Engineering the Future, Together
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-6 will-change-transform">
          <h1 className="font-sora font-bold tracking-tight leading-[1.05]">
            <span className="word block text-[clamp(40px,8vw,100px)] text-white drop-shadow-2xl" style={{ textShadow: '0 0 60px rgba(246,168,0,0.3)' }}>
              INDIGENOUS
            </span>
            <span className="word block text-[clamp(40px,8vw,100px)] text-gradient mt-1">
              ENGINEERING
            </span>
            <span className="word block text-[clamp(32px,5vw,56px)] text-white/80 mt-3">
              EXCELLENCE
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-center text-[clamp(14px,1.5vw,20px)] text-gray-300 max-w-2xl mb-10 font-light tracking-wide will-change-transform"
        >
          Advanced systems for defence, mobility, and strategic infrastructure.
          <br />
          <span className="text-amber-500 font-medium">Proudly Made in India.</span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 will-change-transform">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(246,168,0,0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToCapabilities}
            className="group relative overflow-hidden bg-amber-500 hover:bg-amber-400 px-8 py-4 text-base rounded-full font-semibold tracking-wide text-black transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Capabilities
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, borderColor: 'rgba(246,168,0,0.5)', backgroundColor: 'rgba(246,168,0,0.1)' }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToProjects}
            className="group relative px-8 py-4 text-base font-medium tracking-wide text-white border border-white/30 rounded-full transition-all duration-300 hover:text-amber-400"
          >
            View Projects
          </motion.button>
        </div>

        {/* Scroll Hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 will-change-transform"
        >
          <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">Scroll to explore</span>
          <ChevronDown className="bounce-icon w-6 h-6 text-amber-500" />
        </div>
      </div>
    </section>
  );
}