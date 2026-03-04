import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Shield, Waves, MapPin, ArrowRight, CheckCircle2, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const collaborations = [
  {
    partner: 'Border Security Force (BSF)',
    category: 'Ministry of Home Affairs',
    icon: Shield,
    color: 'amber',
    headline: 'Indrajaal Ranger — India\'s First Anti-Drone Vehicle',
    description:
      'D&O partnered with the BSF to develop and deliver the Indrajaal Ranger — India\'s first indigenously designed and manufactured anti-drone ground vehicle. The platform integrates electronic warfare payloads for counter-UAV (C-UAV) operations and was officially displayed at the 61st BSF Parade 2025, receiving national recognition.',
    deliverables: [
      'Indigenous C-UAV vehicle platform',
      'Electronic warfare payload integration',
      'Full system validation & field testing',
      '61st BSF Parade 2025 showcase',
      'Operational deployment documentation',
    ],
    status: 'Delivered & Showcased',
    year: '2024–2025',
  },
  {
    partner: 'Maharashtra State Government',
    category: 'State Disaster Management',
    icon: Waves,
    color: 'blue',
    headline: 'MINGO Airboat — India\'s First Indigenously Built Airboat',
    description:
      'In collaboration with the Maharashtra Government\'s disaster management initiative, D&O designed and manufactured the MINGO — India\'s first indigenously designed and built airboat. The platform serves as a rapid-deployment disaster response vehicle for flood rescue operations, combining high-speed shallow-water capability with operational reliability for the state\'s emergency response teams.',
    deliverables: [
      'Full in-house airboat design (SolidWorks CAD)',
      'Aluminium hull fabrication & structural assembly',
      'Aircraft-engine propulsion integration',
      'Field deployment and operator training',
      'Maharashtra Government validation & commissioning',
    ],
    status: 'Delivered & Operational',
    year: '2022–2023',
  },
  {
    partner: 'National Highways Authority of India (NHAI)',
    category: 'Ministry of Road Transport',
    icon: MapPin,
    color: 'green',
    headline: 'NHAI Road Survey & Inspection Vehicles',
    description:
      'D&O developed specialised road inspection and survey vehicles for NHAI\'s national highway monitoring programme. The platforms integrate multi-sensor systems including LiDAR, cameras, and pavement distress detection equipment — enabling high-speed data collection across India\'s highway network without disrupting traffic flow.',
    deliverables: [
      'Multi-sensor survey vehicle development',
      'LiDAR & camera integration',
      'Pavement distress detection systems',
      'Real-time data acquisition software interface',
      'Fleet maintenance and support protocols',
    ],
    status: 'Delivered & In Operation',
    year: '2023',
  },
];

const colorMap: Record<string, { border: string; bg: string; tag: string; text: string; badge: string }> = {
  amber: { border: 'border-amber-500/25', bg: 'bg-amber-500/[0.04]', tag: 'bg-amber-500/10 text-amber-400', text: 'text-amber-400', badge: 'bg-amber-500/15 text-amber-300' },
  blue: { border: 'border-blue-500/25', bg: 'bg-blue-500/[0.04]', tag: 'bg-blue-500/10 text-blue-400', text: 'text-blue-400', badge: 'bg-blue-500/15 text-blue-300' },
  green: { border: 'border-emerald-500/25', bg: 'bg-emerald-500/[0.04]', tag: 'bg-emerald-500/10 text-emerald-400', text: 'text-emerald-400', badge: 'bg-emerald-500/15 text-emerald-300' },
};

const trustCredentials = [
  'All projects delivered on schedule and within specification',
  'Zero field failures on any government-deployed platform',
  'Full documentation and traceability for all deliverables',
  'Active post-delivery technical support for all agencies',
  'Cleared for sensitive government procurement processes',
  'Demonstrated Make in India commitment across all projects',
];

export default function GovtCollaborations() {
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
          style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(246,168,0,0.07) 0%, transparent 70%)' }}
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
              Government Collaborations
            </span>
            <h1 className="font-sora font-bold text-[clamp(36px,5.5vw,72px)] text-white leading-[1.05] mb-6">
              Trusted by India's{' '}
              <span className="text-gradient">Critical Agencies</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              D&O Advanced Engineering has delivered mission-critical platforms for India's border security, state disaster management, and national highway infrastructure — establishing a proven track record with the government agencies that matter most.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors"
              >
                Explore a Partnership <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => navigate('/projects/indrajaal-ranger')}
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 hover:border-amber-500/40 text-white font-medium rounded-full text-sm transition-colors"
              >
                View Projects <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: '3', label: 'Govt. Agencies Served' },
            { val: '3', label: 'Flagship Deliverables' },
            { val: '0', label: 'Failed Deployments' },
            { val: '100%', label: 'On-Time Delivery' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-sora font-bold text-2xl text-amber-400">{s.val}</div>
              <div className="text-gray-500 text-xs font-mono tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Collaborations ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28 space-y-8">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Case Studies</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,50px)] text-white mt-3 mb-4">
            Government Project Portfolio
          </h2>
        </div>

        {collaborations.map((collab) => {
          const c = colorMap[collab.color];
          const Icon = collab.icon;
          return (
            <div
              key={collab.partner}
              className={`reveal-card p-8 lg:p-10 rounded-2xl border ${c.border} ${c.bg} group`}
            >
              <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${c.border}`}>
                      <Icon className={`w-5 h-5 ${c.text}`} />
                    </div>
                    <div>
                      <div className={`font-mono text-[9px] tracking-[0.22em] ${c.text} uppercase`}>{collab.category}</div>
                      <div className="font-sora font-bold text-white text-lg">{collab.partner}</div>
                    </div>
                  </div>

                  <h3 className={`font-sora font-bold text-[22px] ${c.text} mb-4 leading-snug`}>
                    {collab.headline}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl">{collab.description}</p>

                  <div>
                    <div className="font-mono text-[9px] tracking-[0.22em] text-gray-600 uppercase mb-3">Key Deliverables</div>
                    <ul className="space-y-2">
                      {collab.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-gray-300">
                          <CheckCircle2 className={`w-4 h-4 ${c.text} mt-0.5 shrink-0`} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:items-end lg:min-w-[180px]">
                  <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${c.badge}`}>
                    <Star className="w-3 h-3" />
                    {collab.status}
                  </span>
                  <span className="font-mono text-xs text-gray-600 tracking-wide">{collab.year}</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── Trust Credentials ── */}
      <section className="border-t border-white/[0.06] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Why Agencies Choose D&O</span>
              <h2 className="font-sora font-bold text-[clamp(28px,4vw,46px)] text-white mt-4 mb-6 leading-tight">
                A Track Record Built on{' '}
                <span className="text-gradient">Delivery, Not Promises</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Government procurement is unforgiving. Agencies need partners who deliver exactly what is specified, on time, with full documentation — and who stand behind their products in the field.
              </p>
              <ul className="space-y-3">
                {trustCredentials.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-gray-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-[4/3] bg-white/[0.02] flex items-center justify-center">
              <img
                src="/indrajaal-project.png"
                alt="Indrajaal Ranger"
                className="w-full h-full object-cover opacity-60"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-mono text-[9px] tracking-[0.2em] text-amber-500/70 uppercase">BSF Parade 2025</div>
                <div className="text-white font-semibold mt-1">Indrajaal Ranger — India's First Anti-Drone Vehicle</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Government Partnerships</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-4 mb-5">
            Ready to Build Something Indigenous?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Whether you represent a ministry, PSU, or state agency — D&O has the engineering depth and proven delivery record to bring your project to life.
          </p>
          <motion.button
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors"
          >
            Start a Government Project Enquiry <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
