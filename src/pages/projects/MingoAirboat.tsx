import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Waves, Zap, Shield, Settings, ChevronLeft, ArrowRight, CheckCircle2, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const specs = [
  { label: 'Platform Type', value: 'Indigenous Air-Propelled Watercraft' },
  { label: 'Hull Material', value: 'Marine-Grade Aluminium' },
  { label: 'Propulsion', value: 'Aircraft-Type Pusher Engine + Propeller' },
  { label: 'Max Speed', value: '60+ km/h on water' },
  { label: 'Draft', value: 'Ultra-shallow — operates in 15cm water' },
  { label: 'Capacity', value: '8–10 Persons (Rescue Configuration)' },
  { label: 'Design Tool', value: 'SolidWorks + ANSYS FEA' },
  { label: 'Client', value: 'Maharashtra State Government' },
];

const features = [
  {
    icon: Waves,
    title: 'Shallow Water Mastery',
    desc: 'Designed to operate in water depths as low as 15 cm — critical for flooded urban areas and rice fields where conventional boats become useless.',
  },
  {
    icon: Zap,
    title: 'Rapid Deployment',
    desc: 'Trailer-mounted for fast transport, the MINGO can be operational on water within minutes of arrival — vital during the golden hour of flood rescue operations.',
  },
  {
    icon: Settings,
    title: 'Aircraft-Engine Propulsion',
    desc: 'Air-propelled by a high-performance aircraft-type engine and composite propeller, ensuring reliable thrust without submerged moving parts that clog in debris-laden floodwater.',
  },
  {
    icon: Shield,
    title: 'Full Indigenous Design',
    desc: 'Every component — hull, frame, propulsion mount, seating, and safety systems — was designed in-house by D&O\'s engineering team. No imported platform. 100% Make in India.',
  },
  {
    icon: CheckCircle2,
    title: 'Government Validated',
    desc: 'Delivered and operationally validated by the Maharashtra Government\'s Disaster Management Authority. Field-tested in simulated and real flood scenarios.',
  },
];

const timeline = [
  { phase: 'Concept & Requirements', period: '2022 Q1', desc: 'Requirement capture from Maharashtra Disaster Management Authority. Operating environment analysis and design brief development.' },
  { phase: 'CAD Design', period: '2022 Q2', desc: 'Full hull geometry, structural frame, propulsion architecture and seating layout modelled in SolidWorks.' },
  { phase: 'FEA & CFD Analysis', period: '2022 Q3', desc: 'Structural analysis of hull under load, hydrodynamic resistance modelling and propulsion efficiency calculations.' },
  { phase: 'Hull Fabrication', period: '2022 Q3–Q4', desc: 'Marine-grade aluminium hull plates cut, formed and welded in-house. Frame structure assembled and inspected.' },
  { phase: 'Propulsion Integration', period: '2022 Q4', desc: 'Aircraft engine installation, propeller balancing, steering system integration and fuel system commissioning.' },
  { phase: 'Water Trials & Delivery', period: '2023', desc: 'Extensive water trials conducted at reservoir — speed, maneuverability and load testing completed. Platform delivered to Maharashtra Govt.' },
];

export default function MingoAirboat() {
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
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-16">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 font-medium border border-blue-500/25">
                  <Star className="w-3 h-3" /> Delivered — Maharashtra Govt.
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 font-mono border border-green-500/20">
                  INDIA'S FIRST INDIGENOUS AIRBOAT
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase">Project Showcase</span>
              <h1 className="font-sora font-bold text-[clamp(34px,5vw,64px)] text-white leading-[1.05] mt-3 mb-5">
                MINGO Airboat
              </h1>
              <p className="text-blue-400 font-semibold text-lg mb-4">
                India's First Indigenously Designed & Manufactured Airboat
              </p>
              <p className="text-gray-400 leading-relaxed max-w-xl">
                The MINGO is India's first completely indigenous airboat — designed from the ground up by D&O's engineering team and delivered to the Maharashtra State Government for disaster management and flood rescue operations. Capable of navigating in as little as 15 cm of water, the MINGO redefines rapid-response flood rescue capability for India's emergency services.
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
              className="relative rounded-2xl overflow-hidden border border-blue-500/20 aspect-[4/3] bg-white/[0.02] flex items-center justify-center"
            >
              <img
                src="/images/mingo/hero.png"
                alt="MINGO Airboat"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="font-mono text-[9px] tracking-[0.2em] text-blue-400/70 uppercase">D&O Advanced Engineering × Maharashtra Govt.</div>
                <div className="text-white font-semibold mt-1">MINGO Airboat — Field Operations</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <Waves className="w-14 h-14 text-blue-500/15 mx-auto mb-3" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: '60+ km/h', label: 'Top Speed on Water' },
            { val: '15 cm', label: 'Min. Water Draft' },
            { val: '8–10', label: 'Rescue Capacity' },
            { val: '100%', label: 'Indigenous Design' },
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
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Platform Features</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,46px)] text-white mt-3">
            MINGO Capabilities
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="reveal-card p-6 rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] group hover:border-blue-500/35 transition-all">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-blue-500/25 mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-sora font-bold text-white text-[17px] mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Specs + Timeline ── */}
      <section className="border-t border-white/[0.06] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Specifications</span>
              <h2 className="font-sora font-bold text-[clamp(26px,3.5vw,40px)] text-white mt-4 mb-8">Technical Overview</h2>
              <div className="space-y-0 rounded-xl border border-white/[0.08] overflow-hidden">
                {specs.map((spec, i) => (
                  <div key={spec.label} className={`grid grid-cols-2 px-5 py-4 gap-4 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''} border-b border-white/[0.05] last:border-0`}>
                    <span className="font-mono text-[10px] tracking-[0.15em] text-gray-600 uppercase">{spec.label}</span>
                    <span className="text-gray-200 text-sm font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Development Timeline</span>
              <h2 className="font-sora font-bold text-[clamp(26px,3.5vw,40px)] text-white mt-4 mb-8">Project Milestones</h2>
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
            MINGO in action — from hull fabrication and propulsion integration to field water trials and Maharashtra Government delivery.
          </p>
        </div>

        {/* Main feature image */}
        <div className="reveal-card relative rounded-2xl overflow-hidden border border-blue-500/20 aspect-[16/7] mb-4 group">
          <img
            src="/images/mingo/gallery-hero.png"
            alt="MINGO Airboat — Feature Shot"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
            onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-blue-400/70 uppercase mb-1">D&O × Maharashtra Govt.</div>
              <div className="text-white font-semibold text-sm">MINGO Airboat — Water Trials</div>
            </div>
            <span className="font-mono text-[9px] px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400">01 / 08</span>
          </div>
        </div>

        {/* Grid — 5 images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[2, 3, 4, 5, 6,7,8].map((n) => (
            <div key={n} className="reveal-card relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.07] group">
              <img
                src={`/images/mingo/gallery-0${n}.jpg`}
                alt={`MINGO Airboat Gallery ${n}`}
                className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-full bg-black/50 text-blue-400/80">0{n} / 08</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Next Project</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-4 mb-5">
            Need a Custom Platform?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Whether it's a rescue watercraft, survey vehicle, or specialised tactical platform — D&O will design, build, and deliver it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm"
            >
              Start Your Project <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => navigate('/projects/nhai-vehicles')}
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 hover:border-amber-500/40 text-white font-medium rounded-full text-sm"
            >
              Next: NHAI Vehicles <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
