import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Wind, Cpu, Activity, Settings, GitBranch, ArrowRight, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const analysisCapabilities = [
  {
    icon: Wind,
    title: 'Computational Fluid Dynamics (CFD)',
    color: 'blue',
    desc: 'Full-vehicle and component-level aerodynamic analysis. We simulate airflow, drag coefficients, downforce, and thermal management for automotive, motorsport, and defence platforms.',
    tools: ['ANSYS Fluent', 'OpenFOAM', 'Star-CCM+'],
    useCases: ['Race car aero', 'Cooling systems', 'Exhaust flow', 'Missile aerodynamics'],
  },
  {
    icon: Activity,
    title: 'Finite Element Analysis (FEA)',
    color: 'amber',
    desc: 'Structural integrity assessment of components and assemblies under static, dynamic, and fatigue loading conditions — ensuring every part performs safely at its design limits.',
    tools: ['ANSYS Structural', 'Abaqus', 'MSC Nastran'],
    useCases: ['Chassis stress', 'Crash simulation', 'Fatigue life', 'Composite layup'],
  },
  {
    icon: GitBranch,
    title: 'Multi-Physics Modelling',
    color: 'purple',
    desc: 'Coupled simulations that bridge thermal, structural, electromagnetic, and fluid domains — critical for defence electronics, EV powertrains, and complex aerospace components.',
    tools: ['ANSYS Multiphysics', 'COMSOL', 'MATLAB/Simulink'],
    useCases: ['Thermal-structural', 'Fluid-structure interaction', 'EMC analysis', 'Battery thermal'],
  },
  {
    icon: Settings,
    title: 'Design Optimisation',
    color: 'green',
    desc: 'Topology optimisation, parametric studies, and Design of Experiments (DoE) to arrive at the lightest, strongest, and most cost-effective design — before the first prototype is machined.',
    tools: ['Altair OptiStruct', 'ANSYS Workbench', 'MATLAB'],
    useCases: ['Weight reduction', 'Part consolidation', 'Stiffness tuning', 'Manufacturing optimisation'],
  },
  {
    icon: Cpu,
    title: 'Kinematics & Dynamics',
    color: 'orange',
    desc: 'Multi-body dynamics (MBD) simulations for suspension geometry, drivetrain behaviour, vehicle ride & handling, and mechanism design — particularly valuable for motorsport and tactical vehicles.',
    tools: ['ADAMS', 'CarSim', 'Simscape'],
    useCases: ['Suspension geometry', 'Ride & handling', 'Drivetrain NVH', 'Mechanism design'],
  },
  {
    icon: BarChart2,
    title: 'Structural Analysis & Validation',
    color: 'red',
    desc: 'Comprehensive certification-grade structural analysis reports supporting regulatory approvals, government tenders, and client sign-off — complete with methodology documentation.',
    tools: ['ANSYS', 'Abaqus', 'NX Nastran'],
    useCases: ['Defence certification', 'NHAI approval', 'Vehicle homologation', 'Armour validation'],
  },
];

const colorMap: Record<string, { border: string; bg: string; tag: string; icon: string }> = {
  blue: { border: 'border-blue-500/25', bg: 'bg-blue-500/[0.04]', tag: 'bg-blue-500/10 text-blue-400', icon: 'text-blue-400' },
  amber: { border: 'border-amber-500/25', bg: 'bg-amber-500/[0.04]', tag: 'bg-amber-500/10 text-amber-400', icon: 'text-amber-400' },
  purple: { border: 'border-purple-500/25', bg: 'bg-purple-500/[0.04]', tag: 'bg-purple-500/10 text-purple-400', icon: 'text-purple-400' },
  green: { border: 'border-emerald-500/25', bg: 'bg-emerald-500/[0.04]', tag: 'bg-emerald-500/10 text-emerald-400', icon: 'text-emerald-400' },
  orange: { border: 'border-orange-500/25', bg: 'bg-orange-500/[0.04]', tag: 'bg-orange-500/10 text-orange-400', icon: 'text-orange-400' },
  red: { border: 'border-red-500/25', bg: 'bg-red-500/[0.04]', tag: 'bg-red-500/10 text-red-400', icon: 'text-red-400' },
};

const tools = [
  { name: 'ANSYS', desc: 'Full suite — Fluent, Mechanical, Maxwell' },
  { name: 'SolidWorks', desc: 'CAD & integrated simulation' },
  { name: 'CATIA', desc: 'Aerospace-grade surface modelling' },
  { name: 'Abaqus / FEA', desc: 'Non-linear structural analysis' },
  { name: 'MSC Nastran', desc: 'Aerospace-certified FEA solver' },
  { name: 'OpenFOAM', desc: 'Open-source CFD for R&D' },
  { name: 'MATLAB / Simulink', desc: 'Control systems & multi-physics' },
  { name: 'AutoCAD', desc: '2D drawings & manufacturing docs' },
];

export default function Analysis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.reveal-card').forEach((card) => {
        gsap.from(card, {
          y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0B0C0E] pt-28">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 60% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase mb-5">
              <span className="w-8 h-px bg-amber-500" />
              Computational Analysis
            </span>
            <h1 className="font-sora font-bold text-[clamp(36px,5.5vw,72px)] text-white leading-[1.05] mb-6">
              Simulate Before You{' '}
              <span className="text-gradient">Build.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Our computational engineering team deploys industry-leading simulation tools to predict performance, identify failure modes, and optimise designs — eliminating costly physical iterations and accelerating time-to-field.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors"
              >
                Request a Simulation Study <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => navigate('/manufacturing')}
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 hover:border-amber-500/40 text-white font-medium rounded-full text-sm transition-colors"
              >
                Our Manufacturing <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: '6', label: 'Simulation Disciplines' },
            { val: '8+', label: 'Industry Tools' },
            { val: '100+', label: 'Studies Completed' },
            { val: '40%', label: 'Avg. Weight Savings' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-sora font-bold text-2xl text-amber-400">{s.val}</div>
              <div className="text-gray-500 text-xs font-mono tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Simulation Services</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,50px)] text-white mt-3 mb-4">
            Analysis Capabilities
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Spanning fluid dynamics to structural integrity — our simulation portfolio covers every critical engineering discipline.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {analysisCapabilities.map((cap) => {
            const c = colorMap[cap.color];
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className={`reveal-card p-6 rounded-2xl border ${c.border} ${c.bg} group hover:border-opacity-50 transition-all duration-300`}
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${c.border} mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${c.icon}`} />
                </div>
                <h3 className="font-sora font-bold text-white text-[17px] mb-3 leading-snug">{cap.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{cap.desc}</p>
                <div className="space-y-3">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-2">Tools Used</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tools.map((t) => (
                        <span key={t} className={`text-[11px] px-2 py-0.5 rounded-full ${c.tag} font-medium`}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-2">Use Cases</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.useCases.map((u) => (
                        <span key={u} className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.05] text-gray-400 border border-white/[0.08]">{u}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Tools Showcase ── */}
      <section className="border-t border-white/[0.06] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Software & Tools</span>
            <h2 className="font-sora font-bold text-[clamp(28px,4vw,46px)] text-white mt-3">
              Industry-Standard Engineering Suite
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="reveal-card p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-amber-500/25 hover:bg-amber-500/[0.03] transition-all duration-300 group"
              >
                <div className="font-sora font-bold text-white text-base mb-1 group-hover:text-amber-400 transition-colors">{tool.name}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{tool.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual placeholder ── */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-[21/9] bg-white/[0.02] flex items-center justify-center">
            <img
              src="/simulation_cfd.jpg"
              alt="CFD Simulation"
              className="w-full h-full object-cover opacity-50"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/80 via-transparent to-[#0B0C0E]/40" />
            <div className="absolute left-8 bottom-8">
              <div className="font-mono text-[9px] tracking-[0.2em] text-amber-500/60 uppercase">CFD Visualisation</div>
              <div className="text-white font-sora font-bold text-xl mt-1">Aerodynamic Flow Analysis</div>
              <div className="text-gray-400 text-sm mt-1">Full-vehicle external aero simulation</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Start a Study</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-4 mb-5">
            Ready to Simulate Your Design?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Share your CAD files or design brief — our simulation engineers will scope the analysis and deliver results with full methodology documentation.
          </p>
          <motion.button
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors"
          >
            Get a Simulation Quote <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
