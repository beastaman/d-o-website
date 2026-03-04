import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Eye, Radio, ChevronLeft, ArrowRight, CheckCircle2, Lock, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const specs = [
  { label: 'Classification', value: 'Anti-Drone / C-UAV Platform' },
  { label: 'Base Vehicle', value: 'Purpose-Built Tactical 4×4' },
  { label: 'EW Payload', value: 'Integrated Counter-UAV System' },
  { label: 'Detection Range', value: 'Classified' },
  { label: 'Jamming Frequencies', value: 'Classified' },
  { label: 'Power System', value: 'Dual — Generator + Battery' },
  { label: 'Crew', value: '2 Operators' },
  { label: 'Origin', value: '100% Indigenous (Make in India)' },
];

const features = [
  {
    icon: Radio,
    title: 'Electronic Warfare Integration',
    desc: 'Ruggedised EW payload modules for multi-frequency drone jamming, GPS spoofing, and communication disruption — integrated directly into the vehicle architecture.',
  },
  {
    icon: Eye,
    title: 'Surveillance & Detection Suite',
    desc: 'Day/night optical systems and sensor fusion capability enabling persistent area surveillance and early-warning drone detection at extended ranges.',
  },
  {
    icon: Zap,
    title: 'Rapid Deployment Architecture',
    desc: 'Purpose-designed vehicle layout enables full operational readiness within minutes of arrival — critical for rapid-response border and perimeter security scenarios.',
  },
  {
    icon: Shield,
    title: 'Hardened Vehicle Platform',
    desc: 'Reinforced chassis with EMI shielding, vibration-damped equipment mounts, and ballistic-resistant crew compartment for operation in contested environments.',
  },
  {
    icon: Lock,
    title: 'Classified Capabilities',
    desc: 'Additional operational capabilities are classified and available for discussion under NDA with verified defence organisations and government agencies.',
  },
];

const timeline = [
  { phase: 'Requirements & Design', period: 'Q1 2024', desc: 'System requirements capture, platform concept development and CAD modelling in SolidWorks.' },
  { phase: 'Structural Build', period: 'Q2 2024', desc: 'Chassis fabrication, body structure, and EW payload mounting architecture completed.' },
  { phase: 'EW Integration', period: 'Q3 2024', desc: 'Electronic warfare systems integration, cabling, power management, and operator interface development.' },
  { phase: 'Field Testing', period: 'Q4 2024', desc: 'Extensive field validation including mobility, EW effectiveness, and operator ergonomics testing.' },
  { phase: 'BSF Delivery', period: 'Jan 2025', desc: 'Platform delivered to Border Security Force with full documentation and operator training.' },
  { phase: '61st BSF Parade', period: '2025', desc: 'Indrajaal Ranger featured at the 61st BSF Raising Day Parade — national showcase of indigenous defence capability.' },
];

export default function IndrajaalRanger() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.reveal-card').forEach((card) => {
        gsap.from(card, {
          y: 40, opacity: 0, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0B0C0E] pt-28">

      {/* ── Back ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-400 text-sm font-mono tracking-wide transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Projects
        </button>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden mb-0">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(246,168,0,0.09) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-16">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-medium border border-amber-500/25">
                  <Star className="w-3 h-3" /> Delivered — BSF 2025
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-mono border border-red-500/20">
                  CLASSIFIED CAPABILITIES
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase">Project Showcase</span>
              <h1 className="font-sora font-bold text-[clamp(34px,5vw,64px)] text-white leading-[1.05] mt-3 mb-5">
                Indrajaal Ranger
              </h1>
              <p className="text-amber-400 font-semibold text-lg mb-4">
                India's First Indigenously Designed Anti-Drone Vehicle
              </p>
              <p className="text-gray-400 leading-relaxed max-w-xl">
                The Indrajaal Ranger is India's first completely indigenously designed and manufactured counter-UAV ground vehicle. Developed in partnership with the Border Security Force (BSF), it integrates an electronic warfare payload suite into a purpose-built tactical platform — capable of detecting, jamming, and neutralising drone threats in contested border environments.
              </p>
              <div className="flex flex-wrap gap-4 mt-7">
                <motion.button
                  onClick={() => navigate('/contact')}
                  whileHover={{ scale: 1.04 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm"
                >
                  Discuss a Similar Project <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => navigate('/govt-collaborations')}
                  whileHover={{ scale: 1.04 }}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-amber-500/40 text-white font-medium rounded-full text-sm"
                >
                  Govt. Collaborations
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative rounded-2xl overflow-hidden border border-amber-500/20 aspect-[4/3] bg-white/[0.02]"
            >
              <img
                src="/images/indrajaal/hero.png"
                alt="Indrajaal Ranger"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="font-mono text-[9px] tracking-[0.2em] text-amber-500/70 uppercase">D&O Advanced Engineering × BSF</div>
                <div className="text-white font-semibold mt-1">61st BSF Raising Day Parade — 2025</div>
              </div>
              {/* Fallback overlay when no image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" id="img-placeholder">
                <div className="text-center">
                  <Shield className="w-14 h-14 text-amber-500/15 mx-auto mb-3" />
                  <div className="text-gray-700 font-mono text-xs tracking-widest">INDRAJAAL RANGER</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Key Stats ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: '2024–25', label: 'Development Period' },
            { val: 'BSF', label: 'Primary Client' },
            { val: '100%', label: 'Indigenous Build' },
            { val: '61st', label: 'BSF Parade Showcased' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-sora font-bold text-2xl text-amber-400">{s.val}</div>
              <div className="text-gray-500 text-xs font-mono tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">System Features</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,46px)] text-white mt-3">
            Platform Capabilities
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="reveal-card p-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] group hover:border-amber-500/35 transition-all">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-amber-500/25 mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-sora font-bold text-white text-[17px] mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Technical Specs ── */}
      <section className="border-t border-white/[0.06] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Specifications</span>
              <h2 className="font-sora font-bold text-[clamp(26px,3.5vw,40px)] text-white mt-4 mb-8">
                Technical Overview
              </h2>
              <div className="space-y-0 rounded-xl border border-white/[0.08] overflow-hidden">
                {specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`grid grid-cols-2 px-5 py-4 gap-4 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''} border-b border-white/[0.05] last:border-0`}
                  >
                    <span className="font-mono text-[10px] tracking-[0.15em] text-gray-600 uppercase">{spec.label}</span>
                    <span className="text-gray-200 text-sm font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Development Timeline</span>
              <h2 className="font-sora font-bold text-[clamp(26px,3.5vw,40px)] text-white mt-4 mb-8">
                Project Milestones
              </h2>
              <div className="space-y-5">
                {timeline.map((t, i) => (
                  <div key={t.phase} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${i === timeline.length - 1 ? 'border-amber-500 bg-amber-500/20 text-amber-400' : 'border-gray-700 text-gray-600'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      {i < timeline.length - 1 && <div className="w-px flex-1 bg-white/[0.06] mt-2" />}
                    </div>
                    <div className="pb-6 last:pb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-sora font-bold text-white text-[15px]">{t.phase}</span>
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500/70 tracking-wide">{t.period}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Gallery ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Project Gallery</span>
          <h2 className="font-sora font-bold text-[clamp(24px,3.5vw,42px)] text-white mt-3">
            Visual Documentation
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
            Photographic record of the Indrajaal Ranger — from build process to BSF deployment and the 61st Raising Day Parade.
          </p>
        </div>

        {/* Main feature image */}
        <div className="reveal-card relative rounded-2xl overflow-hidden border border-amber-500/20 aspect-[16/7] mb-4 group">
          <img
            src="/images/indrajaal/gallery-01.jpeg"
            alt="Indrajaal Ranger — Feature Shot"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
            onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-amber-500/70 uppercase mb-1">D&O × BSF — 2025</div>
              <div className="text-white font-semibold text-sm">Indrajaal Ranger — Anti-Drone Platform</div>
            </div>
            <span className="font-mono text-[9px] px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400">01 / 08</span>
          </div>
        </div>

        {/* Secondary grid — 3 images */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[2, 3, 4].map((n) => (
            <div key={n} className="reveal-card relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.07] group">
              <img
                src={`/images/indrajaal/gallery-0${n}.jpeg`}
                alt={`Indrajaal Ranger Gallery ${n}`}
                className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-[8px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 tracking-wide">0{n} / 08</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row — 4 smaller images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[5, 6].map((n) => (
            <div key={n} className="reveal-card relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.07] group">
              <img
                src={`/images/indrajaal/gallery-0${n}.jpeg`}
                alt={`Indrajaal Ranger Gallery ${n}`}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-full bg-black/50 text-amber-400/80">0{n} / 08</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Partner With D&O</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-4 mb-5">
            Need an Indigenous Defence Platform?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Whether you require a bespoke C-UAV vehicle, surveillance platform, or tactical mobility solution — D&O has the capability, clearance, and track record to deliver.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm"
            >
              Start a Defence Project Enquiry <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => navigate('/projects/mingo-airboat')}
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 hover:border-amber-500/40 text-white font-medium rounded-full text-sm"
            >
              Next Project: MINGO Airboat <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
