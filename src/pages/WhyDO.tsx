import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Layers, Target, Users, TrendingUp, Globe, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    icon: Zap,
    title: 'End-to-End in One Roof',
    color: 'amber',
    headline: 'From concept to deployment — zero hand-offs.',
    desc: 'D&O is the only workshop in Mumbai capable of taking a project from initial design through CAD, simulation, fabrication, assembly, and testing entirely in-house. No outsourcing delays. No quality gaps between vendors.',
    proof: 'Demonstrated on the Indrajaal Ranger — CAD to field deployment within a single engineering team.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Engineering',
    color: 'blue',
    headline: 'Mechanical + Electrical + Software + 3D Printing.',
    desc: 'Our team spans every engineering discipline under a single roof: structural design, electronics integration, embedded firmware, and industrial 3D printing. This multidisciplinary depth eliminates the coordination overhead of multi-vendor projects.',
    proof: 'Applied in the Ashwarthama movie prop project — electronics, custom code, and fabrication in one place.',
  },
  {
    icon: Shield,
    title: 'Proven Government Track Record',
    color: 'green',
    headline: 'BSF, Maharashtra Govt, NHAI — delivered on time.',
    desc: 'Three major government projects delivered successfully. The Indrajaal Ranger (BSF), MINGO Airboat (Maharashtra), and NHAI Survey Vehicles represent a proven ability to navigate complex procurement, meet stringent specifications, and deliver field-ready platforms.',
    proof: '0 failed deployments across all government-contracted platforms.',
  },
  {
    icon: Target,
    title: 'Motorsport Precision Culture',
    color: 'red',
    headline: 'Where tolerance is measured in microns and seconds.',
    desc: "Born from motorsport — where tiny margins decide race outcomes — D&O's engineering culture is built on precision. This discipline flows into everything we build, whether a race car suspension or a defence vehicle chassis.",
    proof: 'Country record — fastest BMW at Buddh International Circuit, beating Narain Kartikeyan.',
  },
  {
    icon: TrendingUp,
    title: 'Competitive Pricing vs Western Firms',
    color: 'purple',
    headline: 'Global quality. Indian cost structure.',
    desc: 'D&O Studios consistently outcompetes established western prop makers on pricing, thanks to our locally sourced design and development capability. This advantage extends across all our services — premium quality without the import premium.',
    proof: 'D&O Studios delivers Bollywood-grade engineering at a fraction of international prop house rates.',
  },
  {
    icon: Globe,
    title: 'Make in India First',
    color: 'orange',
    headline: 'Indigenously designed. Indigenously built.',
    desc: 'Every product that leaves D&O is a testament to Indian engineering capability. We are committed to the indigenisation of critical technologies — from anti-drone systems to airboats — reducing India\'s dependency on imported defence and industrial equipment.',
    proof: 'India\'s first indigenous airboat. India\'s first anti-drone vehicle. Built here.',
  },
  {
    icon: Users,
    title: 'Seasoned Core Team',
    color: 'teal',
    headline: 'Masters-level engineers with motorsport DNA.',
    desc: 'Led by Omkar Rane (Masters, Motorsport Engineering, Perth, Australia — 7 years field experience) and supported by Karan Shah (20+ years, owner of KS Motorsport — one of India\'s first tuner shops), our core team brings an exceptional blend of academic rigour and real-world execution.',
    proof: 'Over 1000 high-end cars serviced. 800+ exhaust systems manufactured.',
  },
  {
    icon: Award,
    title: 'Seamless Imagination to Production',
    color: 'pink',
    headline: 'Idea → CAD → Prototype → Production.',
    desc: 'Our integrated capability means a client\'s vision moves seamlessly from sketch to SolidWorks model to machined prototype to production-ready component — all within a single accountable team. This compresses timelines and eliminates the loss of intent across vendor boundaries.',
    proof: 'Applied across every major D&O project — no brief gets "lost in translation".',
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; tag: string }> = {
  amber: { border: 'border-amber-500/25', bg: 'bg-amber-500/[0.04]', text: 'text-amber-400', tag: 'bg-amber-500/10 text-amber-400' },
  blue: { border: 'border-blue-500/25', bg: 'bg-blue-500/[0.04]', text: 'text-blue-400', tag: 'bg-blue-500/10 text-blue-400' },
  green: { border: 'border-emerald-500/25', bg: 'bg-emerald-500/[0.04]', text: 'text-emerald-400', tag: 'bg-emerald-500/10 text-emerald-400' },
  red: { border: 'border-red-500/25', bg: 'bg-red-500/[0.04]', text: 'text-red-400', tag: 'bg-red-500/10 text-red-400' },
  purple: { border: 'border-purple-500/25', bg: 'bg-purple-500/[0.04]', text: 'text-purple-400', tag: 'bg-purple-500/10 text-purple-400' },
  orange: { border: 'border-orange-500/25', bg: 'bg-orange-500/[0.04]', text: 'text-orange-400', tag: 'bg-orange-500/10 text-orange-400' },
  teal: { border: 'border-teal-500/25', bg: 'bg-teal-500/[0.04]', text: 'text-teal-400', tag: 'bg-teal-500/10 text-teal-400' },
  pink: { border: 'border-pink-500/25', bg: 'bg-pink-500/[0.04]', text: 'text-pink-400', tag: 'bg-pink-500/10 text-pink-400' },
};

const comparisons = [
  { factor: 'End-to-end in-house capability', do: true, typical: false },
  { factor: 'Motorsport-grade precision culture', do: true, typical: false },
  { factor: 'Defence project experience', do: true, typical: false },
  { factor: 'Indigenous (Make in India) commitment', do: true, typical: false },
  { factor: 'Mechanical + Electronics + Software + 3D Print', do: true, typical: false },
  { factor: 'Government validated track record', do: true, typical: false },
  { factor: 'Competitive vs. western firms pricing', do: true, typical: true },
  { factor: 'CAD to production in same team', do: true, typical: false },
];

export default function WhyDO() {
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
          style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(246,168,0,0.08) 0%, transparent 65%)' }}
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
              Why Choose D&O
            </span>
            <h1 className="font-sora font-bold text-[clamp(36px,5.5vw,72px)] text-white leading-[1.05] mb-6">
              Why D&O is{' '}
              <span className="text-gradient">India's Most Complete</span>{' '}
              Engineering Partner
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Choosing an engineering partner is a strategic decision. Here's why India's most demanding clients — from BSF to Bollywood studios — choose D&O over the alternatives.
            </p>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors mt-8"
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: '1000+', label: 'High-End Cars Serviced' },
            { val: '800+', label: 'Exhaust Systems Built' },
            { val: '3', label: 'Government Agencies' },
            { val: '2019', label: 'Founded — 6+ Years' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-sora font-bold text-2xl text-amber-400">{s.val}</div>
              <div className="text-gray-500 text-xs font-mono tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Advantages Grid ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Competitive Advantages</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,50px)] text-white mt-3 mb-4">
            8 Reasons to Choose D&O
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {advantages.map((adv) => {
            const c = colorMap[adv.color];
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className={`reveal-card p-7 rounded-2xl border ${c.border} ${c.bg} group hover:border-opacity-50 transition-all duration-300`}
              >
                <div className="flex items-start gap-5">
                  <div className={`shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl border ${c.border} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <div className="min-w-0">
                    <div className={`font-mono text-[9px] tracking-[0.22em] ${c.text} uppercase mb-1`}>Advantage</div>
                    <h3 className="font-sora font-bold text-white text-xl mb-2 leading-snug">{adv.title}</h3>
                    <p className={`font-medium text-sm ${c.text} mb-3 leading-snug`}>{adv.headline}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{adv.desc}</p>
                    <div className={`inline-flex items-start gap-2 text-xs px-3 py-2 rounded-lg ${c.tag} border ${c.border}`}>
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span className="leading-snug">{adv.proof}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="border-t border-white/[0.06] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Comparison</span>
            <h2 className="font-sora font-bold text-[clamp(28px,4vw,46px)] text-white mt-3">
              D&O vs. Typical Engineering Contractors
            </h2>
          </div>
          <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] bg-white/[0.03] px-6 py-3 border-b border-white/[0.08]">
              <span className="font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase">Capability / Factor</span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-amber-500 uppercase text-center w-20">D&O</span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase text-center w-24">Typical</span>
            </div>
            {comparisons.map((row, i) => (
              <div
                key={row.factor}
                className={`grid grid-cols-[1fr_auto_auto] px-6 py-4 items-center ${i % 2 === 0 ? '' : 'bg-white/[0.015]'} border-b border-white/[0.05] last:border-0`}
              >
                <span className="text-gray-300 text-sm">{row.factor}</span>
                <div className="w-20 flex justify-center">
                  {row.do
                    ? <CheckCircle2 className="w-5 h-5 text-amber-500" />
                    : <span className="w-5 h-5 flex items-center justify-center text-gray-700 text-lg">—</span>}
                </div>
                <div className="w-24 flex justify-center">
                  {row.typical
                    ? <CheckCircle2 className="w-5 h-5 text-gray-500" />
                    : <span className="w-5 h-5 flex items-center justify-center text-red-700 text-lg font-bold">✗</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Ready to Partner?</span>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-4 mb-5">
            Let's Build Something Extraordinary
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Whether you're an HNI with a dream build, a government agency with a critical requirement, or a studio that needs props that actually work — D&O is your team.
          </p>
          <motion.button
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors"
          >
            Start Your Project <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
