import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Zap, Settings, Wrench, Trophy, ArrowRight, ChevronLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'e46-ls3-drift',
    title: 'E46 LS3 — Competition Drift Car',
    category: 'Competition Drift Build',
    tags: ['BMW E46', 'LS3 V8 Swap', 'Drift', 'Roll Cage', '3D Scanning'],
    desc: 'A purpose-built drift machine born from the marriage of BMW\'s iconic E46 chassis and the raw, naturally aspirated power of a GM LS3 V8. The entire engine bay was 3D scanned to develop bespoke mounting solutions with submillimetre accuracy. A full FIA-specification roll cage and comprehensive chassis stiffening programme transform the unibody into a competition-grade structure.',
    highlights: ['GM LS3 V8 swap', '3D-scanned bespoke engine mounts', 'FIA roll cage + chassis stiffening', 'Drift-spec suspension geometry', 'Custom steering setup for high-angle drift', 'Subframe reinforcements'],
    image: '/images/automotive/e46-ls3-drift.jpg',
    color: 'amber',
  },
  {
    id: 'e46-lt1-drift',
    title: 'E46 LT1 — Competition Drift Car',
    category: 'Competition Drift Build',
    tags: ['BMW E46', 'LT1 Camaro Swap', 'Drift', 'CNC Fabrication'],
    desc: 'This E46 receives the potent GM LT1 engine sourced from the Chevrolet Camaro, delivering a distinct powerband ideally suited for drift applications. The swap demanded bespoke engine mounts designed through 3D scanning of the chassis, CNC-machined adapter plates, and a fully revised wiring harness integration.',
    highlights: ['GM LT1 Camaro engine swap', 'CNC-machined adapter plates', '3D-scanned engine mounts', 'Full roll cage to factory hard points', 'Reinforced subframes & diff mounting', 'Adjustable suspension package'],
    image: '/images/automotive/e46-lt1-drift.jpg',
    color: 'blue',
  },
  {
    id: 'e38-ls3-restomod',
    title: 'E38 LS3 — Luxury Resto-Mod',
    category: 'Street Luxury Resto-Mod',
    tags: ['BMW E38', '7 Series', 'LS3 Swap', 'Resto-Mod', 'Grand Tourer'],
    desc: 'BMW\'s flagship E38 7 Series reimagined by seamlessly integrating a GM LS3 V8 into the grand tourer\'s engine bay, delivering effortless power while preserving the refined luxury character of the original platform. Custom engine mounts developed through comprehensive 3D scanning ensure factory-level fitment.',
    highlights: ['GM LS3 V8 into E38 7 Series', '3D-scanned OEM-integrity mounts', 'Precision transmission crossmembers', 'Custom exhaust routing', 'Chassis reinforcement & suspension recalibration', 'Integrated engine management'],
    image: '/images/automotive/e38-ls3.jpg',
    color: 'purple',
  },
  {
    id: 'e30-s54-purist',
    title: 'E30 S54 — The Purist\'s Build',
    category: 'Heritage Performance Build',
    tags: ['BMW E30', 'S54 Inline-6', 'E46 M3 Engine', 'Manual', 'In-House'],
    desc: 'The legendary S54 inline-six from the E46 M3, mated to a manual gearbox, installed into the lightweight and communicative E30 chassis. Every element — from engine mounts and gearbox adapters to wiring integration and ancillary relocation — was designed, prototyped, and manufactured entirely within D&O\'s facility.',
    highlights: ['S54 inline-six from E46 M3', 'Manual gearbox integration', 'In-house engine mounts & adapters', 'Complete wiring integration', 'Ancillary relocation', '100% in-house design & manufacture'],
    image: '/images/automotive/e30-s54.jpg',
    color: 'green',
  },
  {
    id: 'padmini-sr20',
    title: 'Fiat Padmini SR20 — Lightweight Icon',
    category: 'Lightweight Performance Build',
    tags: ['Fiat Padmini', 'Nissan SR20', 'Engine Swap', 'Sleeper', 'Indian Classic'],
    desc: 'The Fiat Padmini, an icon of Indian automotive history, receives a radical transformation with the installation of a Nissan SR20 engine. Custom subframes, engine mounts, and drivetrain components were engineered to integrate the SR20 into the compact engine bay without compromising the car\'s original proportions — a sleeper of the highest order.',
    highlights: ['Nissan SR20 engine swap', 'Custom subframes & engine mounts', 'Bespoke drivetrain integration', 'Power-to-weight optimised', 'Original proportions preserved', 'Heritage-performance balance'],
    image: '/images/automotive/padmini-sr20.jpg',
    color: 'orange',
  },
  {
    id: 'cclass-drift-kit',
    title: 'Mercedes C-Class Drift Angle Kit',
    category: 'Steering Geometry Kit',
    tags: ['Mercedes-Benz', 'C-Class', 'Drift Angle Kit', '3D Scanning', 'Geometry'],
    desc: 'D&O\'s Drift Angle Kit for the Mercedes-Benz C-Class corrects steering geometry to unlock extreme lock angles while maintaining predictable steering feel throughout the drift envelope. Developed through comprehensive 3D scanning of the front suspension, every component was CAD-designed and validated through kinematic simulation.',
    highlights: ['3D-scanned suspension geometry', 'Extreme lock angle correction', 'Ackermann geometry optimised', 'Kinematic simulation validated', 'Caster & camber curves corrected', 'Bolt-on package'],
    image: '/images/automotive/cclass-drift-kit.jpg',
    color: 'red',
  },
  {
    id: 'bmw-m2-fastest',
    title: 'BMW M2 — Fastest in the Country',
    category: 'Track Performance',
    tags: ['BMW M2', 'Lap Record', 'CFD Aero', 'Fastest M2', 'BIC'],
    desc: 'A comprehensive development programme encompassing aerodynamic analysis, suspension kinematics, and precision manufacturing has produced the fastest M2 in the country. The aerodynamic package includes a CFD-informed front splitter manufactured via 3D printing. Suspension arms were manufactured with revised kinematics to optimise camber curves and anti-dive characteristics.',
    highlights: ['Fastest M2 in the country', 'CFD-informed front splitter', '3D-printed aero prototyping', 'Revised suspension kinematics', 'Camber curve optimisation', 'Anti-dive characteristics improved'],
    image: '/images/automotive/bmw-m2-bic.jpg',
    color: 'amber',
  },
  {
    id: 'e46-2jz-restomod',
    title: 'E46 2JZ-GTE — Street Resto-Mod',
    category: 'Street Resto-Mod',
    tags: ['BMW E46', 'Toyota 2JZ-GTE', 'Engine Swap', 'Street Build', 'Turbo'],
    desc: 'The legendary Toyota 2JZ meets the balanced BMW E46 platform. The integration demanded bespoke engine mounts, a revised transmission tunnel, and complete ancillary relocation to maintain a clean, OEM-quality engine bay presentation. The 2JZ\'s renowned strength and tuning potential ensure serious performance credentials with headroom for future development.',
    highlights: ['Toyota 2JZ-GTE swap', 'OEM-quality engine bay presentation', 'Revised transmission tunnel', 'Complete ancillary relocation', 'Street-calibrated setup', 'Future tuning headroom retained'],
    image: '/images/automotive/e46-2jz.jpg',
    color: 'blue',
  },
  {
    id: 'e46-ls3-street',
    title: 'E46 LS3 Street — Luxury Resto-Mod',
    category: 'Street Resto-Mod',
    tags: ['BMW E46', 'LS3 Swap', 'Street', 'Daily Driver', 'Resto-Mod'],
    desc: 'Distinct from its competition-focused sibling, this E46 LS3 build is engineered for the street. The GM LS3 V8 delivers effortless, naturally aspirated torque calibrated for refinement and drivability. Custom headers and a bespoke exhaust system ensure V8 integration that is seamless both mechanically and aesthetically.',
    highlights: ['GM LS3 for street refinement', 'Custom precision-fitted headers', 'Bespoke exhaust system', 'Suspension revised for comfort & composure', 'Period-correct aesthetics', 'Street-calibrated drivetrain'],
    image: '/images/automotive/e46-ls3-street.jpg',
    color: 'purple',
  },
  {
    id: 'fortuner-suspension',
    title: 'Toyota Fortuner — Custom Suspension System',
    category: 'Off-Road Suspension Engineering',
    tags: ['Toyota Fortuner', 'Custom Suspension', 'Off-Road', 'Long Travel', 'High-Speed'],
    desc: 'A fully custom suspension setup featuring revised bump stop geometry engineered for extended wheel travel and high-speed bump absorption. The system allows the Fortuner to maintain composure and traction over rough terrain at speeds that would overwhelm a factory suspension, with progressive bump stops preventing harsh bottoming.',
    highlights: ['Extended wheel travel geometry', 'High-speed bump absorption design', 'Progressive bump stop profiles', 'Custom spring rates & damper valving', 'Mounting geometry optimised', 'Chassis protection under articulation'],
    image: '/images/automotive/fortuner-suspension.jpg',
    color: 'green',
  },
  {
    id: 'jimny-artdeco',
    title: 'Suzuki Jimny — Art Deco Resto-Mod',
    category: 'Art Deco Resto-Mod',
    tags: ['Suzuki Jimny', 'Art Deco', 'Resto-Mod', 'Custom Bodywork', 'Bespoke'],
    desc: 'This Suzuki Jimny build transcends conventional modification, drawing inspiration from the Art Deco movement to create a vehicle that is as visually striking as it is mechanically capable. Bespoke bodywork details, curated interior appointments, and a design language referencing geometric elegance — beneath the artistry, the Jimny retains its rugged, go-anywhere character.',
    highlights: ['Art Deco design language', 'Bespoke bodywork details', 'Curated interior appointments', 'Geometric symmetry elements', 'Mechanical improvements', 'Off-road capability retained'],
    image: '/images/automotive/jimny-artdeco.jpg',
    color: 'orange',
  },
  {
    id: 'redbull-maruti-wall',
    title: 'Red Bull Maruti 800 — Wall of Death',
    category: 'Stunt Engineering — Red Bull India 2025',
    tags: ['Maruti 800', 'Red Bull', 'Wall of Death', 'India 2025', 'Stunt Build'],
    desc: 'Developed specifically for the Red Bull Wall of Death stunt event in India 2025, this Maruti 800 is a purpose-built machine engineered to operate under extreme centripetal forces on a vertical surface. Every aspect — from chassis reinforcement and roll-over protection to engine reliability under sustained lateral G-loading and fuel system integrity at extreme angles — was analysed and addressed.',
    highlights: ['Centripetal force engineering', 'Roll-over protection system', 'Engine reliability under lateral G', 'Fuel system at extreme angles', 'Chassis reinforcement', 'Red Bull Wall of Death India 2025'],
    image: '/images/automotive/redbull-maruti800.jpg',
    color: 'red',
  },
  {
    id: 'brio-1-8tsi',
    title: 'Honda Brio 1.8 TSI — Fastest Street Car',
    category: 'Track Performance / Street Car',
    tags: ['Honda Brio', 'Skoda 1.8 TSI', 'Engine Swap', 'Traction Control', 'Fastest Street Car'],
    desc: 'The Honda Brio receives a comprehensive powertrain transformation with the installation of a Skoda 1.8 TSI turbocharged engine, creating the fastest street-legal car in its class. A bespoke traction control system was developed and integrated to manage the significant power-to-weight ratio — a holistic engineering programme where powertrain, electronics, chassis, and tyres were developed as an integrated package.',
    highlights: ['Skoda 1.8 TSI turbo swap', 'Bespoke traction control system', 'Powertrain-electronics integration', 'Fastest street car in class', 'Chassis calibrated for PTW ratio', 'Holistic performance package'],
    image: '/images/automotive/brio-1-8tsi.jpg',
    color: 'amber',
  },
  {
    id: 'nano-pocket-rocket',
    title: 'Tata Nano 1.6L — Pocket Rocket',
    category: 'Pocket Rocket Performance Build',
    tags: ['Tata Nano', 'Baleno 1.6L', 'Engine Swap', 'Lightweight', 'Power-to-Weight'],
    desc: 'The Tata Nano reimagined as a genuine pocket rocket through the installation of a Maruti Suzuki Baleno 1.6-litre engine. The power-to-weight ratio of this build is extraordinary — the Nano\'s minimal kerb weight combined with the Baleno\'s willing engine creates acceleration and agility that belie its humble origins. A testament to D&O\'s ingenuity: world-class engineering is not defined by the platform you start with.',
    highlights: ['Baleno 1.6L engine swap', 'Custom engine mounts', 'Revised cooling & fuelling systems', 'Maximum power-to-weight ratio', 'Compact drivetrain integration', 'Ingenuity-driven engineering'],
    image: '/images/automotive/nano-pocket-rocket.jpg',
    color: 'blue',
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
