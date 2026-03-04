import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ClipboardCheck, Microscope, ScanLine, ShieldCheck, Award, ArrowRight, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const qaFramework = [
  {
    icon: ClipboardCheck,
    title: 'Incoming Material Inspection',
    desc: 'Every raw material, sub-assembly, and purchased component undergoes dimensional, chemical, and mechanical verification against certified material data sheets before entering the production floor.',
    standards: ['ISO 9001', 'AS9100', 'MIL-SPEC'],
  },
  {
    icon: ScanLine,
    title: 'In-Process Quality Control',
    desc: 'Stage-gate quality checkpoints embedded at every critical phase of fabrication — from first-article inspection to weld integrity verification and dimensional conformance at each production step.',
    standards: ['SPC', 'APQP', 'PPAP'],
  },
  {
    icon: Microscope,
    title: 'Precision Dimensional Inspection',
    desc: 'CMM (Coordinate Measuring Machine) verification, surface metrology, and optical scanning ensure final components meet drawing tolerances down to ±0.05 mm on critical dimensions.',
    standards: ['GD&T', 'ASME Y14.5', 'CMM'],
  },
  {
    icon: ShieldCheck,
    title: 'Structural & Performance Testing',
    desc: 'Load testing, fatigue cycling, impact resistance, and ballistic validation conducted on representative test articles — with comprehensive test reports and traceability to analysis predictions.',
    standards: ['ASTM', 'ISO 6892', 'MIL-STD'],
  },
  {
    icon: CheckCircle2,
    title: 'Non-Destructive Evaluation (NDE)',
    desc: 'Ultrasonic testing (UT), dye-penetrant inspection (DPI), and visual NDT techniques identify internal flaws and surface defects without compromising the integrity of tested components.',
    standards: ['ASNT', 'EN 4179', 'ISO 9712'],
  },
  {
    icon: Award,
    title: 'Certification & Documentation',
    desc: 'Full traceability documentation, first-article inspection reports, material certificates, and test evidence packages delivered with every production batch — ready for regulatory submission.',
    standards: ['FAI', 'FAIR', 'COC'],
  },
];

const certifications = [
  { name: 'ISO 9001:2015', body: 'Quality Management System', status: 'In Progress' },
  { name: 'AS9100 Rev D', body: 'Aerospace Quality Standard', status: 'Roadmap 2026' },
  { name: 'MIL-SPEC', body: 'Defence Material Standards', status: 'Project-Specific' },
  { name: 'IATF 16949', body: 'Automotive Quality System', status: 'Roadmap 2026' },
];

const qaProcess = [
  { step: '01', title: 'Design Review', desc: 'DFM, DFA, tolerance stack analysis and risk identification before a single chip is cut.' },
  { step: '02', title: 'Material Qualification', desc: 'Supplier audits, incoming inspection, and material certification verification for every batch.' },
  { step: '03', title: 'In-Process Control', desc: 'Stage-gate inspections, process capability studies, and non-conformance tracking throughout manufacture.' },
  { step: '04', title: 'Final Inspection', desc: 'CMM dimensional verification, surface finish check, and functional test against acceptance criteria.' },
  { step: '05', title: 'Documentation Package', desc: 'Traceable records, FAI report, certificates of conformance, and test evidence delivered to client.' },
  { step: '06', title: 'Post-Delivery Support', desc: 'Field performance monitoring, warranty assessment, and lessons-learned integration into next revision.' },
];

export default function QualityPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.reveal-card').forEach((card) => {
        gsap.from(card, {
          y: 45, opacity: 0, duration: 0.75, ease: 'power3.out',
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
          style={{ background: 'radial-gradient(ellipse 70% 55% at 30% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)' }}
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
              Quality Assurance
            </span>
            <h1 className="font-sora font-bold text-[clamp(36px,5.5vw,72px)] text-white leading-[1.05] mb-6">
              Zero Defects.<br />
              <span className="text-gradient">Complete Traceability.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              In defence and safety-critical engineering, quality is not a department — it is a culture. Every D&O product is manufactured, tested, and documented to the highest standards of precision and accountability.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors"
              >
                Discuss Your QA Requirements <ArrowRight className="w-4 h-4" />
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
            { val: '±0.05mm', label: 'Dimensional Tolerance' },
            { val: '6', label: 'QA Disciplines' },
            { val: '100%', label: 'First-Article Inspected' },
            { val: '0', label: 'Field Failures (Critical)' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-sora font-bold text-2xl text-amber-400">{s.val}</div>
              <div className="text-gray-500 text-xs font-mono tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QA Framework ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">QA Framework</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,50px)] text-white mt-3 mb-4">
            End-to-End Quality Control
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Our quality framework spans the entire product lifecycle — from design validation to field performance feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {qaFramework.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="reveal-card p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] hover:border-emerald-500/35 transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-emerald-500/25 mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-sora font-bold text-white text-[17px] mb-3 leading-snug">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.standards.map((s) => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="border-t border-white/[0.06] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Quality Process</span>
            <h2 className="font-sora font-bold text-[clamp(28px,4vw,46px)] text-white mt-3">
              Our 6-Gate QA Pipeline
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {qaProcess.map((step) => (
              <div
                key={step.step}
                className="reveal-card p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-amber-500/25 transition-all duration-300 group"
              >
                <div className="font-mono text-5xl font-bold text-amber-500/15 group-hover:text-amber-500/25 transition-colors mb-4 leading-none">{step.step}</div>
                <h3 className="font-sora font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="border-t border-white/[0.06] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Standards & Compliance</span>
            <h2 className="font-sora font-bold text-[clamp(28px,4vw,42px)] text-white mt-3">
              Certification Roadmap
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="reveal-card p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-center hover:border-amber-500/25 transition-all"
              >
                <div className="font-sora font-bold text-amber-400 text-lg mb-1">{cert.name}</div>
                <div className="text-gray-400 text-sm mb-3">{cert.body}</div>
                <span className="text-[11px] px-3 py-1 rounded-full bg-amber-500/10 text-amber-400/80 font-mono">{cert.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Work with Us</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-4 mb-5">
            Quality You Can Certify
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Whether you need a component with a full inspection package or a complete production program with SPC and traceability — our QA team is ready.
          </p>
          <motion.button
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors"
          >
            Discuss Your QA Needs <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
