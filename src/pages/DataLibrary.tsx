import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Database, FileCode2, Lock, ShieldCheck, Search,
  ScanLine, ArrowRight, ChevronLeft, Filter, Star,
  FileCheck, Zap, CheckCircle2, AlertTriangle,
  ChevronDown, X, Send, Car, Cpu
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────── */
/*  Types                                                          */
/* ────────────────────────────────────────────────────────────── */
type DataFormat = 'STL' | 'STEP' | 'IGES' | 'OBJ' | 'CATIA' | 'SolidWorks';
type LicenseTier = 'Academic' | 'Commercial' | 'Enterprise' | 'Inquiry';
type Category = 'BMW' | 'Mercedes-Benz' | 'Porsche' | 'Performance' | 'Motorsport' | 'Custom';

interface ScanProduct {
  id: string;
  vehicle: string;
  year: string;
  category: Category;
  formats: DataFormat[];
  accuracy: string;
  fileSize: string;
  useCases: string[];
  license: LicenseTier;
  priceFrom: string;
  featured?: boolean;
  new?: boolean;
  restricted?: boolean;
  previewSrc?: string;
  scanPoints: string;
  coverage: string;
}

/* ────────────────────────────────────────────────────────────── */
/*  Data                                                           */
/* ────────────────────────────────────────────────────────────── */
const products: ScanProduct[] = [
  {
    id: 'bmw-e36-full',
    vehicle: 'BMW E36 M3 — Full Body Scan',
    year: '1997',
    category: 'BMW',
    formats: ['STL', 'STEP', 'IGES', 'OBJ'],
    accuracy: '±0.05 mm',
    fileSize: '2.4 GB',
    useCases: ['Aero kit fitment', 'Wide-body fabrication', 'CFD surface mesh', 'Reverse engineering', 'EV conversion base'],
    license: 'Commercial',
    priceFrom: '₹18,000',
    featured: true,
    scanPoints: '48M pts',
    coverage: '100%',
    previewSrc: '/images/scans/bmw-e36.jpg',
  },
  {
    id: 'bmw-e46-chassis',
    vehicle: 'BMW E46 330i — Chassis & Suspension',
    year: '2003',
    category: 'BMW',
    formats: ['STEP', 'IGES', 'SolidWorks'],
    accuracy: '±0.03 mm',
    fileSize: '860 MB',
    useCases: ['Suspension geometry study', 'Roll cage design', 'EV conversion platform', 'FEA input', 'Reverse engineering'],
    license: 'Commercial',
    priceFrom: '₹12,500',
    scanPoints: '22M pts',
    coverage: 'Chassis + Susp.',
    previewSrc: '/images/scans/bmw-e46.jpg',
  },
  {
    id: 'bmw-m5-e60',
    vehicle: 'BMW M5 E60 — Exterior Surface',
    year: '2008',
    category: 'BMW',
    formats: ['STL', 'OBJ', 'STEP'],
    accuracy: '±0.08 mm',
    fileSize: '1.7 GB',
    useCases: ['Body kit fitment', 'Wind tunnel model', 'EV conversion base', 'Replica build', 'Reverse engineering'],
    license: 'Commercial',
    priceFrom: '₹14,000',
    new: true,
    scanPoints: '36M pts',
    coverage: 'Full Exterior',
    previewSrc: '/images/scans/bmw-m5.jpg',
  },
  {
    id: 'mercedes-w204-full',
    vehicle: 'Mercedes-Benz C63 AMG (W204) — Full Scan',
    year: '2012',
    category: 'Mercedes-Benz',
    formats: ['STL', 'STEP', 'IGES', 'CATIA'],
    accuracy: '±0.05 mm',
    fileSize: '3.1 GB',
    useCases: ['Widebody kit', 'DTM-spec aero', 'Motorsport aero development', 'CFD study', 'Reverse engineering'],
    license: 'Commercial',
    priceFrom: '₹22,000',
    featured: true,
    scanPoints: '62M pts',
    coverage: '100%',
    previewSrc: '/images/scans/mercedes-c63.jpg',
  },
  {
    id: 'mercedes-g63',
    vehicle: 'Mercedes-Benz G63 AMG — Exterior',
    year: '2021',
    category: 'Mercedes-Benz',
    formats: ['STL', 'STEP', 'OBJ'],
    accuracy: '±0.06 mm',
    fileSize: '2.8 GB',
    useCases: ['Armour fitment', 'Custom bumpers', 'EV conversion study', 'Offroad mods', 'Reverse engineering'],
    license: 'Inquiry',
    priceFrom: 'On Inquiry',
    restricted: true,
    scanPoints: '55M pts',
    coverage: 'Full Exterior',
    previewSrc: '/images/scans/mercedes-g63.jpg',
  },
  {
    id: 'porsche-911-992',
    vehicle: 'Porsche 911 (992) GT3 — Full Scan',
    year: '2022',
    category: 'Porsche',
    formats: ['STL', 'STEP', 'IGES', 'CATIA'],
    accuracy: '±0.04 mm',
    fileSize: '2.9 GB',
    useCases: ['Race prep aero', 'GT3-spec fitment', 'CFD baseline', 'Motorsport aero development', 'Reverse engineering'],
    license: 'Enterprise',
    priceFrom: '₹35,000',
    featured: true,
    new: true,
    scanPoints: '71M pts',
    coverage: '100%',
    previewSrc: '/images/scans/porsche-911.jpg',
  },
  {
    id: 'porsche-cayman-gt4',
    vehicle: 'Porsche Cayman GT4 RS — Underbody',
    year: '2023',
    category: 'Porsche',
    formats: ['STEP', 'IGES'],
    accuracy: '±0.03 mm',
    fileSize: '640 MB',
    useCases: ['Diffuser design', 'Floor pan aero', 'Undertray fabrication'],
    license: 'Commercial',
    priceFrom: '₹16,000',
    scanPoints: '18M pts',
    coverage: 'Underbody',
    previewSrc: '/images/scans/porsche-cayman.jpg',
  },
  {
    id: 'lamborghini-huracan',
    vehicle: 'Lamborghini Huracán EVO — Full Scan',
    year: '2020',
    category: 'Performance',
    formats: ['STL', 'STEP', 'IGES', 'OBJ'],
    accuracy: '±0.05 mm',
    fileSize: '3.4 GB',
    useCases: ['Carbon aero bodywork', 'Film/TV props', 'Custom widebody', 'CFD simulation'],
    license: 'Inquiry',
    priceFrom: 'On Inquiry',
    featured: true,
    scanPoints: '78M pts',
    coverage: '100%',
    previewSrc: '/images/scans/lamborghini-huracan.jpg',
  },
  {
    id: 'ktm-rc390-race',
    vehicle: 'KTM RC 390 Cup — Race-Spec Full Scan',
    year: '2022',
    category: 'Motorsport',
    formats: ['STL', 'STEP', 'OBJ'],
    accuracy: '±0.04 mm',
    fileSize: '980 MB',
    useCases: ['FIM homologation', 'Bodywork moulding', 'Race kit design'],
    license: 'Commercial',
    priceFrom: '₹9,500',
    new: true,
    scanPoints: '24M pts',
    coverage: 'Full Bike',
    previewSrc: '/images/scans/ktm-rc390.jpg',
  },
  {
    id: 'formula-kart-chassis',
    vehicle: 'Formula 4 Chassis — Full Scan Package',
    year: '2021',
    category: 'Motorsport',
    formats: ['STEP', 'IGES', 'CATIA', 'SolidWorks'],
    accuracy: '±0.025 mm',
    fileSize: '1.2 GB',
    useCases: ['CFD aero package', 'FEA impact analysis', 'Safety cell design', 'Replica build'],
    license: 'Academic',
    priceFrom: '₹7,200',
    scanPoints: '31M pts',
    coverage: 'Full Chassis',
    previewSrc: '/images/scans/formula4.jpg',
  },
  {
    id: 'harley-davidson-fatboy',
    vehicle: 'Harley-Davidson Fat Boy — Exhaust Titanium',
    year: '2019',
    category: 'Custom',
    formats: ['STL', 'STEP', 'OBJ'],
    accuracy: '±0.07 mm',
    fileSize: '720 MB',
    useCases: ['Custom exhaust routing', 'Cafe racer conversion', 'Exhaust modification', 'Props'],
    license: 'Commercial',
    priceFrom: '₹8,500',
    scanPoints: '19M pts',
    coverage: 'Exhaust + Engine',
    previewSrc: '/images/scans/harley-fatboy.jpg',
  },
  {
    id: 'mustang-project',
    vehicle: 'Mustang project-chasis & suspension',
    year: '2021',
    category: 'Performance',
    formats: ['STEP', 'SolidWorks', 'IGES'],
    accuracy: '±0.06 mm',
    fileSize: '880 MB',
    useCases: ['Lift kit design', 'Rock slider fabrication', 'EV conversion platform', 'Cage geometry', 'Reverse engineering'],
    license: 'Commercial',
    priceFrom: '₹10,000',
    new: true,
    scanPoints: '26M pts',
    coverage: 'Chassis + Susp.',
    previewSrc: '/images/scans/mustang.jpg'
  },
];

const categories: { id: Category | 'All'; label: string; count: number }[] = [
  { id: 'All', label: 'All Datasets', count: products.length },
  { id: 'BMW', label: 'BMW Models', count: products.filter(p => p.category === 'BMW').length },
  { id: 'Mercedes-Benz', label: 'Mercedes-Benz Models', count: products.filter(p => p.category === 'Mercedes-Benz').length },
  { id: 'Porsche', label: 'Porsche Models', count: products.filter(p => p.category === 'Porsche').length },
  { id: 'Performance', label: 'Performance Vehicles', count: products.filter(p => p.category === 'Performance').length },
  { id: 'Motorsport', label: 'Motorsport Vehicles', count: products.filter(p => p.category === 'Motorsport').length },
  { id: 'Custom', label: 'Custom / Limited', count: products.filter(p => p.category === 'Custom').length },
];

const formatColors: Record<DataFormat, string> = {
  STL: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  STEP: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  IGES: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  OBJ: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  CATIA: 'bg-red-500/15 text-red-400 border-red-500/25',
  SolidWorks: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
};

const licenseColors: Record<LicenseTier, string> = {
  Academic: 'bg-teal-500/15 text-teal-400 border-teal-500/25',
  Commercial: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  Enterprise: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  Inquiry: 'bg-gray-500/15 text-gray-400 border-gray-500/25',
};


/* ────────────────────────────────────────────────────────────── */
/*  Sub-components                                                 */
/* ────────────────────────────────────────────────────────────── */
function ProductCard({ product, onInquire }: { product: ScanProduct; onInquire: (p: ScanProduct) => void }) {
  const c = licenseColors[product.license];
  // const isInquiry = product.license === 'Inquiry';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-300
        ${product.featured ? 'border-amber-500/30 bg-amber-500/[0.03]' : 'border-white/[0.08] bg-white/[0.02]'}
        hover:border-amber-500/40 hover:shadow-[0_0_40px_rgba(246,168,0,0.06)]`}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        {product.featured && (
          <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-amber-500 text-black font-bold tracking-wide">
            <Star className="w-2.5 h-2.5" /> FEATURED
          </span>
        )}
        {product.new && (
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500 text-black font-bold tracking-wide">NEW</span>
        )}
        {product.restricted && (
          <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-mono">
            <Lock className="w-2.5 h-2.5" /> RESTRICTED
          </span>
        )}
      </div>

      {/* Preview image placeholder */}
      <div className="relative h-48 bg-[#0D0E12] overflow-hidden">
        <img
          src={product.previewSrc}
          alt={product.vehicle}
          className="w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-[1.03] transition-all duration-700 select-none pointer-events-none"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
        />
        {/* Scan grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-15 group-hover:opacity-25 transition-opacity" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/40 to-transparent" />
        {/* Scan metrics overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <span className="font-mono text-[8px] tracking-[0.2em] text-amber-500/60 uppercase">Scan Resolution</span>
            <div className="font-sora font-bold text-white text-sm">{product.scanPoints}</div>
          </div>
          <div className="text-right">
            <span className="font-mono text-[8px] tracking-[0.2em] text-amber-500/60 uppercase">Coverage</span>
            <div className="font-sora font-bold text-white text-sm">{product.coverage}</div>
          </div>
        </div>
        {/* Scan lines animation */}
        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-px bg-amber-500/10 mb-6" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      <div className="p-5">
        {/* Category + License */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[8px] tracking-[0.22em] text-gray-600 uppercase">{product.category}</span>
          <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono ${c}`}>{product.license}</span>
        </div>

        {/* Title */}
        <h3 className="font-sora font-bold text-white text-[15px] leading-snug mb-1 group-hover:text-amber-400 transition-colors">
          {product.vehicle}
        </h3>
        <div className="font-mono text-xs text-gray-600 mb-4">{product.year} · {product.accuracy} accuracy · {product.fileSize}</div>

        {/* Formats */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.formats.map((f) => (
            <span key={f} className={`text-[10px] px-1.5 py-px rounded border font-mono ${formatColors[f]}`}>{f}</span>
          ))}
        </div>

        {/* Use cases */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {product.useCases.slice(0, 3).map((u) => (
            <span key={u} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-gray-500 border border-white/[0.06]">{u}</span>
          ))}
          {product.useCases.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-gray-600">+{product.useCases.length - 3} more</span>
          )}
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-white/[0.06]">
          <button
            onClick={() => onInquire(product)}
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-full bg-amber-500 hover:bg-amber-400 text-black transition-all hover:scale-105"
          >
            <Send className="w-3 h-3" /> Request Data
          </button>
        </div>
        {/* Email note */}
        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-gray-600 font-mono">
          <span className="w-1 h-1 rounded-full bg-amber-500/50 shrink-0" />
          Send requirements via email — data shared directly
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Inquiry / Request Modal                                        */
/* ────────────────────────────────────────────────────────────── */
function RequestModal({ product, onClose }: { product: ScanProduct | null; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[500] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          className="relative w-full max-w-lg bg-[#0D0E12] border border-white/[0.1] rounded-3xl overflow-hidden"
          initial={{ scale: 0.93, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.93, y: 20 }}
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)' }}
        >
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

          <div className="p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="font-mono text-[9px] tracking-[0.25em] text-amber-500 uppercase mb-1">
                  Request Scan Data
                </div>
                <h3 className="font-sora font-bold text-white text-lg leading-snug">{product.vehicle}</h3>
                <div className="text-gray-500 text-xs mt-1">{product.year} · {product.accuracy} · {product.formats.join(' / ')}</div>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono">
                  Data shared directly via email after verification
                </div>
              </div>
              <button onClick={onClose} className="text-gray-600 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.08] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <h4 className="font-sora font-bold text-white text-lg mb-2">Request Received</h4>
                <p className="text-gray-400 text-sm">Our team will review your requirements and send the scan data directly to your email within 24–48 hours, along with license documentation.</p>
                <button onClick={onClose} className="mt-5 px-6 py-2.5 text-sm font-bold bg-amber-500 text-black rounded-full hover:bg-amber-400 transition-colors">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">Full Name *</label>
                      <input required className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">Company / Institute *</label>
                      <input required className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="Organisation" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">Email *</label>
                    <input required type="email" className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">Intended Use Case *</label>
                    <select required className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors">
                      <option value="" className="bg-[#0D0E12]">Select use case</option>
                      <option className="bg-[#0D0E12]">Body Kit Development</option>
                      <option className="bg-[#0D0E12]">CFD Simulation</option>
                      <option className="bg-[#0D0E12]">Reverse Engineering</option>
                      <option className="bg-[#0D0E12]">Motorsport Aero Development</option>
                      <option className="bg-[#0D0E12]">EV Conversion</option>
                      <option className="bg-[#0D0E12]">FEA Structural Analysis</option>
                      <option className="bg-[#0D0E12]">Race Car Preparation</option>
                      <option className="bg-[#0D0E12]">Film / TV / Props</option>
                      <option className="bg-[#0D0E12]">Academic Research</option>
                      <option className="bg-[#0D0E12]">Defence / Government</option>
                      <option className="bg-[#0D0E12]">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">License Required</label>
                    <select className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors">
                      <option className="bg-[#0D0E12]">Academic (Non-commercial)</option>
                      <option className="bg-[#0D0E12]">Commercial (Single-project)</option>
                      <option className="bg-[#0D0E12]">Enterprise (Multi-project)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">Additional Notes</label>
                    <textarea rows={2} className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-amber-500/50 transition-colors resize-none" placeholder="Any specific requirements..." />
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/15 flex items-start gap-2.5">
                  <FileCheck className="w-4 h-4 text-amber-500/60 mt-0.5 shrink-0" />
                  <p className="text-gray-500 text-xs leading-relaxed">
                    D&O will share the data directly via email after reviewing your requirements. No files are available for direct download. Unauthorised redistribution is strictly prohibited.
                  </p>
                </div>

                <button type="submit" className="w-full mt-4 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Request to D&O
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Custom Scan Request Form                                       */
/* ────────────────────────────────────────────────────────────── */
function CustomScanForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="rounded-3xl border border-amber-500/20 bg-amber-500/[0.03] overflow-hidden">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      <div className="p-8 lg:p-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Bespoke Service</span>
          <h3 className="font-sora font-bold text-white text-[clamp(26px,3.5vw,40px)] leading-tight mt-3 mb-4">
            Need a Vehicle<br />
            <span className="text-gradient">We Don't Have?</span>
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            D&O operates a professional-grade structured-light and LiDAR scanning facility in Mumbai. If your vehicle isn't in our catalogue, we can scan it to your exact specification — from a single panel to a complete exterior and underbody capture.
          </p>
          <ul className="space-y-3">
            {[
              'Any vehicle — road car, race car, motorcycle, truck',
              'Turnaround: 3–10 business days depending on scope',
              'Deliverables in your chosen CAD format',
              'Full accuracy report and scan validation included',
              'NDA available on request',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h4 className="font-sora font-bold text-white text-xl mb-2">Request Sent!</h4>
            <p className="text-gray-400 text-sm">Our scanning team will contact you within 1 business day with a quote and feasibility assessment.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">Name *</label>
                <input required className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-amber-500/50" placeholder="Your name" />
              </div>
              <div>
                <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">Company</label>
                <input className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-amber-500/50" placeholder="Organisation" />
              </div>
            </div>
            <div>
              <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">Email *</label>
              <input required type="email" className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-amber-500/50" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">Vehicle Required *</label>
              <input required className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-amber-500/50" placeholder="e.g. Ferrari 488 GTB 2019 — Full exterior" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">Timeline</label>
                <select className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50">
                  <option className="bg-[#0D0E12]">ASAP (Rush)</option>
                  <option className="bg-[#0D0E12]">1–2 Weeks</option>
                  <option className="bg-[#0D0E12]">2–4 Weeks</option>
                  <option className="bg-[#0D0E12]">Flexible</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">Budget Range</label>
                <select className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50">
                  <option className="bg-[#0D0E12]">Under ₹10,000</option>
                  <option className="bg-[#0D0E12]">₹10,000 – ₹25,000</option>
                  <option className="bg-[#0D0E12]">₹25,000 – ₹50,000</option>
                  <option className="bg-[#0D0E12]">₹50,000+</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-mono text-[9px] tracking-[0.2em] text-gray-600 uppercase mb-1.5">Use Case *</label>
              <textarea required rows={2} className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-amber-500/50 resize-none" placeholder="Describe your application (aero development, FEA input, film, etc.)" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors flex items-center justify-center gap-2">
              <ScanLine className="w-4 h-4" /> Submit Scan Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Main page                                                      */
/* ────────────────────────────────────────────────────────────── */
export default function DataLibrary() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ScanProduct | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState<DataFormat[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.reveal-card').forEach((card) => {
        gsap.from(card, { y: 45, opacity: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%' } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = !searchQuery ||
      p.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.useCases.some(u => u.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFormats = selectedFormats.length === 0 || selectedFormats.some(f => p.formats.includes(f));
    return matchesCategory && matchesSearch && matchesFormats;
  });

  const toggleFormat = (f: DataFormat) => {
    setSelectedFormats(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const allFormats: DataFormat[] = ['STL', 'STEP', 'IGES', 'OBJ', 'CATIA', 'SolidWorks'];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0B0C0E] pt-28">

      {/* Modal */}
      {selectedProduct && (
        <RequestModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {/* Back */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-400 text-sm font-mono tracking-wide transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(246,168,0,0.08) 0%, transparent 65%)' }} />
        {/* Scan line decorations */}
        <div className="absolute top-20 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-amber-500/20 to-transparent pointer-events-none" />
        <div className="absolute top-32 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-amber-500/10 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-mono border border-amber-500/20">
                <Database className="w-3 h-3" /> DNO ENGINEERING DATA LIBRARY
              </span>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase mb-5">
              <span className="w-8 h-px bg-amber-500" /> Precision 3D Scan Data
            </span>
            <h1 className="font-sora font-bold text-[clamp(34px,5.5vw,68px)] text-white leading-[1.05] mb-5">
              Precision 3D Vehicle Scan Data for{' '}
              <span className="text-gradient">Advanced Engineering</span>{' '}
              Applications
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Browse D&O's library of high-accuracy structured-light and LiDAR scan data. Send us your vehicle requirement and use case — we will review and share the data directly with you via email.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono">
                No direct file download — data delivered via email after verification
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <motion.button
                onClick={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm"
              >
                Browse Catalogue <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('custom-scan')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 hover:border-amber-500/40 text-white font-medium rounded-full text-sm"
              >
                <ScanLine className="w-4 h-4 text-amber-500/60" /> Request Custom Scan
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-7 grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { val: `${products.length}+`, label: 'Datasets Available' },
            { val: '±0.03mm', label: 'Best-in-Class Accuracy' },
            { val: '6', label: 'Vehicle Categories' },
            { val: '4+', label: 'Export Formats' },
            { val: '24h', label: 'Avg. Fulfilment Time' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-sora font-bold text-xl text-amber-400">{s.val}</div>
              <div className="text-gray-500 text-[10px] font-mono tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">What's Included</span>
          <h2 className="font-sora font-bold text-[clamp(26px,4vw,46px)] text-white mt-3">Professional-Grade Scan Data</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: ScanLine, title: 'Raw Point Cloud', desc: 'Full resolution .pts/.e57 point cloud for maximum flexibility', color: 'amber' },
            { icon: FileCode2, title: 'CAD-Ready Surface', desc: 'Cleaned mesh in STL, STEP, IGES, OBJ, or native CAD formats', color: 'blue' },
            { icon: ShieldCheck, title: 'Accuracy Report', desc: 'Full deviation analysis and scan-to-reference validation data', color: 'green' },
            { icon: FileCheck, title: 'License Certificate', desc: 'Signed license document outlining permitted use cases and restrictions', color: 'purple' },
          ].map((item) => {
            const Icon = item.icon;
            const colorClasses = {
              amber: 'border-amber-500/25 bg-amber-500/[0.04] text-amber-400',
              blue: 'border-blue-500/25 bg-blue-500/[0.04] text-blue-400',
              green: 'border-emerald-500/25 bg-emerald-500/[0.04] text-emerald-400',
              purple: 'border-purple-500/25 bg-purple-500/[0.04] text-purple-400',
            }[item.color];
            return (
              <div key={item.title} className={`reveal-card p-5 rounded-2xl border ${colorClasses} hover:border-opacity-50 transition-all`}>
                <div className={`w-10 h-10 rounded-xl border ${colorClasses} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-semibold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Catalogue ── */}
      <section id="catalogue" className="border-t border-white/[0.06] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Data Catalogue</span>
              <h2 className="font-sora font-bold text-[clamp(26px,4vw,42px)] text-white mt-2">Browse Scan Datasets</h2>
            </div>
            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vehicle, use case..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-amber-500/40 transition-colors"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-black font-bold'
                    : 'bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.07]'
                }`}
              >
                {cat.label}
                <span className={`text-[10px] rounded-full px-1.5 py-px ${activeCategory === cat.id ? 'bg-black/20 text-black/70' : 'bg-white/[0.08] text-gray-600'}`}>
                  {cat.count}
                </span>
              </button>
            ))}

            {/* Format filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                showFilters || selectedFormats.length > 0
                  ? 'border-amber-500/40 text-amber-400 bg-amber-500/[0.06]'
                  : 'border-white/[0.07] text-gray-400 hover:text-white bg-white/[0.04]'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              Formats
              {selectedFormats.length > 0 && <span className="bg-amber-500 text-black text-[9px] px-1.5 rounded-full font-bold">{selectedFormats.length}</span>}
              <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Format filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-5"
              >
                <div className="p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] flex flex-wrap gap-2 items-center">
                  <span className="font-mono text-[9px] text-gray-600 tracking-[0.2em] uppercase mr-2">Format Filter:</span>
                  {allFormats.map((f) => (
                    <button
                      key={f}
                      onClick={() => toggleFormat(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        selectedFormats.includes(f)
                          ? formatColors[f] + ' font-bold'
                          : 'border-white/[0.08] text-gray-500 hover:text-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                  {selectedFormats.length > 0 && (
                    <button onClick={() => setSelectedFormats([])} className="ml-auto text-xs text-gray-600 hover:text-red-400 transition-colors flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> Clear
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count */}
          <div className="font-mono text-xs text-gray-600 mb-6">
            {filteredProducts.length} dataset{filteredProducts.length !== 1 ? 's' : ''} found
            {selectedFormats.length > 0 && ` · filtered by ${selectedFormats.join(', ')}`}
          </div>

          {/* Product grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Database className="w-10 h-10 text-gray-700 mx-auto mb-3" />
              <div className="text-gray-500">No datasets match your search criteria.</div>
              <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); setSelectedFormats([]); }} className="mt-4 text-amber-400 text-sm hover:text-amber-300">
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onInquire={setSelectedProduct} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="border-t border-white/[0.06] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Process</span>
            <h2 className="font-sora font-bold text-[clamp(26px,4vw,46px)] text-white mt-3">How to Access Data</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { n: '01', icon: Search, title: 'Browse & Select', desc: 'Find your vehicle from the catalogue. Filter by format, category, or search by name.' },
              { n: '02', icon: FileCheck, title: 'Submit Request', desc: 'Complete the access form with your vehicle requirement, use case, and contact details.' },
              { n: '03', icon: ShieldCheck, title: 'Verification', desc: 'Our team reviews your requirement and confirms the use case before preparing the data for delivery.' },
              { n: '04', icon: Send, title: 'Data via Email', desc: 'Approved scan data is shared securely via email. No public file hosting or direct downloads.' },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="reveal-card text-center p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-amber-500/25 transition-all group">
                  <div className="font-mono text-4xl font-bold text-amber-500/15 group-hover:text-amber-500/25 transition-colors mb-4">{step.n}</div>
                  <div className="w-10 h-10 rounded-xl border border-amber-500/25 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="font-sora font-semibold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Security & IP Notice ── */}
      <section className="border-t border-white/[0.06] py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="p-7 rounded-2xl border border-amber-500/20 bg-amber-500/[0.03]">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl border border-amber-500/25 bg-amber-500/[0.08] flex items-center justify-center">
                <Lock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-sora font-bold text-white text-lg mb-3">Data Security & Intellectual Property</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-400 leading-relaxed">
                  <ul className="space-y-2">
                    {[
                      'All downloads delivered via encrypted, time-limited links',
                      'Scan data watermarked with purchaser details at file level',
                      'License ID embedded in every file header',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-500/60 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2">
                    {[
                      'Redistribution or resale of scan data strictly prohibited',
                      'All use cases must match the declared license scope',
                      'D&O retains full IP ownership of all scan datasets',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-500/60 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Disclaimer ── */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.01] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600/70 mt-0.5 shrink-0" />
            <div className="text-gray-600 text-xs leading-relaxed">
              <span className="text-gray-500 font-medium">Technical Disclaimer: </span>
              All scan data is provided for engineering reference and fabrication guidance only. Dimensions should be independently verified before manufacturing. D&O makes no warranty of fitness for a particular purpose. Vehicle trademarks and model names belong to their respective manufacturers — scan data represents physical measurements of physical objects and does not imply endorsement by or affiliation with any vehicle manufacturer. Users are responsible for compliance with applicable regulations in their jurisdiction.
            </div>
          </div>
        </div>
      </section>

      {/* ── Custom Scan CTA ── */}
      <section id="custom-scan" className="border-t border-white/[0.06] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CustomScanForm />
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 lg:py-24 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Car className="w-8 h-8 text-amber-500/40" />
            <Cpu className="w-8 h-8 text-amber-500/40" />
            <Database className="w-8 h-8 text-amber-500/40" />
          </div>
          <h2 className="font-sora font-bold text-[clamp(28px,4vw,48px)] text-white mt-2 mb-5">
            The Precision Data Your Project Demands
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Whether you're developing a race-winning aero package or engineering a precision replica — D&O scan data is the foundation trusted by engineers across automotive, defence, and entertainment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm"
            >
              Browse Full Catalogue <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 hover:border-amber-500/40 text-white font-medium rounded-full text-sm"
            >
              Talk to Our Team <Zap className="w-4 h-4 text-amber-500/60" />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
