import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  FileText,
  Sparkles,
  GraduationCap,
  Plane,
  MessageSquare,
  Package,
  CloudOff,
  AlertTriangle,
  ListChecks,
  Mail,
  RefreshCw,
  ChevronLeft,
  ArrowRight,
  Calendar,
  Phone as PhoneIcon,
  Globe,
  ShieldCheck,
  Building2,
  MessageCircle as WhatsAppIcon,
  Smartphone,
  PhoneCall,
  Video,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: 'introduction',
    num: '01',
    icon: FileText,
    title: 'Introduction',
    body: [
      'This Shipping & Delivery Policy outlines how D&O Motorsports delivers its services, course registrations, event participation confirmations, training programs, internships, workshops, merchandise, and related offerings.',
      'By purchasing any service or product from D&O Motorsports, you agree to this Policy.',
    ],
  },
  {
    id: 'nature-services',
    num: '02',
    icon: Sparkles,
    title: 'Nature of Services',
    body: [
      'D&O Motorsports primarily provides educational, training, motorsport, consulting, internship, workshop, and event-related services.',
      'Most services offered are digital or service-based and therefore do not require physical shipping.',
    ],
  },
  {
    id: 'course-program-delivery',
    num: '03',
    icon: GraduationCap,
    title: 'Course and Program Delivery',
    intro: 'Upon successful registration and payment:',
    bullets: [
      'Participants will receive confirmation via email, phone, WhatsApp, or other communication channels.',
      'Access details, schedules, venue information, or joining instructions will be provided before the commencement of the program.',
      'Delivery timelines may vary depending on the specific course, workshop, internship, bootcamp, or event.',
    ],
  },
  {
    id: 'internship-international',
    num: '04',
    icon: Plane,
    title: 'Internship and International Program Delivery',
    intro: 'For internships, overseas placements, race weekend experiences, and international programs:',
    bullets: [
      'Delivery of services is subject to eligibility requirements, documentation, approvals, and partner organization processes.',
      'Timelines may vary depending on visa processing, travel requirements, partner organizations, and regulatory approvals.',
      'D&O Motorsports cannot guarantee specific processing timelines that are controlled by third parties.',
    ],
  },
  {
    id: 'digital-communication',
    num: '05',
    icon: MessageSquare,
    title: 'Digital Communication',
    custom: 'channels',
  },
  {
    id: 'merchandise',
    num: '06',
    icon: Package,
    title: 'Physical Merchandise Delivery',
    intro: 'If D&O Motorsports offers physical merchandise, apparel, certificates, promotional materials, or equipment:',
    bullets: [
      'Orders will be processed after payment confirmation.',
      'Delivery timelines may vary depending on product availability and location.',
      'Shipping timelines are estimates and may be affected by courier delays, weather conditions, public holidays, or circumstances beyond our control.',
    ],
  },
  {
    id: 'delivery-delays',
    num: '07',
    icon: CloudOff,
    title: 'Delivery Delays',
    intro: 'D&O Motorsports shall not be liable for delays caused by:',
    bullets: [
      'Natural disasters',
      'Government restrictions',
      'Transportation disruptions',
      'Courier service delays',
      'Technical failures',
      'Force majeure events',
      'Third-party service providers',
    ],
  },
  {
    id: 'incorrect-information',
    num: '08',
    icon: AlertTriangle,
    title: 'Incorrect Information',
    body: [
      'Customers are responsible for providing accurate contact, shipping, and registration details.',
      'D&O Motorsports shall not be responsible for delays or failed deliveries resulting from incorrect information supplied by customers.',
    ],
  },
  {
    id: 'service-availability',
    num: '09',
    icon: ListChecks,
    title: 'Service Availability',
    body: [
      'Certain programs, events, internships, and training opportunities may be subject to minimum enrollment requirements, availability of instructors, venue availability, and operational considerations.',
    ],
  },
  {
    id: 'contact-information',
    num: '10',
    icon: Mail,
    title: 'Contact Information',
    custom: 'contact',
  },
  {
    id: 'policy-updates',
    num: '11',
    icon: RefreshCw,
    title: 'Policy Updates',
    body: [
      'D&O Motorsports reserves the right to modify this Shipping & Delivery Policy at any time without prior notice.',
    ],
  },
];

// ── Digital channels ──
const channels = [
  { label: 'Email', icon: Mail },
  { label: 'WhatsApp', icon: WhatsAppIcon },
  { label: 'SMS', icon: Smartphone },
  { label: 'Phone Calls', icon: PhoneCall },
  { label: 'Online Learning Platforms', icon: Video },
  { label: 'Other approved communication channels', icon: MessageSquare },
];

export default function Shipping() {
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
              <Truck className="w-3 h-3" />
              Shipping & Delivery
            </span>
            <h1 className="font-sora font-bold text-[clamp(34px,6vw,72px)] text-white leading-[1.05] mb-5">
              Shipping & <span className="text-gradient">Delivery</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-7">
              How D&O Motorsports delivers services, course registrations, event confirmations,
              training programs, internships, workshops, merchandise, and related offerings.
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

                  {(s.intro || s.bullets) && (
                    <div className={s.body ? 'mt-4' : ''}>
                      {s.intro && (
                        <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed mb-3">
                          {s.intro}
                        </p>
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
                    </div>
                  )}

                  {/* Custom: Digital Communication channels */}
                  {s.custom === 'channels' && (
                    <>
                      <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed mb-4">
                        All confirmations, invoices, receipts, schedules, certificates, and program
                        communications may be delivered electronically through:
                      </p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {channels.map((c) => {
                          const CIcon = c.icon;
                          return (
                            <div
                              key={c.label}
                              className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-3"
                            >
                              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                                <CIcon className="w-4 h-4 text-amber-400" />
                              </div>
                              <span className="text-gray-200 text-[13.5px] font-medium leading-snug">
                                {c.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </>
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
                Questions about delivery?
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-5 max-w-xl mx-auto">
                Reach out to our team and we'll respond within 2 business days.
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
