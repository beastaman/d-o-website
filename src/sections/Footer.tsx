import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail, Phone, MapPin, Linkedin, Instagram, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  company: [
    { label: 'About D&O', href: '/about' },
    { label: 'Why Choose D&O', href: '/why-do' },
    { label: 'Government Collaborations', href: '/govt-collaborations' },
    { label: 'Quality Assurance', href: '/quality' },
    { label: 'Continuous Innovation', href: '/innovation' },
  ],
  capabilities: [
    { label: 'Engineering Capabilities', href: '/capabilities' },
    { label: 'Automotive & Mobility', href: '/automotive' },
    { label: 'Defence & Strategic', href: '/defence' },
    { label: 'Advanced Manufacturing', href: '/manufacturing' },
    { label: 'Materials & Innovation', href: '/materials' },
  ],
  projects: [
    { label: 'Indrajaal Ranger', href: '/projects/indrajaal-ranger' },
    { label: 'MINGO Airboat', href: '/projects/mingo-airboat' },
    { label: 'NHAI Survey Vehicles', href: '/projects/nhai-vehicles' },
    { label: 'Automotive Projects', href: '/projects/automotive' },
    { label: 'Defence Projects', href: '/projects/defence' },
  ],
};

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/united-motorsports-academy/',
    icon: Linkedin,
    handle: 'United Motorsports Academy',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/unitedmotorsportsacademy',
    icon: Instagram,
    handle: '@unitedmotorsportsacademy',
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
        }
      );
      gsap.fromTo(
        columnsRef.current?.querySelectorAll('.footer-col') ?? [],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.6,
          scrollTrigger: { trigger: footerRef.current, start: 'top 70%' },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#070809] border-t border-white/5 overflow-hidden"
    >
      {/* Ambient glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[80px] bg-amber-500/5 blur-3xl rounded-full" />

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(246,168,0,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(246,168,0,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">

        {/* Top: Brand + CTA */}
        <div ref={logoRef} className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16 pb-12 border-b border-white/8">
          {/* Brand block */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full" />
                <img
                  src="/do-logo.png"
                  alt="D&O Advanced Engineering"
                  className="relative w-14 h-14 object-contain"
                />
              </div>
              <div>
                <div className="font-sora font-bold text-white text-xl tracking-tight">D&O</div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-amber-500/80 uppercase">Advanced Engineering</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-light">
              Indigenous engineering excellence for defence, mobility & advanced manufacturing. Proudly made in India.
            </p>
            {/* Parent company */}
            <a
              href="https://www.unitedmotorsportsacademy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs text-gray-500 hover:text-amber-400 transition-colors duration-300"
            >
              <span className="font-mono tracking-widest uppercase">A unit of</span>
              <span className="font-sora font-semibold text-gray-300 group-hover:text-amber-400 transition-colors">United Motorsports Academy</span>
              <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* CTA + Tagline */}
          <div className="flex flex-col items-start lg:items-end gap-4">
            <blockquote className="font-sora text-lg lg:text-2xl text-white/60 italic text-left lg:text-right">
              "Engineering the Future,<br />
              <span className="text-amber-500">Together.</span>"
            </blockquote>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(246,168,0,0.4)]"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Middle: Nav Columns */}
        <div ref={columnsRef} className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Company */}
          <div className="footer-col col-span-2 md:col-span-1">
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-amber-500 uppercase mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-light text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div className="footer-col col-span-2 md:col-span-1">
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-amber-500 uppercase mb-5">Capabilities</h4>
            <ul className="space-y-3">
              {footerLinks.capabilities.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-light text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="footer-col col-span-2 md:col-span-1">
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-amber-500 uppercase mb-5">Projects</h4>
            <ul className="space-y-3">
              {footerLinks.projects.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-light text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Socials */}
          <div className="footer-col col-span-2 md:col-span-1">
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-amber-500 uppercase mb-5">Connect</h4>
            <div className="space-y-4 mb-6">
              <a
                href="mailto:info@dnomotorsports.com"
                className="flex items-start gap-3 group"
              >
                <Mail className="w-4 h-4 text-amber-500/60 mt-0.5 shrink-0 group-hover:text-amber-500 transition-colors" />
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors break-all">info@dnomotorsports.com</span>
              </a>
              <a
                href="tel:+919820154567"
                className="flex items-center gap-3 group"
              >
                <Phone className="w-4 h-4 text-amber-500/60 shrink-0 group-hover:text-amber-500 transition-colors" />
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">+91 98201 54567</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500/60 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">Pune, Maharashtra, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all duration-300">
                    <social.icon className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-300 group-hover:text-amber-400 transition-colors font-medium">{social.label}</div>
                    <div className="text-[10px] text-gray-600">{social.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div ref={bottomRef} className="pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Parent company badge */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.unitedmotorsportsacademy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-amber-500/20 rounded-full transition-all duration-300"
              >
                <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase">Part of</span>
                <span className="text-xs font-semibold text-gray-300 group-hover:text-amber-400 transition-colors">UMA</span>
                <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-amber-500 transition-colors" />
              </a>
            </div>

            <p className="text-xs text-gray-600 font-mono">
              © {new Date().getFullYear()} D&O Advanced Engineering. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <button
                onClick={() => handleNavClick('#')}
                className="text-xs text-gray-600 hover:text-amber-400 transition-colors font-mono tracking-wider uppercase"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNavClick('#')}
                className="text-xs text-gray-600 hover:text-amber-400 transition-colors font-mono tracking-wider uppercase"
              >
                Terms
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group flex items-center gap-1.5 text-xs text-gray-600 hover:text-amber-400 transition-colors font-mono tracking-wider uppercase"
              >
                Back to Top
                <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Make in India */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-700 tracking-[0.3em] uppercase">
              <span className="w-8 h-[1px] bg-gray-700" />
              Proudly Made in India
              <span className="text-orange-600">🇮🇳</span>
              <span className="w-8 h-[1px] bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}