import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  UserCheck,
  Settings,
  CreditCard,
  ClipboardCheck,
  AlertTriangle,
  Copyright,
  Award,
  Users,
  Globe,
  ShieldOff,
  Scale,
  Lock,
  RefreshCw,
  Gavel,
  Mail,
  ChevronLeft,
  ArrowRight,
  Calendar,
  Phone as PhoneIcon,
  Building2,
  ShieldCheck,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: 'introduction',
    num: '01',
    icon: FileText,
    title: 'Introduction',
    body: [
      'Welcome to D&O Motorsports ("Company", "we", "our", or "us"). These Terms & Conditions govern your access to and use of our website, services, training programs, workshops, bootcamps, internships, events, and related offerings.',
    ],
  },
  {
    id: 'eligibility',
    num: '02',
    icon: UserCheck,
    title: 'Eligibility',
    body: [
      'You must be at least 18 years of age to register independently for our services. Participants under the age of 18 may only participate with the consent of a parent or legal guardian.',
    ],
  },
  {
    id: 'services',
    num: '03',
    icon: Settings,
    title: 'Services',
    body: [
      'D&O Motorsports provides motorsport-related educational programs, workshops, training sessions, internships, events, consulting services, and other related offerings.',
      'Participation in any course, internship, workshop, or event does not guarantee employment, race seats, sponsorships, visas, internships, certifications, or professional opportunities unless explicitly stated in writing.',
    ],
  },
  {
    id: 'registration-payments',
    num: '04',
    icon: CreditCard,
    title: 'Registration and Payments',
    body: [
      'All registrations are subject to acceptance by D&O Motorsports.',
      'Participants agree to provide accurate and complete information during registration.',
      'Course fees, event fees, and other charges must be paid according to the payment terms specified at the time of registration.',
    ],
  },
  {
    id: 'participant-responsibilities',
    num: '05',
    icon: ClipboardCheck,
    title: 'Participant Responsibilities',
    body: [
      'Participants agree to follow all instructions, comply with safety requirements, and conduct themselves professionally and respectfully.',
      'D&O Motorsports reserves the right to remove any participant from a program or event without refund if their conduct compromises safety or operations.',
    ],
  },
  {
    id: 'safety-risk',
    num: '06',
    icon: AlertTriangle,
    title: 'Safety and Assumption of Risk',
    body: [
      'Motorsport activities involve inherent risks, including injury, property damage, or death.',
      'Participants acknowledge and accept these risks and may be required to sign separate waivers before participation.',
    ],
  },
  {
    id: 'intellectual-property',
    num: '07',
    icon: Copyright,
    title: 'Intellectual Property',
    body: [
      'All website content, branding, training materials, videos, photographs, and logos are the property of D&O Motorsports or its licensors.',
      'No content may be copied, reproduced, distributed, or used without prior written permission.',
    ],
  },
  {
    id: 'certificates',
    num: '08',
    icon: Award,
    title: 'Certificates and Program Completion',
    body: [
      'Certificates, where applicable, are issued at the sole discretion of D&O Motorsports upon successful completion of program requirements.',
    ],
  },
  {
    id: 'third-party-partners',
    num: '09',
    icon: Users,
    title: 'Third-Party Partners',
    body: [
      'D&O Motorsports is not responsible for decisions, services, employment opportunities, visa approvals, accommodations, or arrangements made by third-party organizations.',
    ],
  },
  {
    id: 'website-usage',
    num: '10',
    icon: Globe,
    title: 'Website Usage',
    body: [
      'Users agree not to misuse the website, attempt unauthorized access, upload malicious content, or interfere with operations.',
    ],
  },
  {
    id: 'limitation-liability',
    num: '11',
    icon: ShieldOff,
    title: 'Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, D&O Motorsports shall not be liable for indirect, incidental, consequential, or punitive damages arising from website use, program participation, or third-party services.',
      'Our total liability shall not exceed the amount paid for the relevant service.',
    ],
  },
  {
    id: 'indemnification',
    num: '12',
    icon: Scale,
    title: 'Indemnification',
    body: [
      'Participants agree to indemnify and hold harmless D&O Motorsports, its employees, trainers, contractors, affiliates, and partners from claims arising from participation or violation of these Terms.',
    ],
  },
  {
    id: 'privacy',
    num: '13',
    icon: Lock,
    title: 'Privacy',
    body: ['Use of our services is also governed by our Privacy Policy.'],
    cta: { label: 'View Privacy Policy', to: '/privacy' },
  },
  {
    id: 'modifications',
    num: '14',
    icon: RefreshCw,
    title: 'Modifications',
    body: ['D&O Motorsports reserves the right to modify these Terms & Conditions at any time.'],
  },
  {
    id: 'governing-law',
    num: '15',
    icon: Gavel,
    title: 'Governing Law and Jurisdiction',
    body: [
      'These Terms & Conditions shall be governed by the laws of India.',
      'Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.',
    ],
  },
  {
    id: 'contact-information',
    num: '16',
    icon: Mail,
    title: 'Contact Information',
    custom: 'contact',
  },
];

export default function Terms() {
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

      {/* HERO */}
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
              <Scale className="w-3 h-3" />
              Legal Agreement
            </span>
            <h1 className="font-sora font-bold text-[clamp(34px,6vw,72px)] text-white leading-[1.05] mb-5">
              Terms & <span className="text-gradient">Conditions</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-7">
              The rules and agreements that govern your access to and use of D&O Motorsports
              services, programs, and offerings.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono tracking-wide">
                <Calendar className="w-3.5 h-3.5" />
                Effective Date: 24 March 2026
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 text-xs font-mono tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5" />
                16 Sections
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-20 sm:pb-28">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          {/* TOC */}
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
                      <div className="font-mono text-[10px] tracking-[0.22em] text-amber-500/70 uppercase">
                        Section {s.num}
                      </div>
                      <h2 className="font-sora font-bold text-white text-xl sm:text-2xl mt-1 leading-snug">
                        {s.title}
                      </h2>
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

                  {s.cta && (
                    <button
                      onClick={() => navigate(s.cta.to)}
                      className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 text-xs font-mono tracking-wide transition-all group"
                    >
                      {s.cta.label}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
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
                Questions about these terms?
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-5 max-w-xl mx-auto">
                Contact our team and we'll respond within 2 business days.
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
