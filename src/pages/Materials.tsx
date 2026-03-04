import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Layers, Atom, Thermometer, Shield, Zap, FlaskConical, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    icon: Atom,
    name: 'PEEK (Polyether Ether Ketone)',
    category: 'High-Performance Polymer',
    color: 'amber',
    properties: ['Temp resistance up to 260°C', 'Chemical resistant', 'FDA compliant', 'Exceptional strength-to-weight'],
    applications: ['Aerospace brackets', 'Medical implants', 'Defence components', 'Motorsport parts'],
    desc: 'Ultra-high performance semi-crystalline thermoplastic offering exceptional mechanical and thermal properties — our go-to for mission-critical components.',
  },
  {
    icon: Layers,
    name: 'ULTEM (PEI)',
    category: 'Polyetherimide',
    color: 'blue',
    properties: ['HDT 217°C', 'Flame retardant (UL94 V-0)', 'Dimensional stability', 'High dielectric strength'],
    applications: ['Electronic housings', 'Aircraft interiors', 'Automotive sensors', 'Medical equipment'],
    desc: 'A premium amorphous thermoplastic delivering outstanding strength, rigidity, and broad chemical resistance for demanding structural applications.',
  },
  {
    icon: Shield,
    name: 'Carbon Fibre Composites',
    category: 'Composite Material',
    color: 'gray',
    properties: ['Ultra-high stiffness', '70% lighter than steel', 'Fatigue resistant', 'Corrosion proof'],
    applications: ['Body panels', 'Structural reinforcement', 'Aerodynamic kits', 'Roll cages'],
    desc: 'Woven carbon fibre prepregs and chopped strand mats processed through autoclave and resin infusion for aerospace-grade structural components.',
  },
  {
    icon: Thermometer,
    name: 'Titanium Alloys (Ti-6Al-4V)',
    category: 'Aerospace Metal',
    color: 'purple',
    properties: ['High specific strength', 'Biocompatible', 'Corrosion resistant', 'Low thermal expansion'],
    applications: ['Exhaust systems', 'Chassis components', 'Fasteners', 'Defence hardware'],
    desc: 'The gold standard aerospace alloy combining exceptional strength, low weight, and outstanding corrosion resistance — used in our custom titanium exhaust systems.',
  },
  {
    icon: Zap,
    name: 'UHMWPE Composites',
    category: 'Ballistic-Grade Polymer',
    color: 'green',
    properties: ['V50 ballistic protection', 'Extremely low friction', 'Impact absorbing', 'Lightweight armour'],
    applications: ['Ballistic panels', 'Armour plating', 'Vehicle protection', 'Personnel armour'],
    desc: 'Ultra-High Molecular Weight Polyethylene — the backbone of our composite armour systems providing certified ballistic protection at minimal weight penalty.',
  },
  {
    icon: FlaskConical,
    name: 'Custom Formulations',
    category: 'R&D Innovation',
    color: 'red',
    properties: ['Application-specific', 'Multi-material hybrid', 'Performance-optimised', 'Prototype validated'],
    applications: ['Specialised defence', 'Motorsport extremes', 'R&D programs', 'Client-specific needs'],
    desc: 'Beyond off-the-shelf — our materials R&D team develops custom hybrid formulations and composite layups tailored to the precise performance envelope of your application.',
  },
];

const colorMap: Record<string, { border: string; bg: string; tag: string; text: string }> = {
  amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/5', tag: 'bg-amber-500/10 text-amber-400', text: 'text-amber-400' },
  blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/5', tag: 'bg-blue-500/10 text-blue-400', text: 'text-blue-400' },
  gray: { border: 'border-gray-500/30', bg: 'bg-gray-500/5', tag: 'bg-gray-500/10 text-gray-400', text: 'text-gray-400' },
  purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/5', tag: 'bg-purple-500/10 text-purple-400', text: 'text-purple-400' },
  green: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', tag: 'bg-emerald-500/10 text-emerald-400', text: 'text-emerald-400' },
  red: { border: 'border-red-500/30', bg: 'bg-red-500/5', tag: 'bg-red-500/10 text-red-400', text: 'text-red-400' },
};

const rdHighlights = [
  'Accelerated ageing and lifecycle testing in-house',
  'Finite Element Analysis (FEA) to validate material selection before production',
  'Multi-material composite layup design and optimisation',
  'Supplier qualification and raw material incoming inspection',
  'Material data sheets, certificates and traceability for every batch',
  'Rapid prototype → test → iterate cycle for new formulations',
];

export default function Materials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.reveal-card').forEach((card) => {
        gsap.from(card, {
          y: 50, opacity: 0, duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
      gsap.utils.toArray<Element>('.reveal-row').forEach((el, i) => {
        gsap.from(el, {
          x: -30, opacity: 0, duration: 0.6, delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0B0C0E] pt-28">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(246,168,0,0.08) 0%, transparent 70%)' }}
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
              Materials & Innovation
            </span>
            <h1 className="font-sora font-bold text-[clamp(36px,5.5vw,72px)] text-white leading-[1.05] mb-6">
              Engineered Materials for{' '}
              <span className="text-gradient">Mission-Critical</span>{' '}
              Applications
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              From high-performance polymers to aerospace-grade composites — our materials science capability underpins every D&O product. We select, test, and validate every material for the specific demands of defence, automotive, and industrial environments.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors"
              >
                Discuss Your Material Needs <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => navigate('/manufacturing')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
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
            { val: '6+', label: 'Material Families' },
            { val: '±0.05mm', label: 'Scan Accuracy' },
            { val: '260°C', label: 'Max Temp Rating' },
            { val: '100%', label: 'Batch Traceability' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-sora font-bold text-2xl text-amber-400">{s.val}</div>
              <div className="text-gray-500 text-xs font-mono tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Materials Grid ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Material Catalogue</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,50px)] text-white mt-3 mb-4">
            Our Materials Portfolio
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Every material in our catalogue has been qualified through rigorous testing and is backed by full traceability documentation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map((mat) => {
            const c = colorMap[mat.color];
            const Icon = mat.icon;
            return (
              <div
                key={mat.name}
                className={`reveal-card p-6 rounded-2xl border ${c.border} ${c.bg} hover:border-opacity-60 transition-all duration-300 group`}
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${c.border} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${c.text}`} />
                </div>
                <div className="font-mono text-[9px] tracking-[0.22em] text-gray-600 uppercase mb-1">{mat.category}</div>
                <h3 className="font-sora font-bold text-white text-lg mb-3 leading-snug">{mat.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{mat.desc}</p>

                <div className="space-y-4">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-2">Key Properties</div>
                    <div className="flex flex-wrap gap-1.5">
                      {mat.properties.map((p) => (
                        <span key={p} className={`text-[11px] px-2 py-0.5 rounded-full ${c.tag} font-medium`}>{p}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-2">Applications</div>
                    <div className="flex flex-wrap gap-1.5">
                      {mat.applications.map((a) => (
                        <span key={a} className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.05] text-gray-400 border border-white/[0.08]">{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── R&D Highlights ── */}
      <section className="border-t border-white/[0.06] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Materials R&D</span>
              <h2 className="font-sora font-bold text-[clamp(28px,4vw,46px)] text-white mt-4 mb-6 leading-tight">
                From Lab to Field —<br />
                <span className="text-gradient">Validated Every Step</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Our materials innovation pipeline ensures that every composition we use has been rigorously characterised, tested, and proven — long before it ever reaches a production vehicle or defence platform.
              </p>
              <ul className="space-y-3">
                {rdHighlights.map((h) => (
                  <li key={h} className="reveal-row flex items-start gap-3 text-gray-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Placeholder visual */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-[4/3] bg-white/[0.02] flex items-center justify-center">
              <img
                src="/materials_peek.jpg"
                alt="Materials Testing Lab"
                className="w-full h-full object-cover opacity-60"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="font-mono text-[9px] tracking-[0.2em] text-amber-500/70 uppercase">D&O Materials Lab</div>
                <div className="text-white font-semibold mt-1">Advanced Material Testing Facility</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Partner With Us</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-4 mb-5">
            Need a Specialised Material Solution?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Tell us your application, operating environment, and performance targets — our materials team will recommend the optimal solution.
          </p>
          <motion.button
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors"
          >
            Start a Materials Consultation <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
