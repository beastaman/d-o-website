import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Camera, Cpu, BarChart2, ChevronLeft, ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const specs = [
  { label: 'Application', value: 'Road Survey & Pavement Inspection' },
  { label: 'Base Platform', value: 'Custom-modified utility vehicle' },
  { label: 'Survey Speed', value: 'Up to 80 km/h operational' },
  { label: 'Sensor Suite', value: 'LiDAR + Stereo Cameras + IMU' },
  { label: 'Pavement Analysis', value: 'IRI, Rutting, Cracking Detection' },
  { label: 'Data Output', value: 'GIS-referenced HD road asset data' },
  { label: 'Coverage', value: 'National Highway network' },
  { label: 'Client', value: 'National Highways Authority of India' },
];

const features = [
  { icon: BarChart2, title: 'LiDAR Point Cloud Mapping', desc: '3D road surface mapping at highway speeds — capturing IRI, rutting depth, and lane geometry with sub-centimetre accuracy.' },
  { icon: Camera, title: 'HD Pavement Imaging', desc: 'Stereo camera arrays capture high-resolution pavement imagery for automated crack detection, marking assessment, and signage inventory.' },
  { icon: Cpu, title: 'Real-Time Data Processing', desc: 'Onboard computing processes raw sensor data into structured GIS output in real time — minimising post-processing bottlenecks.' },
  { icon: MapPin, title: 'GNSS-Referenced Asset Data', desc: 'Every data point is tagged with GNSS coordinates, enabling direct integration with NHAI\'s highway asset management system.' },
];

export default function NHAIVehicles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.reveal-card').forEach((card) => {
        gsap.from(card, { y: 40, opacity: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%' } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0B0C0E] pt-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-400 text-sm font-mono tracking-wide transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Projects
        </button>
      </div>

      <section className="relative overflow-hidden mb-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-16">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-green-500/15 text-green-300 font-medium border border-green-500/25">
                  <Star className="w-3 h-3" /> Delivered & In Operation
                </span>
                <span className="font-mono text-[9px] px-2.5 py-1 rounded-full bg-white/[0.05] text-gray-500 border border-white/[0.08]">2023</span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase">Project Showcase</span>
              <h1 className="font-sora font-bold text-[clamp(34px,5vw,64px)] text-white leading-[1.05] mt-3 mb-5">NHAI Survey Vehicles</h1>
              <p className="text-green-400 font-semibold text-lg mb-4">Highway Road Survey & Inspection Platforms for NHAI</p>
              <p className="text-gray-400 leading-relaxed max-w-xl">
                D&O developed a fleet of specialised road survey vehicles for the National Highways Authority of India's highway monitoring programme. The platforms integrate multi-sensor systems for high-speed pavement condition assessment, asset inventory, and infrastructure data collection — enabling NHAI to maintain and prioritise maintenance across India's national highway network.
              </p>
              <div className="flex flex-wrap gap-4 mt-7">
                <motion.button onClick={() => navigate('/contact')} whileHover={{ scale: 1.04 }} className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm">
                  Discuss a Similar Project <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative rounded-2xl overflow-hidden border border-green-500/20 aspect-[4/3] bg-white/[0.02] flex items-center justify-center">
              <img src="/images/nhai/hero.png" alt="NHAI Survey Vehicle" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="font-mono text-[9px] tracking-[0.2em] text-green-400/70 uppercase">D&O Advanced Engineering × NHAI</div>
                <div className="text-white font-semibold mt-1">NHAI Survey Vehicle — Highway Operations</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ val: '80 km/h', label: 'Survey Speed' }, { val: 'LiDAR+', label: 'Multi-Sensor Suite' }, { val: 'GIS', label: 'Geo-Referenced Data' }, { val: 'NHAI', label: 'Government Client' }].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-sora font-bold text-2xl text-amber-400">{s.val}</div>
              <div className="text-gray-500 text-xs font-mono tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Platform Features</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,46px)] text-white mt-3">System Capabilities</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="reveal-card p-7 rounded-2xl border border-green-500/20 bg-green-500/[0.03] group hover:border-green-500/35 transition-all">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-green-500/25 mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-sora font-bold text-white text-[17px] mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Specifications</span>
            <h2 className="font-sora font-bold text-[clamp(26px,3.5vw,40px)] text-white mt-4 mb-8">Technical Overview</h2>
            <div className="rounded-xl border border-white/[0.08] overflow-hidden">
              {specs.map((spec, i) => (
                <div key={spec.label} className={`grid grid-cols-2 px-5 py-4 gap-4 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''} border-b border-white/[0.05] last:border-0`}>
                  <span className="font-mono text-[10px] tracking-[0.15em] text-gray-600 uppercase">{spec.label}</span>
                  <span className="text-gray-200 text-sm font-medium">{spec.value}</span>
                </div>
              ))}
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
            NHAI survey vehicles in the field — sensor integration, highway operations, and pavement data capture.
          </p>
        </div>

        {/* 2-column feature row */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {[1, 2].map((n) => (
            <div key={n} className="reveal-card relative aspect-[16/10] rounded-2xl overflow-hidden border border-green-500/20 group">
              <img
                src={`/images/nhai/gallery-0${n}.jpg`}
                alt={`NHAI Survey Vehicle Gallery ${n}`}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5">
                <div className="font-mono text-[9px] tracking-[0.2em] text-green-400/70 uppercase mb-1">D&O × NHAI</div>
                <div className="text-white text-sm font-medium">{n === 1 ? 'Vehicle Integration' : 'Highway Survey Operations'}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row — 4 smaller images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[3, 4, 5, 6].map((n) => (
            <div key={n} className="reveal-card relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.07] group">
              <img
                src={`/images/nhai/gallery-0${n}.jpg`}
                alt={`NHAI Gallery ${n}`}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-4 mb-5">Need Infrastructure Survey Solutions?</h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">Contact D&O to discuss how we can build a customised survey vehicle for your infrastructure monitoring needs.</p>
          <motion.button onClick={() => navigate('/contact')} whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }} className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
