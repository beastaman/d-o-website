import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Cog, RotateCcw, Layers, Microscope, Box, Activity, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: RotateCcw,
    title: 'Reverse Engineering',
    desc: 'Precise 3D scanning and dimensional analysis of legacy components for digital reconstruction, enabling repair, improvement, and indigenous replication.',
    tags: ['3D Scanning', 'CAD Reconstruction', 'Legacy Parts'],
  },
  {
    icon: Cog,
    title: 'Precision Fabrication',
    desc: 'CNC machining, laser cutting, and multi-axis precision manufacturing for critical structural and mechanical components with tight tolerances.',
    tags: ['CNC Machining', 'Laser Cutting', 'Sheet Metal'],
  },
  {
    icon: Box,
    title: 'Rapid Prototyping',
    desc: 'From CAD to physical prototype in record time using additive manufacturing, casting, and hybrid fabrication — compressing product development cycles.',
    tags: ['3D Printing', 'Casting', 'Hybrid Fab'],
  },
  {
    icon: Layers,
    title: 'Multi-Material Manufacturing',
    desc: 'Complex assemblies combining metals, advanced polymers (PEEK, ULTEM), composites, and ceramics — enabling performance-optimised multi-material solutions.',
    tags: ['PEEK', 'ULTEM', 'Composites', 'Ceramics'],
  },
  {
    icon: Microscope,
    title: 'Material Testing & Validation',
    desc: 'In-house mechanical testing including tensile, impact, hardness, and fatigue analysis — ensuring every component meets specification before delivery.',
    tags: ['Tensile Testing', 'Fatigue Analysis', 'QA'],
  },
  {
    icon: Activity,
    title: 'Process Optimisation',
    desc: 'Lean manufacturing principles applied to every production line — cycle time reduction, scrap minimisation, and continuous improvement frameworks.',
    tags: ['Lean Manufacturing', 'Cycle Time', 'Six Sigma'],
  },
];

const process = [
  { step: '01', title: 'Requirements Analysis', desc: 'Deep dive into functional requirements, tolerances, operating environment, and regulatory constraints.' },
  { step: '02', title: 'Design & Simulation', desc: 'CAD/CAE models validated through FEA, CFD, and dynamic simulation before any material is committed.' },
  { step: '03', title: 'Material Selection', desc: 'Optimal material chosen based on strength-to-weight, thermal resistance, and cost — sourced and quality-verified.' },
  { step: '04', title: 'Prototype Build', desc: 'First-article fabrication using the actual production process — not shortcuts — for true validation data.' },
  { step: '05', title: 'Testing & Validation', desc: 'Comprehensive in-house testing against spec. Accelerated life testing where required.' },
  { step: '06', title: 'Production & Delivery', desc: 'Full-rate production with quality gates at every stage. Complete documentation and traceability.' },
];

const stats = [
  { value: '50+', label: 'Engineers & Technicians' },
  { value: '<0.1mm', label: 'Machining Tolerance' },
  { value: '20+', label: 'Production Applications' },
  { value: '5+', label: 'Years Manufacturing' },
];

export default function ManufacturingPage() {
  const headRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

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
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: capRef.current, start: 'top 75%' } }
      );
      gsap.fromTo(processRef.current?.querySelectorAll('.process-step') ?? [],
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: processRef.current, start: 'top 75%' } }
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
          style={{ backgroundImage: 'url(/manufacturing-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/60 to-[#0B0C0E]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/85 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-amber-500/7 blur-[100px] rounded-full pointer-events-none" />

        {/* Blueprint corner marks */}
        <div className="absolute top-28 left-8 w-12 h-12 border-t-2 border-l-2 border-amber-500/30" />
        <div className="absolute top-28 right-8 w-12 h-12 border-t-2 border-r-2 border-amber-500/30" />
        <div className="absolute bottom-16 left-8 w-8 h-8 border-b border-l border-amber-500/20" />
        <div className="absolute bottom-16 right-8 w-8 h-8 border-b border-r border-amber-500/20" />

        <div ref={headRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-6">
            <span>D&O</span><ChevronRight className="w-3 h-3" />
            <span>Capabilities</span><ChevronRight className="w-3 h-3" />
            <span className="text-amber-500">Advanced Manufacturing</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-5">
            <Cog className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono text-xs text-amber-500 tracking-widest uppercase">Focus Area 05</span>
          </div>

          <h1 className="font-sora font-black text-[clamp(36px,6vw,80px)] text-white leading-[1.0] mb-4">
            ADVANCED<br />
            <span className="text-amber-400">MANUFACTURING</span>
          </h1>

          <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
            Precision fabrication, reverse engineering, and rapid prototyping — delivered with the rigour of aerospace and the speed of an engineering startup.
          </p>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <div ref={statsRef} className="border-y border-white/5 bg-white/[0.02]">
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
          <span className="font-mono text-xs text-amber-500 tracking-[0.3em] uppercase">Services</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-3">Manufacturing Capabilities</h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            From single prototype to production batch — our manufacturing arm delivers precision, consistency, and traceability at every step.
          </p>
        </div>

        <div ref={capRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div key={cap.title} className="cap-card group relative bg-[#0D0E12] border border-white/5 rounded-2xl p-6 hover:border-amber-500/20 transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:bg-amber-500/15 transition-colors">
                  <cap.icon className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-sora font-semibold text-white text-lg mb-3">{cap.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{cap.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] px-2.5 py-1 bg-white/5 border border-white/8 rounded-full text-gray-500 tracking-wider">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <div className="relative border-y border-white/5 bg-[#0D0E12] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(246,168,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(246,168,0,0.6) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="mb-14">
            <span className="font-mono text-xs text-amber-500 tracking-[0.3em] uppercase">How We Work</span>
            <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-3">
              From Brief to Build
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl">
              Our six-stage manufacturing process eliminates guesswork — ensuring first-article success and production-ready outcomes.
            </p>
          </div>

          <div ref={processRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((p) => (
              <div key={p.step} className="process-step relative bg-white/[0.02] border border-white/8 rounded-2xl p-6 hover:border-amber-500/20 transition-colors group">
                <div className="font-mono text-5xl font-black text-white/5 group-hover:text-amber-500/10 mb-4 leading-none transition-colors">{p.step}</div>
                <h3 className="font-sora font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                <div className="absolute top-5 right-5 w-6 h-6 rounded-full border border-amber-500/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tools & Software ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <span className="font-mono text-xs text-amber-500 tracking-[0.3em] uppercase block mb-8">Engineering Tools</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['SolidWorks', 'ANSYS', 'AutoCAD', 'Siemens NX', 'CATIA', 'MSC Nastran', 'MATLAB', 'Abaqus'].map((tool) => (
            <div key={tool} className="group bg-[#0D0E12] border border-white/5 rounded-xl p-4 text-center hover:border-amber-500/20 transition-colors">
              <span className="font-sora font-medium text-gray-400 group-hover:text-white text-sm transition-colors">{tool}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <div className="relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 text-center">
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,52px)] text-white mb-4">
            Have a Manufacturing Requirement?
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
            Send us your drawings, specifications, or just a brief. We'll assess and respond within 2 business days.
          </p>
          <a href="/contact" className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(246,168,0,0.4)]">
            Request a Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}