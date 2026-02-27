import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ChevronDown, Shield, Cpu, Cog, Layers, FlaskConical, BarChart2, ArrowUpRight } from "lucide-react"

interface Navbar1Props {
  logoSrc?: string;
}

type NavChild = {
  label: string;
  href: string;
  desc?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Company Overview", href: "/about", desc: "Vision, mission & leadership" },
      { label: "Why Choose D&O", href: "/why-do", desc: "Our competitive advantages" },
      { label: "Government Collaborations", href: "/govt-collaborations", desc: "Maharashtra, NHAI, Indian Army" },
    ],
  },
  {
    label: "Capabilities",
    href: "#capabilities",
    children: [
      { label: "Automotive & Mobility", href: "/automotive", icon: Cpu, desc: "High-performance vehicle engineering" },
      { label: "Defence & Strategic", href: "/defence", icon: Shield, desc: "Anti-drone & indigenous platforms" },
      { label: "Advanced Manufacturing", href: "/manufacturing", icon: Cog, desc: "Reverse engineering & fabrication" },
      { label: "Materials & Innovation", href: "/materials", icon: Layers, desc: "PEEK, composites & cutting-edge R&D" },
      { label: "Computational Analysis", href: "/analysis", icon: BarChart2, desc: "CFD, FEA & multi-physics modeling" },
      { label: "Quality Assurance", href: "/quality", icon: FlaskConical, desc: "Rigorous testing & certification" },
    ],
  },
  {
    label: "Projects",
    href: "#projects",
    children: [
      { label: "Indrajaal Ranger", href: "/projects/indrajaal-ranger", desc: "India's first anti-drone vehicle" },
      { label: "MINGO Airboat", href: "/projects/mingo-airboat", desc: "Flagship disaster management platform" },
      { label: "NHAI Survey Vehicles", href: "/projects/nhai-vehicles", desc: "Highway inspection systems" },
      { label: "Automotive Projects", href: "/projects/automotive", desc: "Custom fab, tuning & drift builds" },
      { label: "Defence Projects", href: "/projects/defence", desc: "Composite armor & classified systems" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const Navbar1 = ({ logoSrc = "/do-logo.png" }: Navbar1Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setIsOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
    setMobileExpanded(null)
  }, [location.pathname])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    setActiveDropdown(null)

    if (href.startsWith('#')) {
      // Hash link — scroll to section on homepage
      if (location.pathname !== '/') {
        navigate('/')
        // Wait for homepage to mount then scroll
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        }, 400)
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // ✅ Use React Router navigate — no full page reload
      navigate(href)
    }
  }

  const openDD = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(label)
  }

  const closeDD = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 130)
  }

  // Determine if a nav item is currently active
  const isActive = (item: NavItem) => {
    if (item.href === '/') return location.pathname === '/'
    if (item.href.startsWith('#')) return location.pathname === '/'
    return location.pathname.startsWith(item.href)
  }

  return (
    <>
      {/* ── Pill Navbar ─────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-[300] flex justify-center w-full pt-4 px-4">
        <motion.div
          className={`flex items-center justify-between px-6 py-3 rounded-full w-full max-w-5xl transition-all duration-500 ${
            isScrolled
              ? 'bg-[#0B0C0E]/96 backdrop-blur-xl border border-amber-500/20 shadow-[0_8px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(246,168,0,0.06)]'
              : 'bg-[#0B0C0E]/72 backdrop-blur-lg border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ✅ Logo — uses navigate('/') for SPA routing, no page reload */}
          <div
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={() => handleNavClick("/")}
            role="button"
            aria-label="Go to homepage"
          >
            <motion.img
              src={logoSrc}
              alt="D&O Advanced Engineering"
              className="w-9 h-9 object-contain"
              whileHover={{ scale: 1.08 }}
              onError={(e) => {
                // Fallback if logo not found
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-sora font-bold text-white text-sm tracking-tight">D&O</span>
              <span className="font-mono text-[8px] tracking-[0.22em] text-amber-500/70 uppercase">Advanced Engineering</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && openDD(item.label)}
                onMouseLeave={() => item.children && closeDD()}
              >
                <button
                  onClick={() => !item.children && handleNavClick(item.href)}
                  className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive(item) && !item.children
                      ? 'text-amber-400 bg-amber-500/10'
                      : activeDropdown === item.label
                      ? 'text-amber-400 bg-amber-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180 text-amber-400' : 'text-gray-600'}`} />
                  )}
                </button>

                {/* ── Dropdown ─────────────────────────────────────────── */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-[#0D0E12] border border-white/[0.08] rounded-2xl overflow-hidden"
                      style={{
                        minWidth: item.children.length > 3 ? '500px' : '270px',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)',
                      }}
                      onMouseEnter={() => openDD(item.label)}
                      onMouseLeave={closeDD}
                    >
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

                      <div className={`p-2.5 ${item.children.length > 3 ? 'grid grid-cols-2 gap-0.5' : 'flex flex-col gap-0.5'}`}>
                        {item.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => handleNavClick(child.href)}
                            className={`group flex items-start gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 ${
                              location.pathname === child.href
                                ? 'bg-amber-500/10 border border-amber-500/15'
                                : 'hover:bg-white/[0.06]'
                            }`}
                          >
                            {child.icon ? (
                              <div className="mt-0.5 w-7 h-7 rounded-lg bg-amber-500/[0.08] border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:bg-amber-500/15 group-hover:border-amber-500/35 transition-all duration-200">
                                <child.icon className="w-3.5 h-3.5 text-amber-500/60 group-hover:text-amber-400 transition-colors" />
                              </div>
                            ) : (
                              <div className="mt-1 w-4 h-4 flex items-center justify-center shrink-0">
                                <ArrowUpRight className="w-3.5 h-3.5 text-amber-500/35 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className={`text-sm font-medium transition-colors leading-snug ${location.pathname === child.href ? 'text-amber-400' : 'text-gray-200 group-hover:text-white'}`}>
                                {child.label}
                              </div>
                              {child.desc && (
                                <div className="text-xs text-gray-600 group-hover:text-gray-500 mt-0.5 leading-snug transition-colors">
                                  {child.desc}
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="px-5 py-2.5 flex items-center justify-between border-t border-white/[0.05] bg-white/[0.015]">
                        <span className="font-mono text-[9px] text-gray-700 tracking-[0.2em] uppercase">D&O Advanced Engineering</span>
                        <span className="font-mono text-[9px] text-amber-500/40 tracking-[0.15em] uppercase">Proudly Made in India 🇮🇳</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <motion.button
              className="hidden lg:inline-flex items-center justify-center relative overflow-hidden px-5 py-2.5 text-sm font-bold text-black bg-amber-500 hover:bg-amber-400 rounded-full transition-colors duration-200"
              whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(246,168,0,0.4)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleNavClick("/contact")}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-500 pointer-events-none" />
              Get Started
            </motion.button>

            <motion.button
              className="lg:hidden text-gray-300 hover:text-white p-2 rounded-xl hover:bg-white/[0.08] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.92 }}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile Drawer ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[390] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              className="fixed top-0 right-0 bottom-0 w-full max-w-[340px] z-[400] lg:hidden flex flex-col overflow-hidden"
              style={{
                background: '#0D0E12',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.8)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handleNavClick("/")}
                >
                  <img src={logoSrc} alt="D&O" className="w-8 h-8 object-contain" />
                  <div className="flex flex-col leading-none">
                    <span className="font-sora font-bold text-white text-sm">D&O</span>
                    <span className="font-mono text-[7px] text-amber-500/60 tracking-[0.2em] uppercase">Advanced Engineering</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.08] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="h-[1px] bg-gradient-to-r from-amber-500/60 via-amber-500/20 to-transparent" />

              <div className="flex-1 overflow-y-auto py-3 px-3">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045 + 0.04 }}
                  >
                    {!item.children ? (
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={`w-full text-left px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 mb-0.5 ${
                          isActive(item)
                            ? 'text-amber-400 bg-amber-500/10'
                            : 'text-white hover:bg-white/[0.05]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <div className="mb-0.5">
                        <button
                          onClick={() => setMobileExpanded(prev => prev === item.label ? null : item.label)}
                          className={`w-full flex items-center justify-between px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${
                            mobileExpanded === item.label ? 'text-amber-400 bg-amber-500/[0.08]' : 'text-white hover:bg-white/[0.05]'
                          }`}
                        >
                          {item.label}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${mobileExpanded === item.label ? 'rotate-180 text-amber-400' : 'text-gray-600'}`} />
                        </button>

                        <AnimatePresence>
                          {mobileExpanded === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 mt-1 mb-2 pl-3 border-l border-amber-500/20 space-y-0.5">
                                {item.children.map((child) => (
                                  <button
                                    key={child.label}
                                    onClick={() => handleNavClick(child.href)}
                                    className={`w-full text-left flex items-start gap-2.5 px-3 py-2.5 rounded-xl transition-colors group ${
                                      location.pathname === child.href
                                        ? 'bg-amber-500/10'
                                        : 'hover:bg-white/[0.05]'
                                    }`}
                                  >
                                    {child.icon
                                      ? <child.icon className="w-3.5 h-3.5 text-amber-500/50 mt-0.5 shrink-0 group-hover:text-amber-400 transition-colors" />
                                      : <ArrowUpRight className="w-3.5 h-3.5 text-amber-500/30 mt-0.5 shrink-0 group-hover:text-amber-400 transition-colors" />
                                    }
                                    <div>
                                      <div className={`text-sm font-medium transition-colors ${location.pathname === child.href ? 'text-amber-400' : 'text-gray-300 group-hover:text-white'}`}>
                                        {child.label}
                                      </div>
                                      {child.desc && <div className="text-xs text-gray-600 mt-0.5">{child.desc}</div>}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="px-4 py-5 border-t border-white/[0.07]" style={{ background: '#0B0C0E' }}>
                <button
                  onClick={() => handleNavClick("/contact")}
                  className="w-full py-3.5 text-sm font-bold text-black bg-amber-500 hover:bg-amber-400 rounded-full transition-colors duration-200"
                >
                  Get Started
                </button>
                <p className="text-center font-mono text-[9px] text-gray-700 tracking-[0.28em] uppercase mt-3">
                  Engineering the Future, Together
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export { Navbar1 }