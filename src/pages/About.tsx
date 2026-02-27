import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Target, Lightbulb, ShieldCheck, Heart, ArrowRight, Users, Award, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── Data ─────────────────────────────────────────────────────────────────────

const coreValues = [
  {
    icon: Target,
    title: 'Precision',
    desc: 'Zero tolerance for error in critical systems. Every component, every calculation, every design is held to the highest standard of accuracy.',
    color: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/30',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'Continuous improvement through R&D. We invest in next-generation technologies to stay ahead of industry demands.',
    color: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/30',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity',
    desc: 'Transparent operations and ethical practices in all our engagements — from government contracts to private partnerships.',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
  },
  {
    icon: Heart,
    title: 'Safety',
    desc: 'Prioritizing user safety in all designs. Our engineering decisions always begin and end with the people who rely on our systems.',
    color: 'from-red-500/20 to-red-500/5',
    border: 'border-red-500/30',
  },
];

const teamRoles = [
  { role: 'Founder & Visionary Leader', name: 'Omkar Rane', desc: 'Driving indigenous engineering innovation with deep expertise in automotive, defence, and advanced manufacturing systems.' },
  { role: 'Engineering Core', name: 'Design & Simulation', desc: 'Specialists in CAD/CAE, multi-physics modeling, FEA, and CFD analysis — the minds behind every technical breakthrough.' },
  { role: 'Technical Staff', name: 'Fabrication & Assembly', desc: 'Skilled craftspeople operating precision manufacturing equipment, composites, and prototype builds.' },
];

const milestones = [
  { year: '2019', title: 'Founded', desc: 'D&O established with roots in motorsport and advanced vehicle engineering.' },
  { year: '2022', title: 'MINGO Airboat', desc: 'Flagship indigenous disaster management vehicle delivered to Maharashtra Government.' },
  { year: '2023', title: 'NHAI Partnership', desc: 'Developed specialized road survey and inspection vehicles for national highways.' },
  { year: '2024', title: 'Defence Breakthrough', desc: 'Contributed to India\'s first indigenously developed anti-drone vehicle — the Indrajaal Ranger.' },
  { year: '2025', title: 'BSF Parade', desc: 'Indrajaal Ranger displayed at the 61st BSF Parade 2025 — national recognition.' },
];

const stats = [
  { value: '20+', label: 'Production Applications', icon: Layers },
  { value: '3', label: 'Govt. Agencies Served', icon: Award },
  { value: '5+', label: 'Years of Expertise', icon: Target },
  { value: '50+', label: 'Team Members', icon: Users },
];

// ── Subcomponents ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase mb-4">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sora font-bold text-[clamp(28px,4vw,50px)] text-white leading-[1.08]">
      {children}
    </h2>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Generic reveal for any .reveal element
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach((container) => {
        const children = container.querySelectorAll('.stagger-item');
        gsap.fromTo(
          children,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: container, start: 'top 78%' },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative bg-[#0B0C0E] min-h-screen overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden flex items-end pb-20">
        {/* BG */}
        <div className="absolute inset-0">
          <img
            src="/about-bg.jpg"
            alt="D&O Engineering"
            className="w-full h-full object-cover object-center"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(11,12,14,0.6) 0%, rgba(11,12,14,0.5) 40%, rgba(11,12,14,0.97) 100%)'
          }} />
        </div>

        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(246,168,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(246,168,0,0.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel>About D&O</SectionLabel>
            <h1 className="font-sora font-black text-[clamp(40px,7vw,88px)] text-white leading-[0.96] mb-6">
              BUILT ON{' '}
              <span className="text-gradient">PRECISION.</span>
              <br />
              DRIVEN BY{' '}
              <span className="text-white/50">PURPOSE.</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl font-light leading-relaxed">
              D&O Advanced Engineering is India's foremost indigenous engineering company — operating at the intersection of automotive excellence, defence innovation, and precision manufacturing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── COMPANY OVERVIEW ─────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="reveal">
            <SectionLabel>Company Overview</SectionLabel>
            <SectionHeading>
              Engineering Excellence,{' '}
              <span className="text-gradient">Made in India</span>
            </SectionHeading>
            <div className="mt-6 space-y-4 text-gray-400 text-base leading-relaxed font-light">
              <p>
                D&O Advanced Engineering is an India-based engineering and technology company specialising in advanced automotive systems, defence-grade engineering solutions, and high-performance mobility platforms.
              </p>
              <p>
                Evolving from deep roots in motorsport and applied vehicle engineering, D&O operates at the intersection of R&D, manufacturing, integration, and real-world deployment — delivering solutions that meet both civilian and strategic requirements.
              </p>
              <p>
                The company functions as the parent engineering entity for{' '}
                <a
                  href="https://www.unitedmotorsportsacademy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors underline decoration-amber-500/30"
                >
                  United Motorsports Academy (UMA)
                </a>
                , ensuring that all education and talent development initiatives are backed by live engineering projects and operational experience.
              </p>
            </div>
            <a
              href="/capabilities"
              className="group inline-flex items-center gap-2 mt-8 text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Explore our capabilities
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Stats grid */}
          <div className="reveal-stagger grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stagger-item group relative bg-white/3 border border-white/8 rounded-2xl p-7 hover:border-amber-500/30 hover:bg-white/5 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/4 rounded-full blur-2xl group-hover:bg-amber-500/8 transition-all" />
                <stat.icon className="w-6 h-6 text-amber-500/60 mb-4" />
                <div className="font-sora font-black text-4xl text-white mb-1">{stat.value}</div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ─────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#0D0E12] relative overflow-hidden">
        {/* Ambient bg */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(246,168,0,0.04) 0%, transparent 70%)',
        }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 reveal">
            <SectionLabel>Our Direction</SectionLabel>
            <SectionHeading>Vision & <span className="text-gradient">Mission</span></SectionHeading>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 reveal-stagger">
            {/* Vision */}
            <div className="stagger-item relative group rounded-3xl border border-white/8 bg-white/3 p-10 hover:border-amber-500/25 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-8 w-32 h-[1px] bg-gradient-to-r from-amber-500/60 to-transparent" />
              <div className="relative">
                <div className="font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase mb-4">01 / Vision</div>
                <h3 className="font-sora font-bold text-2xl text-white mb-5">World-Class Indigenous Engineering</h3>
                <p className="text-gray-400 leading-relaxed font-light">
                  To build indigenous, world-class engineering solutions that meet global performance standards while strengthening India's capabilities across defence, mobility, and advanced vehicle systems.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="stagger-item relative group rounded-3xl border border-white/8 bg-white/3 p-10 hover:border-amber-500/25 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-8 w-32 h-[1px] bg-gradient-to-r from-amber-500/60 to-transparent" />
              <div className="relative">
                <div className="font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase mb-4">02 / Mission</div>
                <h3 className="font-sora font-bold text-2xl text-white mb-5">Design, Develop, Deploy</h3>
                <p className="text-gray-400 leading-relaxed font-light">
                  To design, develop, and deploy robust, scalable, and field-ready engineering systems through innovation, precision manufacturing, and interdisciplinary expertise — from concept to deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 reveal">
          <SectionLabel>What We Stand For</SectionLabel>
          <SectionHeading>Our Core <span className="text-gradient">Values</span></SectionHeading>
          <p className="text-gray-500 text-base mt-4 max-w-xl mx-auto">
            The principles that guide every engineering decision we make.
          </p>
        </div>

        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-5">
          {coreValues.map((value) => (
            <div
              key={value.title}
              className={`stagger-item group relative rounded-2xl border ${value.border} bg-gradient-to-br ${value.color} p-8 hover:scale-[1.01] transition-all duration-400 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-[#0B0C0E]/70 rounded-2xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <value.icon className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-sora font-bold text-xl text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LEADERSHIP & TEAM ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#0D0E12]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 reveal">
            <SectionLabel>The People Behind the Mission</SectionLabel>
            <SectionHeading>Leadership & <span className="text-gradient">Expertise</span></SectionHeading>
          </div>

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamRoles.map((member, i) => (
              <div
                key={member.role}
                className="stagger-item group relative rounded-2xl border border-white/8 bg-white/3 p-8 hover:border-amber-500/25 hover:bg-white/5 transition-all duration-400 overflow-hidden"
              >
                {/* Number */}
                <div className="absolute top-6 right-6 font-mono text-5xl font-black text-white/4 select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative">
                  <div className="font-mono text-[9px] tracking-[0.25em] text-amber-500/70 uppercase mb-3">{member.role}</div>
                  <h3 className="font-sora font-bold text-xl text-white mb-4 group-hover:text-amber-400 transition-colors">{member.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* UMA connection */}
          <div className="reveal mt-12 rounded-2xl border border-amber-500/15 bg-amber-500/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] tracking-[0.25em] text-amber-500 uppercase mb-2">Parent Organization</div>
              <h3 className="font-sora font-bold text-xl text-white mb-1">United Motorsports Academy</h3>
              <p className="text-gray-400 text-sm max-w-lg">
                D&O functions as the engineering backbone of UMA, ensuring all education and talent development programs are powered by real-world, live projects.
              </p>
            </div>
            <a
              href="https://www.unitedmotorsportsacademy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(246,168,0,0.4)]"
            >
              Visit UMA
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ── MILESTONES TIMELINE ──────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 reveal">
          <SectionLabel>Journey</SectionLabel>
          <SectionHeading>Key <span className="text-gradient">Milestones</span></SectionHeading>
        </div>

        <div className="relative reveal-stagger">
          {/* Vertical line */}
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-transparent md:-translate-x-1/2" />

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`stagger-item relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Dot */}
                <div className="absolute left-[10px] md:left-1/2 w-4 h-4 bg-amber-500 rounded-full md:-translate-x-1/2 mt-1 md:mt-0 shadow-[0_0_12px_rgba(246,168,0,0.6)]" />

                {/* Year */}
                <div className={`hidden md:flex w-1/2 ${i % 2 === 0 ? 'justify-end pr-16' : 'justify-start pl-16'}`}>
                  <span className="font-sora font-black text-5xl text-white/10">{m.year}</span>
                </div>

                {/* Content */}
                <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                  <div className="bg-white/3 border border-white/8 rounded-xl p-6 hover:border-amber-500/25 transition-colors">
                    <div className="md:hidden font-mono text-xs text-amber-500 mb-2">{m.year}</div>
                    <h4 className="font-sora font-bold text-white text-lg mb-2">{m.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center reveal">
          <div className="relative rounded-3xl border border-white/10 bg-white/3 p-14 overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-transparent to-amber-500/4" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            <div className="relative">
              <div className="font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase mb-4">Let's work together</div>
              <h2 className="font-sora font-black text-[clamp(28px,4vw,52px)] text-white mb-6">
                Ready to Engineer the Future?
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
                Partner with India's premier indigenous engineering firm for your defence, automotive, or manufacturing project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(246,168,0,0.4)]"
                >
                  Start a Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/capabilities"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-amber-500/40 text-white hover:text-amber-400 font-semibold px-8 py-4 rounded-full transition-all duration-300"
                >
                  Explore Capabilities
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}