import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import {
  Sparkles,
  Wrench,
  FileSpreadsheet,
  Lock,
  ArrowRight,
  ShieldCheck,
  Mail,
  CheckCircle2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    icon: Wrench,
    title: 'Custom Scope',
    desc: 'Share your project requirements via our contact channels — vehicle, build type, materials, performance goals, and timeline.',
  },
  {
    num: '02',
    icon: FileSpreadsheet,
    title: 'Personalized Quote',
    desc: 'Our team analyzes your brief and provides a tailored commercial quote covering scope, materials, tuning, and delivery.',
  },
  {
    num: '03',
    icon: Lock,
    title: 'Secure Payment',
    desc: 'On mutual agreement, a custom secure invoice & payment link is issued to your email to process your transaction safely.',
  },
];

const reasons = [
  'Every build scoped uniquely — no two projects are identical',
  'Materials, tuning, and labour vary per requirement',
  'Transparent line-item commercials — no hidden fees',
  'Pay only after written quote acceptance',
];

interface PricingProps {
  className?: string;
}

export default function Pricing({ className = '' }: PricingProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.pricing-reveal').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className={`relative w-full bg-[#0B0C0E] py-16 sm:py-20 lg:py-28 overflow-hidden ${className}`}
    >
      {/* Background grid + radial glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.18] pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(246,168,0,0.08) 0%, transparent 70%)',
        }}
      />
      {/* Top/bottom edge rules */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="pricing-reveal max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] text-amber-500 uppercase mb-5">
            <span className="w-8 h-px bg-amber-500" />
            <Sparkles className="w-3 h-3" />
            Pricing Model
            <span className="w-8 h-px bg-amber-500" />
          </span>
          <h2 className="font-sora font-bold text-white leading-[1.05] text-[clamp(30px,5vw,52px)] mb-5">
            Built around your project,
            <br className="hidden sm:block" />
            <span className="text-gradient"> not a price sheet.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            At D&O Motorsports, we specialize in <span className="text-amber-300/90 font-medium">custom automotive and motorsport solutions</span> built explicitly around client requirements. Because every project requires a unique scope of work, materials, and tuning, we do not offer fixed off-the-shelf pricing.
          </p>
        </div>

        {/* ── Step Bento (3 cards) ───────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-16">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="pricing-reveal relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm p-6 sm:p-7 hover:border-amber-500/30 transition-colors group overflow-hidden"
              >
                {/* Step number ghost */}
                <div className="absolute top-3 right-4 font-sora font-black text-[64px] sm:text-[72px] leading-none text-white/[0.03] group-hover:text-amber-500/[0.08] transition-colors select-none">
                  {s.num}
                </div>

                {/* Amber corner accent */}
                <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
                  <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-amber-500/40 to-transparent" />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center group-hover:bg-amber-500/15 transition-colors">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.22em] text-amber-500/70 uppercase">
                      Step {s.num}
                    </span>
                  </div>
                  <h3 className="font-sora font-bold text-white text-lg sm:text-xl mb-2.5">
                    {s.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Why this model (reasons + assurance) ───────────────────── */}
        <div className="pricing-reveal grid lg:grid-cols-[1.2fr_1fr] gap-5 lg:gap-6 mb-12 sm:mb-16">
          {/* Left: reasons list */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-amber-500/70 uppercase mb-4">
              <ShieldCheck className="w-3 h-3" />
              Why a Custom Quote
            </div>
            <h3 className="font-sora font-bold text-white text-xl sm:text-2xl mb-5">
              Honest, scoped, and transparent.
            </h3>
            <ul className="space-y-2.5">
              {reasons.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2.5 text-gray-300 text-[14.5px] leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: payment trust card */}
          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.07] to-amber-500/[0.01] p-6 sm:p-8 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-amber-500/80 uppercase mb-4">
                <Lock className="w-3 h-3" />
                Payment Processing
              </div>
              <h3 className="font-sora font-bold text-white text-xl sm:text-2xl mb-3">
                Secure invoice. Sent to your inbox.
              </h3>
              <p className="text-gray-300 text-[14.5px] leading-relaxed">
                Upon mutual agreement of the quote, a custom secure invoice & payment link will be issued to your email to process your transaction.
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300 text-[11px] font-mono tracking-wide">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                Secure
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300 text-[11px] font-mono tracking-wide">
                <Mail className="w-3 h-3 text-amber-400" />
                Email Delivery
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300 text-[11px] font-mono tracking-wide">
                <FileSpreadsheet className="w-3 h-3 text-amber-400" />
                Itemized Quote
              </span>
            </div>
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <div className="pricing-reveal text-center">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(246,168,0,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm sm:text-base transition-colors shadow-lg shadow-amber-500/20"
          >
            Request Your Custom Quote
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <p className="mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-gray-600 uppercase">
            Typical response within 2 business days
          </p>
        </div>
      </div>
    </section>
  );
}
