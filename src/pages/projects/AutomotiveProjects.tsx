import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Zap, Settings, Wrench, Trophy, ArrowRight, ChevronLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'bmw-e36-drift',
    title: '500HP LS-Powered BMW E36 Drift Build',
    category: 'Complete Vehicle Build',
    tags: ['LS Swap', 'Drift Build', 'Custom Fabrication', '500HP'],
    desc: 'A full ground-up drift build on a BMW E36 chassis, swapping the original inline-6 for a 500HP LS V8 engine. The project included custom engine mounts, transmission tunnel modification, driveline conversion, suspension geometry changes for drift, and full roll cage fabrication.',
    highlights: ['V8 LS engine swap', 'Custom engine & transmission mounts', 'Drift-spec suspension geometry', 'Full roll cage', 'Custom exhaust', 'Brake bias adjustment'],
    image: '/images/automotive/bmw-e36-drift.jpg',
    color: 'amber',
  },
  {
    id: 'bmw-m2-bic',
    title: "India's Fastest BMW on Buddh International Circuit",
    category: 'Track Performance Build',
    tags: ['BMW M2', 'Track Record', 'BIC', 'Lap Record'],
    desc: 'D&O prepared and developed a BMW M2 Competition to set the country record for the fastest BMW lap time at Buddh International Circuit (BIC) — beating Narain Kartikeyan\'s time in a Porsche GT2 RS. The project involved ECU tuning, aerodynamic upgrades, suspension setup, and track data analysis.',
    highlights: ['2:05.817 lap time', 'Beats Narain Kartikeyan (Porsche GT2 RS)', 'ECU tune + aero package', 'Custom suspension setup', 'Track data analysis'],
    image: '/images/automotive/bmw-m2-bic.jpg',
    color: 'blue',
  },
  {
    id: 'hd-titanium-exhaust',
    title: 'HD Custom Titanium Exhaust Build',
    category: 'Custom Exhaust Manufacturing',
    tags: ['Harley-Davidson', 'Titanium', 'Custom Exhaust', 'Roadster'],
    desc: 'A full custom titanium exhaust system hand-built for a Harley-Davidson Roadster. The serpentine titanium pipe configuration was fully fabricated in-house, with each bend and merge designed for both acoustic performance and visual impact. The titanium heat colouration finish is a signature of D&O\'s welding precision.',
    highlights: ['Grade 5 Titanium construction', 'Full custom routing design', 'Heat-colour TIG welding', 'Sound-engineered merge points', 'Weight saving vs OEM'],
    image: '/images/automotive/hd-titanium-exhaust.jpg',
    color: 'purple',
  },
  {
    id: 'lamborghini-exhaust',
    title: 'Lamborghini Custom Header & Exhaust',
    category: 'Exotic Exhaust Engineering',
    tags: ['Lamborghini', 'Custom Headers', 'Stainless Steel', 'V10'],
    desc: 'Complete custom header and exhaust system for a Lamborghini V10, fabricated entirely in-house. The equal-length header design was engineered for maximum exhaust scavenging efficiency, and the full system was flow-tested and validated before installation on the car.',
    highlights: ['Equal-length V10 headers', 'Stainless steel mandrel bends', 'Flow-tested for maximum scavenging', 'Custom X-pipe merge', 'Full system from headers to tips'],
    image: '/images/automotive/lamborghini-exhaust.jpg',
    color: 'orange',
  },
  {
    id: 'cad-prototyping',
    title: 'In-House CAD Prototyping & Vehicle Design',
    category: 'Design & Engineering',
    tags: ['SolidWorks', 'CAD', 'Prototype', 'Vehicle Design'],
    desc: 'D&O\'s design team has produced full in-house CAD models of purpose-built vehicles including go-kart platforms, drift-spec tube-frame cars, compact EVs, and individual components. From concept sketches to full assembly drawings, we handle the complete design pipeline internally.',
    highlights: ['Full vehicle CAD in SolidWorks', 'Tube frame chassis design', 'Suspension geometry optimisation', 'Component manufacturing drawings', 'FEA structural validation'],
    image: '/images/automotive/cad-prototyping.jpg',
    color: 'green',
  },
  {
    id: 'leh-ladakh-record',
    title: 'Leh-Ladakh to Kanyakumari — Limca Record Car',
    category: 'Record Attempt Build',
    tags: ['Limca Book', 'Record', 'Long Distance', 'Custom Build'],
    desc: 'D&O developed and prepared the support vehicle for the Limca Book of Records attempt for the fastest time from Leh-Ladakh to Kanya Kumari. The vehicle underwent extensive preparation for the extreme altitude and temperature range of the route.',
    highlights: ['Altitude & cold-weather preparation', 'Engine & drivetrain prep', 'Navigation & comms systems', 'Safety equipment installation', 'Limca Book recognised'],
    image: '/images/automotive/leh-ladakh-record.jpg',
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
  { icon: Trophy, val: '1000+', label: 'High-End Cars Serviced' },
  { icon: Wrench, val: '800+', label: 'Exhaust Systems Built' },
  { icon: Zap, val: '500HP+', label: 'Max Output Build' },
  { icon: Settings, val: '3', label: 'Pro Drift Cars Built' },
];

export default function AutomotiveProjects() {
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
              <span className="w-8 h-px bg-amber-500" /> Automotive & Motorsport
            </span>
            <h1 className="font-sora font-bold text-[clamp(34px,5vw,64px)] text-white leading-[1.05] mb-5">
              Automotive Projects Gallery
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              From 500HP drift builds to national lap records — D&O's motorsport division delivers engineering excellence for high-performance vehicles, custom fabrication, and competitive racing programs.
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

      {/* ── Workshop Gallery ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Workshop Gallery</span>
          <h2 className="font-sora font-bold text-[clamp(24px,3.5vw,42px)] text-white mt-3">
            From the Shop Floor
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
            Behind every build — fabrication, welding, tuning, and testing at D&O's Mumbai workshop.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => i + 1).map((n) => (
            <div key={n} className="reveal-card relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.07] group">
              <img
                src={`/images/automotive/gallery-0${n}.jpg`}
                alt={`Automotive Workshop Gallery ${n}`}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Commission a Build</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-4 mb-5">Want a Custom Build?</h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Whether it's a track car, drift machine, or bespoke exhaust system — D&O turns automotive dreams into engineering reality.
          </p>
          <motion.button
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm"
          >
            Commission Your Build <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
