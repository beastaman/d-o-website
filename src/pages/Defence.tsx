import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Eye, Zap, Lock, Target, ChevronRight, AlertTriangle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Shield,
    title: 'Indigenous Defence Platforms',
    desc: 'End-to-end design and manufacturing of tactical vehicles and platforms — conceived, engineered, and built entirely in India under the Make in India initiative.',
    tags: ['Tactical Vehicles', 'Rapid Deployment', 'Field-Ready'],
  },
  {
    icon: Target,
    title: 'Anti-Drone Systems',
    desc: 'Mobile counter-UAV platforms integrating electronic warfare payloads with robust vehicle architecture for operational deployment by paramilitary and armed forces.',
    tags: ['C-UAV', 'EW Integration', 'Mobile Platforms'],
  },
  {
    icon: Eye,
    title: 'Surveillance & Reconnaissance',
    desc: 'Sensor-integrated platforms for persistent area surveillance, border monitoring, and intelligence gathering in austere environments.',
    tags: ['ISR Payloads', 'Day/Night Optics', 'Multi-Sensor'],
  },
  {
    icon: Zap,
    title: 'Rapid-Response Vehicles',
    desc: 'High-speed tactical platforms designed for immediate threat response — combining off-road agility with mission-critical payload capacity.',
    tags: ['QRF Vehicles', 'Mobility', 'Survivability'],
  },
  {
    icon: Lock,
    title: 'Composite Armour Solutions',
    desc: 'Advanced lightweight protection systems using high-performance composites (UHMWPE, ceramic, PEEK) providing ballistic protection without weight penalty.',
    tags: ['Ballistic Protection', 'UHMWPE', 'Lightweight'],
  },
  {
    icon: AlertTriangle,
    title: 'Classified Defence Projects',
    desc: 'Confidential engineering programs for strategic defence applications — conducted under strict security protocols in collaboration with Indian defence agencies.',
    tags: ['Classified', 'Strategic', 'Secure Development'],
  },
];

const milestones = [
  {
    year: '2024',
    title: 'Indrajaal Ranger',
    desc: "India's first indigenous anti-drone rapid-response vehicle. Designed and built end-to-end by D&O.",
    badge: 'Defence Breakthrough',
  },
  {
    year: '2025',
    title: 'BSF Republic Day Parade',
    desc: 'Indrajaal Ranger displayed at the Border Security Force Republic Day parade — formal defence sector validation.',
    badge: 'National Recognition',
  },
  {
    year: 'Ongoing',
    title: 'Indian Army Collaboration',
    desc: 'Classified defence technology programs supporting Indian Army strategic requirements.',
    badge: 'Active Program',
  },
];

const stats = [
  { value: '1st', label: 'Anti-Drone Vehicle' },
  { value: 'BSF', label: 'Parade Validated' },
  { value: '3+', label: 'Govt. Agencies' },
  { value: '100%', label: 'Indigenous' },
];

export default function Defence() {
  const headRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const milestoneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(statsRef.current?.querySelectorAll('.stat-item') ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(capRef.current?.querySelectorAll('.cap-card') ?? [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: capRef.current, start: 'top 75%' } }
      );
      gsap.fromTo(milestoneRef.current?.querySelectorAll('.milestone-item') ?? [],
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: milestoneRef.current, start: 'top 75%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0C0E]">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/defence-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/65 to-[#0B0C0E]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/85 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-amber-500/6 blur-[100px] rounded-full pointer-events-none" />

        {/* Tactical crosshair decoration */}
        <div className="absolute top-28 right-12 w-16 h-16 opacity-20">
          <div className="absolute inset-0 border border-amber-500/60 rounded-full" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-amber-500/60 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-amber-500/60 -translate-x-1/2" />
        </div>

        <div ref={headRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-6">
            <span>D&O</span>
            <ChevronRight className="w-3 h-3" />
            <span>Capabilities</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-amber-500">Defence & Strategic</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-5">
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono text-xs text-amber-500 tracking-widest uppercase">Focus Area 04</span>
          </div>

          <h1 className="font-sora font-black text-[clamp(36px,6vw,80px)] text-white leading-[1.0] mb-4">
            DEFENCE &<br />
            <span className="text-amber-400">STRATEGIC</span>
          </h1>

          <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
            Indigenous defence engineering for India's security forces — from anti-drone platforms to composite armour and classified strategic programs.
          </p>
        </div>
      </div>

      {/* ── Classified Notice Banner ───────────────────────────────────────── */}
      <div className="border-y border-amber-500/15 bg-amber-500/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-amber-500 shrink-0" />
            <p className="font-mono text-xs text-amber-500/80 tracking-wider">
              Some D&O defence programs involve classified content. Public disclosures are limited to approved project information only.
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <div ref={statsRef} className="border-b border-white/5 bg-white/[0.02]">
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

      {/* ── Capabilities ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="mb-14">
          <span className="font-mono text-xs text-amber-500 tracking-[0.3em] uppercase">Capabilities</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-3">
            Strategic Engineering Services
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            D&O's defence division delivers end-to-end engineering for India's most demanding security applications — built entirely indigenous.
          </p>
        </div>

        <div ref={capRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="cap-card group relative bg-[#0D0E12] border border-white/5 rounded-2xl p-6 hover:border-amber-500/20 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:bg-amber-500/15 transition-colors">
                  <cap.icon className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-sora font-semibold text-white text-lg mb-3">{cap.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{cap.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] px-2.5 py-1 bg-white/5 border border-white/8 rounded-full text-gray-500 tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Milestones ────────────────────────────────────────────────────── */}
      <div className="relative border-y border-white/5 bg-[#0D0E12] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(246,168,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(246,168,0,0.6) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="mb-14">
            <span className="font-mono text-xs text-amber-500 tracking-[0.3em] uppercase">Track Record</span>
            <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-3">
              Defence Milestones
            </h2>
          </div>

          <div ref={milestoneRef} className="space-y-6 max-w-3xl">
            {milestones.map((m, i) => (
              <div
                key={m.title}
                className="milestone-item flex gap-6 p-6 bg-white/[0.02] border border-white/8 rounded-2xl hover:border-amber-500/20 transition-colors"
              >
                <div className="shrink-0 text-center">
                  <div className="font-sora font-black text-2xl text-amber-400">{m.year}</div>
                  <div className="w-[1px] h-8 bg-amber-500/20 mx-auto mt-2" />
                  <div className="w-3 h-3 rounded-full border-2 border-amber-500/40 mx-auto mt-2" />
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center px-2.5 py-1 bg-amber-500/10 border border-amber-500/15 rounded-full mb-3">
                    <span className="font-mono text-[9px] text-amber-500 tracking-widest uppercase">{m.badge}</span>
                  </div>
                  <h3 className="font-sora font-semibold text-white text-xl mb-2">{m.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                </div>
                <div className="shrink-0 text-gray-700 font-mono text-2xl font-bold self-center">
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Govt. Partners ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <span className="font-mono text-xs text-amber-500 tracking-[0.3em] uppercase block mb-8">
          Government Partners
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Border Security Force', desc: 'Indrajaal Ranger anti-drone platform — Republic Day parade validation', href: '/govt-collaborations' },
            { name: 'Indian Army', desc: 'Classified strategic defence technology programs', href: '/govt-collaborations' },
            { name: 'Maharashtra Government', desc: 'MINGO Airboat disaster management fleet — state emergency services', href: '/govt-collaborations' },
          ].map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              className="group bg-[#0D0E12] border border-white/5 rounded-2xl p-6 hover:border-amber-500/25 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-500" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-sora font-semibold text-white mb-2">{partner.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{partner.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <div className="relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 text-center">
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,52px)] text-white mb-4">
            Defence Partnership Inquiry
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
            For classified program discussions, please reach out directly. All communication is treated with strict confidentiality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(246,168,0,0.4)]">
              Contact Our Team <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/projects/indrajaal-ranger" className="inline-flex items-center gap-2 border border-white/15 hover:border-amber-500/40 text-gray-300 hover:text-amber-400 font-semibold px-8 py-4 rounded-full transition-all duration-300">
              View Indrajaal Ranger
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}