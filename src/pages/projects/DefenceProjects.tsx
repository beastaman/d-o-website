import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, ArrowRight, ChevronLeft, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'indrajaal',
    title: 'Indrajaal Ranger — Anti-Drone Vehicle',
    category: 'Counter-UAV Platform',
    status: 'Delivered — BSF 2025',
    statusColor: 'amber',
    tags: ['C-UAV', 'Electronic Warfare', 'BSF', 'Indigenous', 'Make in India'],
    desc: "India's first indigenously designed and manufactured anti-drone ground vehicle. Delivered to the Border Security Force and showcased at the 61st BSF Raising Day Parade 2025.",
    classification: 'DELIVERED — PUBLIC',
    link: '/projects/indrajaal-ranger',
    image: '/images/indrajaal/hero.png',
  },
  {
    id: 'mingo',
    title: 'MINGO Airboat — Disaster Response Platform',
    category: 'Emergency Response Vehicle',
    status: 'Delivered — Maharashtra Govt.',
    statusColor: 'blue',
    tags: ['Airboat', 'Disaster Management', 'Maharashtra', 'Shallow Water', 'Indigenous'],
    desc: "India's first indigenously designed and manufactured airboat, delivered to the Maharashtra State Government for flood rescue and disaster management operations.",
    classification: 'DELIVERED — PUBLIC',
    link: '/projects/mingo-airboat',
    image: '/images/mingo/hero.png',
  },
  {
    id: 'nhai',
    title: 'NHAI Road Survey & Inspection Vehicles',
    category: 'Infrastructure Survey',
    status: 'Delivered & In Operation',
    statusColor: 'green',
    tags: ['NHAI', 'Survey Vehicle', 'LiDAR', 'Highway', 'Multi-Sensor'],
    desc: 'Specialised multi-sensor road survey vehicles developed for the National Highways Authority of India, enabling high-speed pavement condition assessment across the national highway network.',
    classification: 'DELIVERED — PUBLIC',
    link: '/projects/nhai-vehicles',
    image: '/images/nhai/hero.png',
  },
  {
    id: 'composite-armour',
    title: 'Composite Armour Development Program',
    category: 'Ballistic Protection Systems',
    status: 'Active Development',
    statusColor: 'red',
    tags: ['Composite Armour', 'UHMWPE', 'Ballistic', 'Lightweight', 'Defence'],
    desc: 'Development of advanced lightweight ballistic protection panels using UHMWPE, ceramic, and PEEK composites. Provides certified protection levels at significantly reduced weight versus steel armour.',
    classification: 'RESTRICTED — NDA REQUIRED',
    link: null,
    image: null,
  },
  {
    id: 'classified-1',
    title: 'Classified Electronic Systems Integration',
    category: 'Strategic Defence',
    status: 'Active — Classified',
    statusColor: 'red',
    tags: ['Classified', 'Electronic Systems', 'Strategic', 'Secure'],
    desc: 'Ongoing classified engineering programs for strategic defence applications, conducted under strict security protocols in collaboration with Indian defence agencies. Details available under NDA.',
    classification: 'CLASSIFIED — RESTRICTED',
    link: null,
    image: null,
  },
  {
    id: 'rapid-response',
    title: 'Rapid Response Tactical Vehicle Program',
    category: 'Tactical Mobility',
    status: 'Active Development',
    statusColor: 'orange',
    tags: ['QRF', 'Tactical', 'Mobility', 'Off-Road', 'Payload'],
    desc: 'High-speed tactical platform designed for quick reaction force (QRF) operations — combining off-road capability, payload capacity, and mission-critical systems integration.',
    classification: 'RESTRICTED — NDA REQUIRED',
    link: null,
    image: null,
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  amber: { border: 'border-amber-500/25', bg: 'bg-amber-500/[0.04]', text: 'text-amber-400', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/25' },
  blue: { border: 'border-blue-500/25', bg: 'bg-blue-500/[0.04]', text: 'text-blue-400', badge: 'bg-blue-500/15 text-blue-300 border-blue-500/25' },
  green: { border: 'border-emerald-500/25', bg: 'bg-emerald-500/[0.04]', text: 'text-emerald-400', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25' },
  red: { border: 'border-red-500/25', bg: 'bg-red-500/[0.04]', text: 'text-red-400', badge: 'bg-red-500/15 text-red-300 border-red-500/25' },
  orange: { border: 'border-orange-500/25', bg: 'bg-orange-500/[0.04]', text: 'text-orange-400', badge: 'bg-orange-500/15 text-orange-300 border-orange-500/25' },
};

export default function DefenceProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.reveal-card').forEach((card) => {
        gsap.from(card, { y: 45, opacity: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%' } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0B0C0E] pt-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-400 text-sm font-mono tracking-wide transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(246,168,0,0.07) 0%, transparent 65%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-mono border border-red-500/20">
                <Lock className="w-3 h-3" /> SOME CAPABILITIES CLASSIFIED
              </span>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase mb-5">
              <span className="w-8 h-px bg-amber-500" /> Defence Engineering
            </span>
            <h1 className="font-sora font-bold text-[clamp(34px,5vw,64px)] text-white leading-[1.05] mb-5">Defence Projects Portfolio</h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              D&O's defence engineering capability spans from India's first anti-drone vehicle to classified strategic programs — all designed and built indigenously under the Make in India initiative.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: '3', label: 'Govt. Agencies Served' },
            { val: '100%', label: 'Indigenous Platforms' },
            { val: '0', label: 'Failed Deployments' },
            { val: 'BSF+', label: 'Security Clearance Level' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-sora font-bold text-2xl text-amber-400">{s.val}</div>
              <div className="text-gray-500 text-xs font-mono tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project) => {
            const c = colorMap[project.statusColor];
            const isClassified = project.classification.includes('CLASSIFIED') || project.classification.includes('RESTRICTED');
            return (
              <div
                key={project.id}
                className={`reveal-card rounded-2xl border ${c.border} ${c.bg} group transition-all duration-300 overflow-hidden ${project.link ? 'hover:border-opacity-60 cursor-pointer' : ''}`}
                onClick={() => project.link && navigate(project.link)}
              >
                {/* Project image for public/delivered projects */}
                {project.image && (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.04] transition-all duration-700"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/90 via-[#0B0C0E]/30 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full border font-mono ${c.badge}`}>
                        <Star className="w-2.5 h-2.5" /> {project.status}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-7">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className={`font-mono text-[9px] tracking-[0.22em] ${c.text} uppercase mb-1`}>{project.category}</div>
                      {!project.image && (
                        <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-medium border ${c.badge}`}>
                          {isClassified ? <Lock className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                          {project.status}
                        </span>
                      )}
                    </div>
                    {isClassified && (
                      <div className="shrink-0 w-10 h-10 rounded-xl border border-red-500/25 bg-red-500/[0.08] flex items-center justify-center">
                        <Lock className="w-4 h-4 text-red-400/60" />
                      </div>
                    )}
                  </div>

                  <h3 className="font-sora font-bold text-white text-[20px] mb-3 leading-snug group-hover:text-amber-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((t) => (
                      <span key={t} className={`text-[11px] px-2 py-0.5 rounded-full ${isClassified ? 'bg-gray-500/10 text-gray-500' : `bg-white/[0.05] text-gray-400`} border border-white/[0.07]`}>{t}</span>
                    ))}
                  </div>

                  {project.link && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${c.text}`}>
                      View Full Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                  {!project.link && (
                    <div className="flex items-center gap-1 text-sm font-mono text-gray-600">
                      <Lock className="w-3.5 h-3.5" /> {project.classification}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Classified notice */}
        <div className="mt-8 p-5 rounded-xl border border-red-500/20 bg-red-500/[0.03] flex items-start gap-3">
          <Eye className="w-5 h-5 text-red-400/60 mt-0.5 shrink-0" />
          <div>
            <div className="font-sora font-semibold text-gray-300 text-sm mb-1">Classified & Restricted Projects</div>
            <p className="text-gray-500 text-sm">
              Several D&O defence projects are conducted under confidentiality agreements and cannot be publicly disclosed. Verified government agencies and defence contractors may request a classified capabilities briefing under NDA.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-1.5 text-red-400 text-sm font-medium mt-3 hover:text-red-300 transition-colors"
            >
              Request an NDA Briefing <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Shield className="w-10 h-10 text-amber-500/40 mx-auto mb-5" />
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-4 mb-5">Need an Indigenous Defence Platform?</h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            D&O has the engineering depth, security protocols, and proven track record to deliver mission-critical defence systems — built entirely in India.
          </p>
          <motion.button
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm"
          >
            Start a Defence Project Enquiry <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
