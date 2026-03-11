import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Zap, Settings, Wrench, Trophy, ArrowRight, ChevronLeft, Film, Clapperboard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'pod-car',
    title: 'Pod Car — Custom Engineering Build',
    category: 'Custom Vehicle Engineering',
    tags: ['Pod Car', 'Custom Build', 'Chassis Design', 'Electric Powertrain', 'Bespoke'],
    desc: 'A purpose-engineered Pod Car built from the ground up for tight-radius maneuvering, exhibition use, and minimalist performance. D&O designed and fabricated the entire structural chassis, integrating electric powertrain mounts, bespoke composite body panels, and a fully custom suspension geometry tuned for low-speed agility and stability.',
    highlights: ['Full custom chassis design', 'Electric powertrain integration', 'Bespoke composite body panels', 'Tight-radius suspension geometry', 'Exhibition-ready finish', 'In-house fabrication'],
    image: '/images/engineering/pod-car.jpg',
    color: 'amber',
  },
  {
    id: 'faux-snow-machine',
    title: 'Faux Snow Machine — Movie Set Dressing',
    category: 'Film Production Engineering',
    tags: ['Movie Set', 'Snow Machine', 'Film Production', 'Custom Mechanism', 'Practical Effects'],
    desc: 'Engineered and fabricated for professional film and TV production sets, this faux snow machine delivers realistic, on-demand artificial snow effects at scale. The system was designed to produce consistent particle size, dispersion patterns, and density profiles to meet cinematographic requirements — with silent operation and precisely controllable output for director-grade creative control on set.',
    highlights: ['Consistent particle output control', 'Silent operating mechanism', 'Precise density & dispersion tuning', 'Compact, set-ready form factor', 'Rapid deployment & breakdown', 'Custom-fabricated housing'],
    image: '/images/engineering/faux-snow-machine.jpg',
    color: 'blue',
  },
  {
    id: 'netflix-akvs-pod-car',
    title: 'Netflix AKVS — AK Series Pod Car',
    category: 'Film & Streaming Production',
    tags: ['Netflix', 'AKVS', 'AK Series', 'Pod Car', 'Production Vehicle'],
    desc: 'Developed specifically for Netflix\'s AKVS AK Series production, this pod car was engineered to meet the unique demands of professional streaming content — combining camera-friendly aesthetics with functional performance. Every dimension, mounting point, and surface finish was coordinated with the production design team to ensure seamless integration with the visual language of the series.',
    highlights: ['Netflix AKVS AK Series production', 'Production-design coordinated', 'Camera-ready surface finishes', 'Custom mounting provisions', 'Structural engineering for on-set use', 'Rapid iteration prototyping'],
    image: '/images/engineering/netflix-akvs-pod.jpg',
    color: 'purple',
  },
  {
    id: 'movie-prop-design',
    title: 'Movie Prop Design & Fabrication',
    category: 'Entertainment Engineering',
    tags: ['Movie Props', 'Prop Fabrication', 'Film Engineering', 'Custom Design', 'Hero Props'],
    desc: 'D&O\'s prop engineering division brings film-grade precision to hero prop development. From initial concept and 3D modelling through prototyping and final fabrication, each prop is engineered to be functionally convincing, visually authentic, and robust enough to withstand repeated handling on set. Materials, surface treatments, and mechanisms are all selected in close collaboration with the production design team.',
    highlights: ['3D modelled & prototyped in-house', 'Hero prop to background dressing', 'Multi-material fabrication', 'Production design collaboration', 'Surface finish expertise', 'Robust on-set durability'],
    image: '/images/engineering/movie-prop-design.jpg',
    color: 'green',
  },
  {
    id: 'bmcm-movie-prop',
    title: 'BMCM — Movie Prop Design',
    category: 'Feature Film Production',
    tags: ['BMCM', 'Feature Film', 'Movie Props', 'Bespoke Fabrication', 'Production Engineering'],
    desc: 'Engineered for the BMCM feature film production, this prop programme delivered a suite of bespoke fabricated items that met the production\'s demanding visual and functional requirements. D&O\'s engineering approach ensured that each piece was not merely aesthetically convincing but mechanically sound — capable of camera-close hero use and the rigours of an active film set.',
    highlights: ['Feature film BMCM production', 'Hero & stunt prop variants', 'Close-up camera-ready finishing', 'Mechanical function integration', 'Multi-unit production runs', 'On-set support capability'],
    image: '/images/engineering/bmcm-prop.jpg',
    color: 'orange',
  },
  {
    id: 'ashwatthama-props',
    title: 'Ashwatthama — Bollywood Prop Engineering',
    category: 'Bollywood Production',
    tags: ['Ashwatthama', 'Bollywood', 'D&O Studios', 'Prop Engineering', 'Film'],
    desc: 'D&O Studios\' work on the Bollywood production Ashwatthama showcases the depth of the team\'s prop fabrication and engineering capability. Weapons, vehicle-mounted systems, and set dressing components were designed, prototyped, and fabricated entirely in-house — setting a new benchmark for engineering credibility in Indian commercial film production.',
    highlights: ['Bollywood film production', 'Weapons & tactical props', 'Vehicle-mounted set dressing', 'Full in-house design & build', 'Authentic material finishes', 'D&O Studios division'],
    image: '/images/engineering/ashwatthama-props.jpg',
    color: 'red',
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; tag: string }> = {
  amber: { border: 'border-amber-500/25', bg: 'bg-amber-500/[0.04]', text: 'text-amber-400', tag: 'bg-amber-500/10 text-amber-400' },
  blue: { border: 'border-blue-500/25', bg: 'bg-blue-500/[0.04]', text: 'text-blue-400', tag: 'bg-blue-500/10 text-blue-400' },
  purple: { border: 'border-purple-500/25', bg: 'bg-purple-500/[0.04]', text: 'text-purple-400', tag: 'bg-purple-500/10 text-purple-400' },
  orange: { border: 'border-orange-500/25', bg: 'bg-orange-500/[0.04]', text: 'text-orange-400', tag: 'bg-orange-500/10 text-orange-400' },
  green: { border: 'border-emerald-500/25', bg: 'bg-emerald-500/[0.04]', text: 'text-emerald-400', tag: 'bg-emerald-500/10 text-emerald-400' },
  red: { border: 'border-red-500/25', bg: 'bg-red-500/[0.04]', text: 'text-red-400', tag: 'bg-red-500/10 text-red-400' },
};

const stats = [
  { icon: Film, val: '10+', label: 'Film Productions' },
  { icon: Clapperboard, val: '50+', label: 'Props Fabricated' },
  { icon: Wrench, val: '100%', label: 'In-House Design' },
  { icon: Trophy, val: 'OTT', label: 'Netflix & Bollywood' },
];

export default function GeneralEngineeringProjects() {
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
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(246,168,0,0.08) 0%, transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase mb-5">
              <span className="w-8 h-px bg-amber-500" /> General Engineering
            </span>
            <h1 className="font-sora font-bold text-[clamp(34px,5vw,64px)] text-white leading-[1.05] mb-5">
              General Engineering Projects
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              From custom pod cars to Netflix productions — D&O's general engineering division delivers precision fabrication, prop design, and bespoke mechanical solutions for the entertainment industry and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="text-center">
                <div className="flex justify-center mb-1"><Icon className="w-5 h-5 text-amber-500/50" /></div>
                <div className="font-sora font-bold text-2xl text-amber-400">{s.val}</div>
                <div className="text-gray-500 text-xs font-mono tracking-wide mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="space-y-6">
          {projects.map((project) => {
            const c = colorMap[project.color];
            return (
              <div key={project.id} className={`reveal-card rounded-2xl border ${c.border} ${c.bg} overflow-hidden group`}>
                <div className="grid lg:grid-cols-[1fr_300px] gap-0">
                  <div className="p-7 lg:p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className={`font-mono text-[9px] tracking-[0.22em] ${c.text} uppercase`}>{project.category}</span>
                    </div>
                    <h2 className="font-sora font-bold text-white text-[22px] mb-3 leading-snug">{project.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((t) => (
                        <span key={t} className={`text-[11px] px-2.5 py-0.5 rounded-full ${c.tag} font-medium`}>{t}</span>
                      ))}
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-2">Highlights</div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {project.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2 text-xs text-gray-400">
                            <span className={`w-1 h-1 rounded-full shrink-0 ${c.text.replace('text-', 'bg-')}`} />
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={`relative border-l ${c.border} bg-black/20 flex items-center justify-center min-h-[240px] lg:min-h-0 overflow-hidden`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-[1.04] transition-all duration-700"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-black/30`} />
                    <div className="absolute bottom-3 right-3">
                      <span className={`font-mono text-[8px] px-2 py-0.5 rounded-full bg-black/50 ${c.text} tracking-wide opacity-0 group-hover:opacity-100 transition-opacity`}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Commission a Project</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-4 mb-5">Have a Custom Engineering Need?</h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Whether it's a film prop, a custom mechanism, or a bespoke fabrication challenge — D&O turns complex briefs into precision engineering reality.
          </p>
          <motion.button
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm"
          >
            Start a Project <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
