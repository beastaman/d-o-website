import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Database,
  FileBarChart,
  Share2,
  Globe,
  Cookie,
  Archive,
  Lock,
  UserCheck,
  ExternalLink,
  Baby,
  RefreshCw,
  Mail,
  ChevronLeft,
  ArrowRight,
  Calendar,
  FileText,
  Phone as PhoneIcon,
  Building2,
  CreditCard,
  Cpu,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── Section content (verbatim from D&O Motorsports Privacy Policy) ───────────
const sections = [
  {
    id: 'introduction',
    num: '01',
    icon: ShieldCheck,
    title: 'Introduction',
    body: [
      'D&O Motorsports ("we", "our", "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect information when you visit dnomotorsports.in or interact with our services.',
    ],
  },
  {
    id: 'information-we-collect',
    num: '02',
    icon: Database,
    title: 'Information We Collect',
    custom: 'collect',
  },
  {
    id: 'how-we-use',
    num: '03',
    icon: FileBarChart,
    title: 'How We Use Your Information',
    bullets: [
      'Process registrations for courses, bootcamps, internships, events, and programs',
      'Respond to inquiries and support requests',
      'Provide certificates and educational services',
      'Process payments and invoices',
      'Communicate important updates regarding programs and events',
      'Improve our Website and services',
      'Comply with legal and regulatory obligations',
      'Prevent fraud and unauthorized activities',
      'Send promotional communications (with opt-out options)',
    ],
  },
  {
    id: 'sharing',
    num: '04',
    icon: Share2,
    title: 'Sharing of Information',
    body: [
      'We do not sell your personal information. Information may be shared with payment processors, training partners, internship partners, advisors, regulators, and technology service providers as necessary.',
    ],
  },
  {
    id: 'international-transfers',
    num: '05',
    icon: Globe,
    title: 'International Data Transfers',
    body: [
      'Information may be transferred outside India where necessary for international training, internships, or program administration.',
    ],
  },
  {
    id: 'cookies',
    num: '06',
    icon: Cookie,
    title: 'Cookies',
    body: [
      'We may use cookies and similar technologies to improve website functionality and user experience.',
    ],
  },
  {
    id: 'data-retention',
    num: '07',
    icon: Archive,
    title: 'Data Retention',
    body: [
      'We retain personal information only as long as necessary to provide services, maintain records, comply with legal obligations, and resolve disputes.',
    ],
  },
  {
    id: 'data-security',
    num: '08',
    icon: Lock,
    title: 'Data Security',
    body: [
      'We implement reasonable technical and organizational measures to protect personal information, though no method of transmission is completely secure.',
    ],
  },
  {
    id: 'your-rights',
    num: '09',
    icon: UserCheck,
    title: 'Your Rights',
    body: [
      'You may request access, correction, deletion, or restriction of your personal information, subject to applicable laws.',
    ],
  },
  {
    id: 'third-party-links',
    num: '10',
    icon: ExternalLink,
    title: 'Third-Party Links',
    body: [
      'Our website may contain links to third-party websites. We are not responsible for their privacy practices.',
    ],
  },
  {
    id: 'childrens-privacy',
    num: '11',
    icon: Baby,
    title: "Children's Privacy",
    body: [
      'For participants under 18 years of age, parental or guardian consent may be required.',
    ],
  },
  {
    id: 'changes',
    num: '12',
    icon: RefreshCw,
    title: 'Changes to This Privacy Policy',
    body: [
      'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.',
    ],
  },
  {
    id: 'contact-us',
    num: '13',
    icon: Mail,
    title: 'Contact Us',
    custom: 'contact',
  },
];

// ── Information We Collect — 3 sub-categories ────────────────────────────────
const personalInfo = [
  'Full Name',
  'Email Address',
  'Phone Number',
  'Date of Birth',
  'Address',
  'Emergency Contact Details',
  'Educational Information',
  'Motorsport Experience Details',
  'Government Identification Documents (where required)',
];
const technicalInfo = [
  'IP Address',
  'Browser Type',
  'Device Information',
  'Website Usage Data',
  'Cookies and Analytics Information',
];

export default function Privacy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>(sections[0].id);

  // ── Desktop-only reveal animations ──
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

  // ── Active TOC tracking via IntersectionObserver ──
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
      {/* ── Back ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-400 text-sm font-mono tracking-wide transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(246,168,0,0.08) 0%, transparent 70%)',
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
              <FileText className="w-3 h-3" />
              Legal Document
            </span>
            <h1 className="font-sora font-bold text-[clamp(34px,6vw,72px)] text-white leading-[1.05] mb-5">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-7">
              How D&O Motorsports collects, uses, stores, and protects your information when you
              visit our website or interact with our services.
            </p>

            {/* Effective Date + meta pills */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono tracking-wide">
                <Calendar className="w-3.5 h-3.5" />
                Effective Date: 24 March 2026
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 text-xs font-mono tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5" />
                13 Sections
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MAIN GRID — TOC sidebar + Sections
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-20 sm:pb-28">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          {/* ── TOC ── */}
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
                      <span
                        className={`font-mono text-[10px] tracking-wide ${
                          active ? 'text-amber-400' : 'text-gray-700'
                        }`}
                      >
                        {s.num}
                      </span>
                      <span className="leading-snug">{s.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ── Sections ── */}
          <div className="space-y-5 lg:space-y-7 min-w-0">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.id}
                  id={s.id}
                  className="reveal-card scroll-mt-28 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm p-5 sm:p-7 lg:p-8"
                >
                  {/* Section header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[10px] tracking-[0.22em] text-amber-500/70 uppercase">
                        Section {s.num}
                      </div>
                      <h2 className="font-sora font-bold text-white text-xl sm:text-2xl mt-1 leading-snug">
                        {s.title}
                      </h2>
                    </div>
                  </div>

                  {/* Body variants */}
                  {s.body && (
                    <div className="space-y-4">
                      {s.body.map((p, i) => (
                        <p
                          key={i}
                          className="text-gray-300 text-[15px] sm:text-base leading-relaxed"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  {s.bullets && (
                    <ul className="grid sm:grid-cols-2 gap-2.5">
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
                  )}

                  {/* Custom: Section 2 — Information We Collect */}
                  {s.custom === 'collect' && (
                    <div className="grid gap-4 mt-1">
                      {/* Personal Information */}
                      <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.03] p-5">
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/12 border border-amber-500/25 flex items-center justify-center">
                            <UserCheck className="w-4 h-4 text-amber-400" />
                          </div>
                          <h3 className="font-sora font-semibold text-amber-200 text-[15px]">
                            Personal Information
                          </h3>
                        </div>
                        <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-1.5">
                          {personalInfo.map((it) => (
                            <li
                              key={it}
                              className="flex items-start gap-2 text-gray-300 text-[13.5px]"
                            >
                              <span className="mt-2 w-1 h-1 rounded-full bg-amber-500/70 shrink-0" />
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technical Information */}
                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                            <Cpu className="w-4 h-4 text-gray-300" />
                          </div>
                          <h3 className="font-sora font-semibold text-white text-[15px]">
                            Technical Information
                          </h3>
                        </div>
                        <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-1.5">
                          {technicalInfo.map((it) => (
                            <li
                              key={it}
                              className="flex items-start gap-2 text-gray-400 text-[13.5px]"
                            >
                              <span className="mt-2 w-1 h-1 rounded-full bg-gray-500 shrink-0" />
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Payment Information */}
                      <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-5">
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/12 border border-emerald-500/25 flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-emerald-400" />
                          </div>
                          <h3 className="font-sora font-semibold text-emerald-200 text-[15px]">
                            Payment Information
                          </h3>
                        </div>
                        <p className="text-gray-300 text-[14px] leading-relaxed">
                          When payments are processed through third-party payment gateways, we do
                          not store complete card or banking information.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Custom: Section 13 — Contact Us */}
                  {s.custom === 'contact' && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-mono text-[9px] tracking-[0.22em] text-gray-600 uppercase">
                            Company
                          </div>
                          <div className="text-white text-sm font-medium mt-0.5">
                            D&O Motorsports
                          </div>
                        </div>
                      </div>

                      <a
                        href="https://dnomotorsports.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-white/[0.08] hover:border-amber-500/30 bg-white/[0.02] hover:bg-amber-500/[0.04] p-4 flex items-start gap-3 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                          <Globe className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-mono text-[9px] tracking-[0.22em] text-gray-600 uppercase">
                            Website
                          </div>
                          <div className="text-white text-sm font-medium mt-0.5 group-hover:text-amber-300 transition-colors break-all">
                            dnomotorsports.in
                          </div>
                        </div>
                      </a>

                      <a
                        href="mailto:dnomotorsportsacademyengineering@gmail.com"
                        className="rounded-xl border border-white/[0.08] hover:border-amber-500/30 bg-white/[0.02] hover:bg-amber-500/[0.04] p-4 flex items-start gap-3 sm:col-span-2 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-mono text-[9px] tracking-[0.22em] text-gray-600 uppercase">
                            Email
                          </div>
                          <div className="text-white text-sm font-medium mt-0.5 group-hover:text-amber-300 transition-colors break-all">
                            dnomotorsportsacademyengineering@gmail.com
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                      </a>
                    </div>
                  )}
                </article>
              );
            })}

            {/* ── Closing CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.06] to-amber-500/[0.01] p-6 sm:p-8 text-center"
            >
              <h3 className="font-sora font-bold text-white text-xl sm:text-2xl mb-2">
                Questions about your data?
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-5 max-w-xl mx-auto">
                Get in touch and our team will respond within 2 business days.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.button
                  onClick={() => navigate('/contact')}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors"
                >
                  Contact D&O <ArrowRight className="w-4 h-4" />
                </motion.button>
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
