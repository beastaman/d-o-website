import { motion } from 'motion/react';

// ── Official brand SVG glyphs (Simple Icons paths) ────────────────────────────
const InstagramSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const WhatsAppSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const CallSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
  </svg>
);

const YouTubeSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
  </svg>
);

const socialButtons = [
  {
    name: 'Instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/d.o.motorsports',
    Icon: InstagramSVG,
    bg: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    shadow: 'shadow-[0_4px_14px_rgba(221,42,123,0.45)]',
  },
  {
    name: 'WhatsApp',
    label: 'WhatsApp',
    href: 'https://wa.me/919820154567',
    Icon: WhatsAppSVG,
    bg: 'bg-[#25D366]',
    shadow: 'shadow-[0_4px_14px_rgba(37,211,102,0.4)]',
  },
  {
    name: 'Call',
    label: 'Call Us',
    href: 'tel:+919820154567',
    Icon: CallSVG,
    bg: 'bg-[#0A84FF]',
    shadow: 'shadow-[0_4px_14px_rgba(10,132,255,0.4)]',
  },
  {
    name: 'YouTube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@unitedmotorsportsacademy',
    Icon: YouTubeSVG,
    bg: 'bg-[#FF0000]',
    shadow: 'shadow-[0_4px_14px_rgba(255,0,0,0.4)]',
  },
];

// Split into left pair and right pair (chat FAB occupies the center slot)
const leftButtons = socialButtons.slice(0, 2);
const rightButtons = socialButtons.slice(2, 4);

export default function SocialSticky() {
  return (
    <>
      {/* ══════════════════════════════════════════
          DESKTOP: left-side vertical stack
      ══════════════════════════════════════════ */}
      <div className="hidden sm:flex fixed left-3 top-1/2 -translate-y-1/2 z-[300] flex-col gap-3">
        {socialButtons.map((b, i) => {
          const Icon = b.Icon;
          return (
            <motion.a
              key={b.name}
              href={b.href}
              target={b.href.startsWith('http') ? '_blank' : undefined}
              rel={b.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={b.name}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
              whileHover={{ scale: 1.12, x: 4 }}
              whileTap={{ scale: 0.92 }}
              className={`group relative w-11 h-11 lg:w-12 lg:h-12 rounded-full ${b.bg} ${b.shadow} text-white flex items-center justify-center ring-1 ring-white/15 hover:ring-white/40 transition-all`}
            >
              <Icon />
              <span className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-[#13141c] border border-white/10 text-[11px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                {b.label}
              </span>
            </motion.a>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════
          MOBILE: full-width bottom bar
          Layout: [IG] [WA] [── chat FAB gap ──] [Call] [YT]
          Chat FAB (from AIChat.tsx) sits in the center gap
      ══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.35, ease: 'easeOut' }}
        className="sm:hidden fixed bottom-0 inset-x-0 z-[350] flex items-center justify-between px-3 rounded-t-[28px]"
        style={{
          height: '66px',
          background: 'linear-gradient(to top, #0a0b0e, #111218)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderLeft: '1px solid rgba(255,255,255,0.05)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.6)',
        }}
      >
        {/* Left pair */}
        <div className="flex items-center gap-1">
          {leftButtons.map((b) => {
            const Icon = b.Icon;
            return (
              <a
                key={b.name}
                href={b.href}
                target={b.href.startsWith('http') ? '_blank' : undefined}
                rel={b.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={b.name}
                className="flex flex-col items-center gap-0.5 px-3 py-1 active:scale-90 transition-transform"
              >
                <div className={`w-9 h-9 rounded-full ${b.bg} text-white flex items-center justify-center ${b.shadow}`}>
                  <Icon />
                </div>
                <span className="text-[9px] font-mono text-gray-400 tracking-wide">{b.label}</span>
              </a>
            );
          })}
        </div>

        {/* Center gap — Chat FAB from AIChat.tsx sits here via absolute positioning */}
        <div className="w-16" />

        {/* Right pair */}
        <div className="flex items-center gap-1">
          {rightButtons.map((b) => {
            const Icon = b.Icon;
            return (
              <a
                key={b.name}
                href={b.href}
                target={b.href.startsWith('http') ? '_blank' : undefined}
                rel={b.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={b.name}
                className="flex flex-col items-center gap-0.5 px-3 py-1 active:scale-90 transition-transform"
              >
                <div className={`w-9 h-9 rounded-full ${b.bg} text-white flex items-center justify-center ${b.shadow}`}>
                  <Icon />
                </div>
                <span className="text-[9px] font-mono text-gray-400 tracking-wide">{b.label}</span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
