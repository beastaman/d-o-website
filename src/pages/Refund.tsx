import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  XCircle,
  Building2,
  Plane,
  CreditCard,
  Timer,
  ArrowLeftRight,
  HeartPulse,
  Mail,
  RefreshCw,
  ChevronLeft,
  ArrowRight,
  Calendar,
  Phone as PhoneIcon,
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Ban,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── Section content (verbatim) ───────────────────────────────────────────────
const sections = [
  {
    id: 'introduction',
    num: '01',
    icon: FileText,
    title: 'Introduction',
    body: [
      'This Cancellation & Refund Policy governs all payments made to D&O Motorsports for courses, workshops, bootcamps, internships, events, training programs, consulting services, merchandise, and other services.',
    ],
  },
  {
    id: 'participant-cancellation',
    num: '02',
    icon: Clock,
    title: 'Registration Cancellation by Participant',
    custom: 'tiers',
  },
  {
    id: 'non-attendance',
    num: '03',
    icon: XCircle,
    title: 'Non-Attendance',
    body: [
      'Failure to attend any course, workshop, event, internship, or training program does not qualify for a refund.',
    ],
  },
  {
    id: 'company-cancellation',
    num: '04',
    icon: Building2,
    title: 'Cancellation by D&O Motorsports',
    body: [
      'D&O Motorsports reserves the right to postpone, reschedule, modify, or cancel any program due to insufficient registrations, instructor unavailability, venue issues, safety concerns, regulatory requirements, force majeure events, or circumstances beyond reasonable control.',
    ],
    bullets: [
      'Rescheduling to a future batch',
      'Credit toward another program',
      'A refund at the sole discretion of D&O Motorsports',
    ],
    bulletsHeading: 'Participants may be offered:',
  },
  {
    id: 'international-programs',
    num: '05',
    icon: Plane,
    title: 'International Programs and Internships',
    body: [
      'Application fees, visa expenses, travel costs, accommodation costs, insurance charges, and third-party expenses are generally non-refundable.',
      'Visa refusals or immigration decisions do not automatically entitle participants to a refund.',
    ],
  },
  {
    id: 'gateway-charges',
    num: '06',
    icon: CreditCard,
    title: 'Payment Gateway Charges',
    body: [
      'Payment gateway fees, banking charges, foreign exchange charges, and transaction processing fees may be deducted from approved refunds.',
    ],
  },
  {
    id: 'refund-timeline',
    num: '07',
    icon: Timer,
    title: 'Refund Processing Timeline',
    body: ['Approved refunds are normally processed within 7 to 15 business days from approval.'],
  },
  {
    id: 'transfer-registration',
    num: '08',
    icon: ArrowLeftRight,
    title: 'Transfer of Registration',
    body: [
      'D&O Motorsports may, at its sole discretion, allow transfer of registration to another batch, course, or participant.',
    ],
  },
  {
    id: 'exceptional-circumstances',
    num: '09',
    icon: HeartPulse,
    title: 'Exceptional Circumstances',
    body: [
      'Medical emergencies and exceptional cases may be considered individually at the sole discretion of D&O Motorsports.',
    ],
  },
  {
    id: 'contact-refund',
    num: '10',
    icon: Mail,
    title: 'Contact for Refund Requests',
    custom: 'contact',
  },
  {
    id: 'policy-changes',
    num: '11',
    icon: RefreshCw,
    title: 'Policy Changes',
    body: [
      'D&O Motorsports reserves the right to modify this Cancellation & Refund Policy at any time.',
    ],
  },
];

// ── Refund tier data ──
const refundTiers = [
  {
    range: 'More than 30 days before',
    amount: 'Up to 75%',
    icon: CheckCircle2,
    accent: 'emerald',
    items: ['Eligible for a refund of up to 75% of the amount paid.', 'Administrative and processing fees may be deducted.'],
  },
  {
    range: '15 to 30 days before',
    amount: 'Up to 50%',
    icon: AlertCircle,
    accent: 'amber',
    items: ['Eligible for a refund of up to 50% of the amount paid.'],
  },
  {
    range: 'Less than 15 days before',
    amount: 'No refund',
    icon: Ban,
    accent: 'red',
    items: ['No refund shall be provided.'],
  },
  {
    range: 'After program commencement',
    amount: 'No refund',
    icon: Ban,
    accent: 'red',
    items: [
      'No refund shall be provided once the course, workshop, internship, event, or service has commenced.',
    ],
  },
];

const accentMap: Record<string, { border: string; bg: string; icon: string; tag: string; tagBg: string }> = {
  emerald: {
    border: 'border-emerald-500/25',
    bg: 'bg-emerald-500/[0.04]',
    icon: 'text-emerald-400',
    tag: 'text-emerald-300',
    tagBg: 'bg-emerald-500/15 border-emerald-500/25',
  },
  amber: {
    border: 'border-amber-500/25',
    bg: 'bg-amber-500/[0.04]',
    icon: 'text-amber-400',
    tag: 'text-amber-300',
    tagBg: 'bg-amber-500/15 border-amber-500/25',
  },
  red: {
    border: 'border-red-500/20',
    bg: 'bg-red-500/[0.03]',
    icon: 'text-red-400',
    tag: 'text-red-300',
    tagBg: 'bg-red-500/15 border-red-500/25',
  },
};

export default function Refund() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>(sections[0].id);

  useLayoutEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.reveal-card').forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.5, 0.9] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0B0C0E] pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-400 text-sm font-mono tracking-wide transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(246,168,0,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase mb-5">
              <span className="w-8 h-px bg-amber-500" />
              <RefreshCw className="w-3 h-3" />
              Refund Policy
            </span>
            <h1 className="font-sora font-bold text-[clamp(34px,6vw,72px)] text-white leading-[1.05] mb-5">
              Cancellation & <span className="text-gradient">Refund</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-7">
              How cancellations, refunds, and registration transfers work across all D&O
              Motorsports programs, events, and services.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono tracking-wide">
                <Calendar className="w-3.5 h-3.5" />
                Effective Date: 24 March 2026
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 text-xs font-mono tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5" />
                11 Sections
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-20 sm:pb-28">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-4 lg:p-5">
              <div className="font-mono text-[10px] tracking-[0.22em] text-amber-500/70 uppercase mb-3">
                Table of Contents
              </div>
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-1 px-1 lg:mx-0 lg:px-0">
                {sections.map((s) => {
                  const active = activeId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className={`flex-shrink-0 lg:flex-shrink lg:w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] transition-all whitespace-nowrap lg:whitespace-normal ${
                        active
                          ? 'bg-amber-500/[0.10] text-amber-300 border border-amber-500/25'
                          : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.03] border border-transparent'
                      }`}
                    >
                      <span className={`font-mono text-[10px] tracking-wide ${active ? 'text-amber-400' : 'text-gray-700'}`}>
                        {s.num}
                      </span>
                      <span className="leading-snug">{s.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="space-y-5 lg:space-y-7 min-w-0">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.id}
                  id={s.id}
                  className="reveal-card scroll-mt-28 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm p-5 sm:p-7 lg:p-8"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[10px] tracking-[0.22em] text-amber-500/70 uppercase">Section {s.num}</div>
                      <h2 className="font-sora font-bold text-white text-xl sm:text-2xl mt-1 leading-snug">{s.title}</h2>
                    </div>
                  </div>

                  {s.body && (
                    <div className="space-y-4">
                      {s.body.map((p, i) => (
                        <p key={i} className="text-gray-300 text-[15px] sm:text-base leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  {s.bullets && (
                    <div className="mt-4">
                      {s.bulletsHeading && (
                        <p className="text-gray-400 text-sm font-mono tracking-wide mb-3">
                          {s.bulletsHeading}
                        </p>
                      )}
                      <ul className="grid sm:grid-cols-3 gap-2.5">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-gray-300 text-[14px] leading-relaxed bg-white/[0.02] border border-white/[0.05] rounded-lg px-3 py-2.5"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/80 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Custom: refund tier cards */}
                  {s.custom === 'tiers' && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {refundTiers.map((t) => {
                        const a = accentMap[t.accent];
                        const TIcon = t.icon;
                        return (
                          <div
                            key={t.range}
                            className={`rounded-xl border ${a.border} ${a.bg} p-5 flex flex-col gap-3`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`w-9 h-9 rounded-lg border ${a.border} flex items-center justify-center shrink-0`}>
                                  <TIcon className={`w-4 h-4 ${a.icon}`} />
                                </div>
                                <div className="font-sora font-semibold text-white text-[14px] leading-snug">
                                  {t.range}
                                </div>
                              </div>
                              <span className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] font-mono tracking-wide ${a.tagBg} ${a.tag}`}>
                                {t.amount}
                              </span>
                            </div>
                            <ul className="space-y-1.5">
                              {t.items.map((it) => (
                                <li key={it} className="flex items-start gap-2 text-gray-300 text-[13px] leading-relaxed">
                                  <span className={`mt-1.5 w-1 h-1 rounded-full ${a.icon.replace('text-', 'bg-')} shrink-0`} />
                                  {it}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {s.custom === 'contact' && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-mono text-[9px] tracking-[0.22em] text-gray-600 uppercase">Company</div>
                          <div className="text-white text-sm font-medium mt-0.5">D&O Motorsports</div>
                        </div>
                      </div>

                      <a
                        href="https://www.dnomotorsports.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-white/[0.08] hover:border-amber-500/30 bg-white/[0.02] hover:bg-amber-500/[0.04] p-4 flex items-start gap-3 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                          <Globe className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-mono text-[9px] tracking-[0.22em] text-gray-600 uppercase">Website</div>
                          <div className="text-white text-sm font-medium mt-0.5 group-hover:text-amber-300 transition-colors break-all">
                            www.dnomotorsports.in
                          </div>
                        </div>
                      </a>

                      <a
                        href="mailto:dnomotorsportsengineering@gmail.com"
                        className="rounded-xl border border-white/[0.08] hover:border-amber-500/30 bg-white/[0.02] hover:bg-amber-500/[0.04] p-4 flex items-start gap-3 sm:col-span-2 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-mono text-[9px] tracking-[0.22em] text-gray-600 uppercase">Email</div>
                          <div className="text-white text-sm font-medium mt-0.5 group-hover:text-amber-300 transition-colors break-all">
                            dnomotorsportsengineering@gmail.com
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                      </a>
                    </div>
                  )}
                </article>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.06] to-amber-500/[0.01] p-6 sm:p-8 text-center"
            >
              <h3 className="font-sora font-bold text-white text-xl sm:text-2xl mb-2">
                Need to request a refund?
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-5 max-w-xl mx-auto">
                Email our team with your registration details and we'll review within 7–15 business days.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="mailto:dnomotorsportsengineering@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors"
                >
                  Email Refund Request <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:+919820154567"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-amber-500/40 text-white font-medium rounded-full text-sm transition-colors"
                >
                  <PhoneIcon className="w-4 h-4" /> +91 98201 54567
                </a>
                <a
                  href="tel:+919821536060"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-amber-500/40 text-white font-medium rounded-full text-sm transition-colors"
                >
                  <PhoneIcon className="w-4 h-4" /> +91 98215 36060
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
