import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Clock, Tag, Search, BookOpen,
  Shield, Wrench, FlaskConical, Zap, Globe
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────── */
/*  Types & Data                                                   */
/* ────────────────────────────────────────────────────────────── */
type BlogCategory = 'All' | 'Defence' | 'Automotive' | 'Manufacturing' | 'Innovation' | 'Make in India';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  readTime: string;
  date: string;
  featured?: boolean;
  imageSrc?: string;
  author: string;
  authorRole: string;
}

const posts: BlogPost[] = [
  {
    id: '1',
    slug: 'indrajaal-ranger-development',
    title: 'Inside the Indrajaal Ranger: Engineering India\'s First Anti-Drone Vehicle',
    excerpt: 'A deep dive into the 18-month engineering journey that took the Indrajaal Ranger from initial concept through CAD, prototype, testing, and delivery to the Border Security Force at the 61st BSF Raising Day Parade.',
    category: 'Defence',
    tags: ['Anti-Drone', 'BSF', 'C-UAV', 'Make in India', 'Indigenous'],
    readTime: '9 min read',
    date: 'January 2025',
    featured: true,
    imageSrc: '/blog/indrajaal-development.jpg',
    author: 'Omkar Rane',
    authorRole: 'Chief Engineer, D&O',
  },
  {
    id: '2',
    slug: 'mingo-airboat-story',
    title: 'MINGO Airboat: How D&O Built India\'s First Indigenous Flood Rescue Platform',
    excerpt: 'The challenge of designing a shallow-water rescue vessel with no Indian precedent — how D&O\'s engineering team reverse-engineered the problem, selected the right propulsion system, and delivered to Maharashtra Government.',
    category: 'Make in India',
    tags: ['Airboat', 'Disaster Management', 'Maharashtra', 'Indigenous Design'],
    readTime: '7 min read',
    date: 'February 2025',
    featured: true,
    imageSrc: '/blog/mingo-story.jpg',
    author: 'D&O Engineering Team',
    authorRole: 'D&O Advanced Engineering',
  },
  {
    id: '3',
    slug: 'uhmwpe-composite-armour',
    title: 'UHMWPE vs Steel Armour: The Case for Composite Ballistic Protection',
    excerpt: 'Why ultra-high molecular weight polyethylene composites are replacing traditional steel armour in modern platforms — a technical comparison of weight, ballistic performance, and system integration challenges.',
    category: 'Defence',
    tags: ['UHMWPE', 'Composite Armour', 'Ballistic', 'Materials', 'Lightweight'],
    readTime: '6 min read',
    date: 'December 2024',
    imageSrc: '/blog/composite-armour.jpg',
    author: 'D&O Materials Lab',
    authorRole: 'Materials Engineering',
  },
  {
    id: '4',
    slug: 'fastest-bmw-buddh-international',
    title: 'Setting the Record: D&O\'s BMW Build That Beat Narain Kartikeyan at BIC',
    excerpt: 'The story behind the fastest BMW on record at Buddh International Circuit — the engineering decisions, power delivery tuning, suspension geometry, and the race day that put an Indian garage on the motorsport map.',
    category: 'Automotive',
    tags: ['BMW', 'Track Record', 'Buddh International', 'Motorsport', 'Tuning'],
    readTime: '8 min read',
    date: 'November 2024',
    imageSrc: '/blog/bmw-bic-record.jpg',
    author: 'Karan Shah',
    authorRole: 'KS Motorsport / D&O Partner',
  },
  {
    id: '5',
    slug: 'nhai-survey-vehicle-tech',
    title: 'LiDAR at 80 km/h: The Technology Behind NHAI\'s Road Survey Vehicles',
    excerpt: 'How D&O engineered a multi-sensor mobile mapping platform capable of high-speed pavement condition assessment — covering the sensor fusion, GNSS integration, and real-time data processing pipeline.',
    category: 'Manufacturing',
    tags: ['LiDAR', 'NHAI', 'Survey Vehicle', 'Mobile Mapping', 'Sensor Fusion'],
    readTime: '5 min read',
    date: 'October 2024',
    imageSrc: '/blog/nhai-lidar.jpg',
    author: 'D&O Engineering Team',
    authorRole: 'D&O Advanced Engineering',
  },
  {
    id: '6',
    slug: 'peek-vs-aluminium-defence',
    title: 'PEEK vs. Aluminium in Defence Applications: When Polymer Wins',
    excerpt: 'A materials engineering perspective on when PEEK outperforms aluminium alloys in weight-critical defence applications — covering specific strength, chemical resistance, and manufacturing considerations.',
    category: 'Innovation',
    tags: ['PEEK', 'Materials', 'Defence', 'Lightweight', 'Polymers'],
    readTime: '5 min read',
    date: 'September 2024',
    imageSrc: '/blog/peek-materials.jpg',
    author: 'D&O Materials Lab',
    authorRole: 'Materials Engineering',
  },
  {
    id: '7',
    slug: 'reverse-engineering-workflow',
    title: 'D&O\'s End-to-End Reverse Engineering Workflow: Scan to CAD to Part',
    excerpt: 'A step-by-step walkthrough of how D&O takes a physical component from structured-light scanning through point cloud processing, surface reconstruction, CAD modelling, and final manufactured part — in-house, zero hand-offs.',
    category: 'Manufacturing',
    tags: ['Reverse Engineering', '3D Scanning', 'CAD', 'SolidWorks', 'Workflow'],
    readTime: '7 min read',
    date: 'August 2024',
    imageSrc: '/blog/reverse-engineering.jpg',
    author: 'D&O Engineering Team',
    authorRole: 'D&O Advanced Engineering',
  },
  {
    id: '8',
    slug: 'make-in-india-defence-opportunity',
    title: 'Make in India: Why Private Engineering Firms Will Define India\'s Defence Future',
    excerpt: 'An analysis of the policy shifts, budget allocations, and technology gaps that have created an unprecedented opportunity for domestic engineering companies to build India\'s next generation of defence platforms.',
    category: 'Make in India',
    tags: ['Defence Policy', 'Make in India', 'DRDO', 'Private Defence', 'Indigenisation'],
    readTime: '6 min read',
    date: 'July 2024',
    imageSrc: '/blog/make-in-india.jpg',
    author: 'Omkar Rane',
    authorRole: 'Chief Engineer, D&O',
  },
  {
    id: '9',
    slug: 'cfd-aerodynamics-motorsport',
    title: 'CFD in Motorsport: How Simulation Replaced the Wind Tunnel for Small Teams',
    excerpt: 'How accessible computational fluid dynamics tools have democratised aerodynamic development — and how D&O applies CFD workflows to both motorsport builds and defence vehicle programmes.',
    category: 'Innovation',
    tags: ['CFD', 'Aerodynamics', 'Motorsport', 'Simulation', 'ANSYS'],
    readTime: '6 min read',
    date: 'June 2024',
    imageSrc: '/blog/cfd-aero.jpg',
    author: 'D&O Engineering Team',
    authorRole: 'D&O Advanced Engineering',
  },
  {
    id: '10',
    slug: 'titanium-exhaust-craft',
    title: 'The Craft of Custom Titanium Exhaust Systems: 800+ Units and What We Learned',
    excerpt: 'Over 800 custom exhaust systems later — what D&O\'s fabrication team has learned about titanium TIG welding, mandrel bending, acoustic tuning, and the tolerances that separate a great exhaust from a great-sounding exhaust.',
    category: 'Automotive',
    tags: ['Titanium', 'Exhaust', 'Fabrication', 'TIG Welding', 'Custom'],
    readTime: '5 min read',
    date: 'May 2024',
    imageSrc: '/blog/titanium-exhaust.jpg',
    author: 'Karan Shah',
    authorRole: 'KS Motorsport / D&O Partner',
  },
  {
    id: '11',
    slug: 'composite-armour-testing',
    title: 'Ballistic Testing in India: How D&O Validates Composite Armour Panels',
    excerpt: 'A technical overview of D&O\'s ballistic validation process — from witness plate setup and V50 testing methodology through documentation and certification, all conducted within India.',
    category: 'Defence',
    tags: ['Ballistic Testing', 'Composite Armour', 'V50', 'Certification', 'MIL-SPEC'],
    readTime: '8 min read',
    date: 'April 2024',
    imageSrc: '/blog/ballistic-testing.jpg',
    author: 'D&O Materials Lab',
    authorRole: 'Materials Engineering',
  },
  {
    id: '12',
    slug: 'mumbai-engineering-hub',
    title: 'Why Mumbai is Emerging as India\'s Advanced Engineering Hub',
    excerpt: 'The talent density, industrial supply chain, and policy environment that make Mumbai the unexpected centre of gravity for high-technology defence and automotive engineering firms.',
    category: 'Make in India',
    tags: ['Mumbai', 'Engineering Ecosystem', 'Make in India', 'Policy', 'Startup'],
    readTime: '4 min read',
    date: 'March 2024',
    imageSrc: '/blog/mumbai-engineering.jpg',
    author: 'Omkar Rane',
    authorRole: 'Chief Engineer, D&O',
  },
];

const categoryConfig: Record<BlogCategory, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  All: { icon: BookOpen, color: 'amber' },
  Defence: { icon: Shield, color: 'red' },
  Automotive: { icon: Zap, color: 'amber' },
  Manufacturing: { icon: Wrench, color: 'blue' },
  Innovation: { icon: FlaskConical, color: 'purple' },
  'Make in India': { icon: Globe, color: 'green' },
};

const categoryBadge: Record<BlogCategory, string> = {
  All: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  Defence: 'bg-red-500/15 text-red-400 border-red-500/25',
  Automotive: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  Manufacturing: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  Innovation: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  'Make in India': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
};

/* ────────────────────────────────────────────────────────────── */
/*  Post Card                                                      */
/* ────────────────────────────────────────────────────────────── */
function PostCard({ post, onRead }: { post: BlogPost; onRead: () => void }) {
  const badge = categoryBadge[post.category];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      onClick={onRead}
      className={`reveal-card group relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:border-amber-500/35 hover:shadow-[0_0_32px_rgba(246,168,0,0.05)]
        ${post.featured ? 'border-amber-500/25 bg-amber-500/[0.02]' : 'border-white/[0.08] bg-white/[0.02]'}`}
    >
      {post.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500 text-black font-bold tracking-wide">FEATURED</span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-44 bg-[#0D0E12] overflow-hidden">
        <img
          src={post.imageSrc}
          alt={post.title}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-[1.03] transition-all duration-700"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/40 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className={`text-[9px] px-2.5 py-1 rounded-full border font-mono ${badge}`}>{post.category}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3 text-gray-600 text-xs font-mono">
          <span>{post.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>

        <h3 className="font-sora font-bold text-white text-[15px] leading-snug mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-gray-600 border border-white/[0.06] flex items-center gap-1">
              <Tag className="w-2.5 h-2.5" /> {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          <div>
            <div className="text-gray-300 text-xs font-medium">{post.author}</div>
            <div className="text-gray-600 text-[10px] font-mono">{post.authorRole}</div>
          </div>
          <div className="inline-flex items-center gap-1 text-amber-400 text-xs font-medium group-hover:gap-2 transition-all">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Featured Post Hero Card                                        */
/* ────────────────────────────────────────────────────────────── */
function FeaturedHeroCard({ post }: { post: BlogPost }) {
  const badge = categoryBadge[post.category];
  return (
    <div className="group relative rounded-3xl border border-amber-500/25 bg-amber-500/[0.03] overflow-hidden cursor-pointer hover:border-amber-500/45 transition-all duration-300 hover:shadow-[0_0_48px_rgba(246,168,0,0.07)]">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image panel */}
        <div className="relative h-56 lg:h-auto min-h-[300px] bg-[#0D0E12] overflow-hidden">
          <img
            src={post.imageSrc}
            alt={post.title}
            className="w-full h-full object-cover opacity-45 group-hover:opacity-60 group-hover:scale-[1.03] transition-all duration-700"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B0C0E] lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] to-transparent lg:hidden" />
          <div className="absolute top-5 left-5 flex gap-2">
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500 text-black font-bold tracking-wide">FEATURED</span>
            <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono ${badge}`}>{post.category}</span>
          </div>
        </div>

        {/* Content panel */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4 text-gray-600 text-xs font-mono">
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
          </div>
          <h3 className="font-sora font-bold text-white text-[clamp(20px,3vw,28px)] leading-snug mb-4 group-hover:text-amber-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {post.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-gray-500 border border-white/[0.06] flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" /> {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-300 text-sm font-medium">{post.author}</div>
              <div className="text-gray-600 text-xs font-mono">{post.authorRole}</div>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-500/30 text-amber-400 text-sm font-medium group-hover:bg-amber-500/10 transition-all">
              Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  Main Blog Page                                                 */
/* ────────────────────────────────────────────────────────────── */
export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.reveal-card').forEach((card) => {
        gsap.from(card, { y: 40, opacity: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%' } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const featuredPosts = posts.filter(p => p.featured);
  const allCategories = (Object.keys(categoryConfig) as BlogCategory[]);

  const filteredPosts = posts.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Separate featured from regular for the grid (don't double-show featured)
  const gridPosts = activeCategory === 'All' && !searchQuery
    ? filteredPosts.filter(p => !p.featured)
    : filteredPosts;

  const showFeaturedHero = activeCategory === 'All' && !searchQuery;

  const comingSoonPosts = [
    'FEA-Guided Chassis Design for Off-Road Defence Vehicles',
    'The BSF Deployment: What We Learned from Field Testing',
    'Inside D&O Studio: Designing Movie Props That Actually Work',
    'Motorsport DNA: How Race Engineering Discipline Applies to Defence',
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0B0C0E] pt-28">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-25" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(246,168,0,0.07) 0%, transparent 65%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase mb-5">
              <span className="w-8 h-px bg-amber-500" /> Engineering Insights
            </span>
            <h1 className="font-sora font-bold text-[clamp(36px,5vw,64px)] text-white leading-[1.05] mb-5">
              The D&O<br />
              <span className="text-gradient">Engineering Blog</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Technical deep-dives, project case studies, and engineering perspectives from the team behind India's most ambitious indigenous platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-7 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: `${posts.length}+`, label: 'Articles Published' },
            { val: '5', label: 'Engineering Topics' },
            { val: '3', label: 'Expert Contributors' },
            { val: 'Monthly', label: 'Update Frequency' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-sora font-bold text-xl text-amber-400">{s.val}</div>
              <div className="text-gray-500 text-[10px] font-mono tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Posts ── */}
      {showFeaturedHero && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <div className="mb-8">
            <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Featured Articles</span>
          </div>
          <div className="space-y-5">
            {featuredPosts.map((post) => (
              <FeaturedHeroCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ── All Posts with filter ── */}
      <section className={`border-t border-white/[0.06] py-14 lg:py-20 ${showFeaturedHero ? '' : 'pt-14'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">
                {showFeaturedHero ? 'All Articles' : 'Filtered Results'}
              </span>
            </div>
            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-amber-500/40 transition-colors"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-2 flex-wrap mb-8">
            {allCategories.map((cat) => {
              const cfg = categoryConfig[cat];
              const Icon = cfg.icon;
              const count = cat === 'All' ? posts.length : posts.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.07]'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {cat}
                  <span className={`text-[10px] rounded-full px-1.5 py-px ${activeCategory === cat ? 'bg-black/20 text-black/70' : 'bg-white/[0.08] text-gray-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results info */}
          <div className="font-mono text-xs text-gray-600 mb-6">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && ` in ${activeCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>

          {/* Grid */}
          {gridPosts.length === 0 && !showFeaturedHero ? (
            <div className="text-center py-20">
              <BookOpen className="w-10 h-10 text-gray-700 mx-auto mb-3" />
              <div className="text-gray-500">No articles match your search.</div>
              <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="mt-4 text-amber-400 text-sm hover:text-amber-300">
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {gridPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onRead={() => {/* navigate to individual post — coming soon */}}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Coming Soon ── */}
      <section className="border-t border-white/[0.06] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Coming Soon</span>
            <h2 className="font-sora font-bold text-[clamp(24px,3.5vw,40px)] text-white mt-3">Next on the Blog</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {comingSoonPosts.map((title, i) => (
              <div key={i} className="reveal-card p-5 rounded-2xl border border-white/[0.06] bg-white/[0.015] flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg border border-amber-500/20 bg-amber-500/[0.05] flex items-center justify-center shrink-0">
                  <span className="font-mono text-amber-500/60 text-xs">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <div className="text-gray-300 text-sm font-medium leading-snug">{title}</div>
                  <div className="text-gray-700 text-xs font-mono mt-1">— Publishing soon</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter / Subscribe CTA ── */}
      <section className="border-t border-white/[0.06] py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="rounded-3xl border border-amber-500/20 bg-amber-500/[0.03] p-8 lg:p-12 text-center overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="relative">
              <span className="font-mono text-[10px] tracking-[0.28em] text-amber-500 uppercase">Stay Updated</span>
              <h2 className="font-sora font-bold text-[clamp(24px,4vw,40px)] text-white mt-3 mb-4">
                Engineering Insights, Direct to Your Inbox
              </h2>
              <p className="text-gray-400 max-w-md mx-auto mb-7">
                Receive D&O's latest technical articles, project announcements, and engineering case studies — no noise, only substance.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-white/[0.06] border border-white/[0.1] rounded-full text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm transition-colors whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-14 lg:py-20 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <BookOpen className="w-10 h-10 text-amber-500/40 mx-auto mb-5" />
          <h2 className="font-sora font-bold text-[clamp(26px,4vw,44px)] text-white mt-4 mb-5">
            Want to Work with the Team Behind These Projects?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Every article here represents real engineering work — platforms delivered, records broken, government programs executed. If your project demands the same depth, let's talk.
          </p>
          <motion.button
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(246,168,0,0.35)' }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full text-sm"
          >
            Start a Project Conversation <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
