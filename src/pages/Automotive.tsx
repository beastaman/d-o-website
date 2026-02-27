import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Cpu, Zap, Settings, BarChart2, Wrench, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Cpu,
    title: 'High-Performance Vehicle Engineering',
    desc: 'End-to-end development of performance-oriented vehicles from concept to prototype, leveraging motorsport methodologies for road & defence applications.',
    tags: ['Drivetrain Design', 'Chassis Engineering', 'Powertrain'],
  },
  {
    icon: Settings,
    title: 'Custom Architecture & Fabrication',
    desc: 'Purpose-built vehicle platforms designed from the ground up for unique operational requirements — from off-road survivability to urban mobility.',
    tags: ['Custom Frames', 'Suspension Systems', 'Roll Cages'],
  },
  {
    icon: Zap,
    title: 'Performance Tuning & Dynamics',
    desc: 'Advanced calibration of engine management, aerodynamics, and suspension geometry using CAE simulation and track validation.',
    tags: ['ECU Calibration', 'Aero Optimization', 'Data Logging'],
  },
  {
    icon: BarChart2,
    title: 'Simulation & Validation',
    desc: 'Virtual prototyping via multi-body dynamics (MBD), structural FEA, and CFD to de-risk development before physical builds.',
    tags: ['MBD Analysis', 'FEA', 'CFD', 'Fatigue Life'],
  },
  {
    icon: Wrench,
    title: 'Motorsport Engineering',
    desc: 'Race-derived methodologies applied to every build — lightweight construction, rapid iteration, and performance benchmarking.',
    tags: ['Race Prep', 'Lightweighting', 'Telemetry'],
  },
  {
    icon: ArrowRight,
    title: 'Drivetrain Solutions',
    desc: 'Custom differential systems, transmission selection, driveshaft engineering, and EV powertrain integration for bespoke vehicle programs.',
    tags: ['4WD Systems', 'EV Integration', 'Differential Design'],
  },
];

const projects = [
  {
    label: 'Indrajaal Ranger Platform',
    desc: 'Anti-drone rapid-response vehicle combining tactical mobility with robust electronic warfare payload capacity.',
    href: '/projects/indrajaal-ranger',
    badge: 'Defence',
  },
  {
    label: 'NHAI Survey Vehicles',
    desc: 'Multi-sensor highway inspection platform engineered for continuous all-weather operation on national highways.',
    href: '/projects/nhai-vehicles',
    badge: 'Government',
  },
  {
    label: 'Motorsport Builds',
    desc: 'High-performance drift and track cars built using full race engineering process — from setup sheets to data analysis.',
    href: '/projects/automotive',
    badge: 'Motorsport',
  },
];

const stats = [
  { value: '20+', label: 'Vehicles Built' },
  { value: '5+', label: 'Years in Automotive' },
  { value: '3', label: 'Govt. Programs' },
  { value: '100%', label: 'Indigenous R&D' },
];

export default function Automotive() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const projRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.fromTo(headRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );

      // Stats bar
      gsap.fromTo(statsRef.current?.querySelectorAll('.stat-item') ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } }
      );

      // Capability cards
      gsap.fromTo(capRef.current?.querySelectorAll('.cap-card') ?? [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: capRef.current, start: 'top 75%' } }
      );

      // Project cards
      gsap.fromTo(projRef.current?.querySelectorAll('.proj-card') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: projRef.current, start: 'top 80%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0C0E]">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative w-full h-[70vh] min-h-[520px] flex items-end overflow-hidden"
      >
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/automotive-hero.jpg)' }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/60 to-[#0B0C0E]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/80 via-transparent to-transparent" />

        {/* Amber ambient */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-amber-500/8 blur-[100px] rounded-full pointer-events-none" />

        {/* Corner brackets */}
        <div className="absolute top-28 left-8 w-10 h-10 border-t-2 border-l-2 border-amber-500/40" />
        <div className="absolute top-28 right-8 w-10 h-10 border-t-2 border-r-2 border-amber-500/40" />

        <div ref={headRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-6">
            <span>D&O</span>
            <ChevronRight className="w-3 h-3" />
            <span>Capabilities</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-amber-500">Automotive & Mobility</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-5">
            <Cpu className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono text-xs text-amber-500 tracking-widest uppercase">Focus Area 03</span>
          </div>

          <h1 className="font-sora font-black text-[clamp(36px,6vw,80px)] text-white leading-[1.0] mb-4">
            AUTOMOTIVE &<br />
            <span className="text-amber-400">MOBILITY</span>
          </h1>

          <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
            Race-proven engineering methodologies applied to defence platforms, survey vehicles, and custom performance builds. Built to move. Built to last.
          </p>
        </div>
      </div>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <div
        ref={statsRef}
        className="border-y border-white/5 bg-white/[0.02]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="stat-item text-center">
                <div className="font-sora font-black text-4xl text-amber-400 mb-1">{s.value}</div>
                <div className="font-mono text-xs text-gray-500 tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Capabilities Grid ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="mb-14">
          <span className="font-mono text-xs text-amber-500 tracking-[0.3em] uppercase">What We Do</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-3">
            Engineering Capabilities
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            From motorsport-grade drivetrain engineering to field-ready government platforms — our automotive division covers the full spectrum.
          </p>
        </div>

        <div ref={capRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="cap-card group relative bg-[#0D0E12] border border-white/5 rounded-2xl p-6 hover:border-amber-500/20 transition-all duration-300 hover:bg-[#0F1015]"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:bg-amber-500/15 transition-colors">
                  <cap.icon className="w-5 h-5 text-amber-500" />
                </div>

                <h3 className="font-sora font-semibold text-white text-lg mb-3 group-hover:text-amber-100 transition-colors">
                  {cap.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{cap.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2.5 py-1 bg-white/5 border border-white/8 rounded-full text-gray-500 tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Philosophy ─────────────────────────────────────────────────────── */}
      <div className="relative border-y border-white/5 bg-[#0D0E12] overflow-hidden">
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(246,168,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(246,168,0,0.6) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono text-xs text-amber-500 tracking-[0.3em] uppercase">Our Approach</span>
              <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-3 mb-6">
                Motorsport DNA,<br />
                <span className="text-amber-400">Real-World Proof.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Every vehicle D&O engineers carries the discipline of motorsport: relentless weight reduction, precision geometry, and validated under extreme conditions before deployment. Our Indrajaal Ranger's field performance at the BSF parade is the clearest testament — built fast, built right, built to operate.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We apply simulation-first workflows that compress development timelines dramatically. CFD, FEA, and MBD analysis converge before metal is cut — so physical prototypes are first-article, not first-attempt.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Simulation-First', desc: 'Virtual prototyping before any physical build' },
                { label: 'Motorsport Methods', desc: 'Race-proven engineering rigor on every project' },
                { label: 'Field Validated', desc: 'Real-world testing in extreme conditions' },
                { label: 'Make in India', desc: '100% indigenous design and fabrication' },
              ].map((item) => (
                <div key={item.label} className="bg-white/[0.03] border border-white/8 rounded-xl p-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mb-3" />
                  <div className="font-sora font-semibold text-white text-sm mb-1">{item.label}</div>
                  <div className="text-gray-600 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Projects ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="mb-12">
          <span className="font-mono text-xs text-amber-500 tracking-[0.3em] uppercase">In Action</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,44px)] text-white mt-3">Related Projects</h2>
        </div>

        <div ref={projRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <a
              key={proj.label}
              href={proj.href}
              className="proj-card group relative bg-[#0D0E12] border border-white/5 rounded-2xl p-7 hover:border-amber-500/25 transition-all duration-300 hover:shadow-[0_0_40px_rgba(246,168,0,0.06)]"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-[10px] px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 tracking-widest uppercase">
                  {proj.badge}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-200" />
              </div>
              <h3 className="font-sora font-semibold text-white text-lg mb-3 group-hover:text-amber-100 transition-colors">
                {proj.label}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{proj.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <div className="relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 text-center">
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,52px)] text-white mb-4">
            Have an Automotive Challenge?
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
            Whether it's a defence platform, survey vehicle, or motorsport build — let's engineer it together.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(246,168,0,0.4)]"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}