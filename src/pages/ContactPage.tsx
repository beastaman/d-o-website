import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, Instagram, ArrowRight, ExternalLink, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const inquiryTypes = [
  'Project Collaboration',
  'Defence Partnership',
  'Manufacturing Inquiry',
  'Government Program',
  'Career / Internship',
  'General Inquiry',
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 }
      );
      gsap.fromTo(infoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(formRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1600));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E]">
      {/* Navbar spacer */}
      <div className="h-28" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <div ref={heroRef} className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-gray-500 mb-8">
            <span>D&O</span><ChevronRight className="w-3 h-3" /><span className="text-amber-500">Contact</span>
          </div>
          <h1 className="font-sora font-black text-[clamp(40px,7vw,96px)] text-white leading-[1.0] mb-4">
            LET'S<br /><span className="text-amber-400">TALK.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-lg mx-auto">
            Tell us what you're building. We respond within 2 business days.
          </p>
        </div>

        {/* ── Two-column layout ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 items-start">
          {/* ── Left: Info ──────────────────────────────────────────────── */}
          <div ref={infoRef} className="space-y-10">
            {/* Contact details */}
            <div className="space-y-5">
              <h3 className="font-sora font-semibold text-white text-xl">Contact Details</h3>
              <a href="mailto:info@dnomotorsports.com"
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-1">Email</div>
                  <div className="text-gray-300 group-hover:text-amber-400 transition-colors">info@dnomotorsports.com</div>
                </div>
              </a>

              <a href="tel:+919820154567" className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-1">Phone</div>
                  <div className="text-gray-300 group-hover:text-amber-400 transition-colors">+91 98201 54567</div>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-1">Location</div>
                  <div className="text-gray-300">Pune, Maharashtra,<br />India 🇮🇳</div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gradient-to-r from-amber-500/20 to-transparent" />

            {/* Social links */}
            <div className="space-y-4">
              <h4 className="font-sora font-medium text-white">Follow Us</h4>
              <a href="https://www.linkedin.com/company/united-motorsports-academy/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all">
                  <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                </div>
                <div>
                  <div className="text-sm text-gray-300 group-hover:text-white transition-colors">LinkedIn</div>
                  <div className="text-xs text-gray-600">United Motorsports Academy</div>
                </div>
                <ExternalLink className="w-3 h-3 text-gray-700 ml-auto group-hover:text-amber-500 transition-colors" />
              </a>

              <a href="https://www.instagram.com/unitedmotorsportsacademy" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all">
                  <Instagram className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                </div>
                <div>
                  <div className="text-sm text-gray-300 group-hover:text-white transition-colors">Instagram</div>
                  <div className="text-xs text-gray-600">@unitedmotorsportsacademy</div>
                </div>
                <ExternalLink className="w-3 h-3 text-gray-700 ml-auto group-hover:text-amber-500 transition-colors" />
              </a>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gradient-to-r from-amber-500/20 to-transparent" />

            {/* Parent company */}
            <a
              href="https://www.unitedmotorsportsacademy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-4 bg-white/[0.03] border border-white/8 rounded-xl hover:border-amber-500/20 transition-all"
            >
              <div className="flex-1">
                <div className="font-mono text-[9px] text-gray-600 tracking-[0.25em] uppercase mb-1">Parent Company</div>
                <div className="font-sora font-semibold text-white group-hover:text-amber-400 transition-colors">United Motorsports Academy</div>
                <div className="text-xs text-gray-500 mt-0.5">unitedmotorsportsacademy.com</div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors shrink-0" />
            </a>
          </div>

          {/* ── Right: Form ──────────────────────────────────────────────── */}
          <div
            ref={formRef}
            className="relative bg-[#0D0E12] border border-white/8 rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
          >
            {/* Amber top accent */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            <div className="p-8 lg:p-10">
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-9 h-9 text-amber-500" />
                  </div>
                  <h3 className="font-sora font-bold text-2xl text-white mb-3">Message Received</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">We'll review your inquiry and respond within 2 business days.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-sm text-amber-500 hover:text-amber-400 transition-colors font-mono tracking-widest uppercase"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-sora font-bold text-xl text-white mb-2">Send a Message</h3>
                  <p className="text-gray-500 text-sm mb-8">All fields marked with * are required.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          placeholder="Your full name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-amber-500/40 focus:bg-amber-500/[0.03] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          placeholder="your@email.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-amber-500/40 focus:bg-amber-500/[0.03] transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">Organization</label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Company / Ministry / Institution"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-amber-500/40 focus:bg-amber-500/[0.03] transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">Inquiry Type</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500/40 transition-all appearance-none cursor-pointer"
                        style={{ color: formData.inquiryType ? 'white' : '#4B5563' }}
                      >
                        <option value="" disabled>Select inquiry type</option>
                        {inquiryTypes.map((t) => (
                          <option key={t} value={t} className="bg-[#0D0E12] text-white">{t}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">Message *</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        placeholder="Describe your project, requirement, or question..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-amber-500/40 focus:bg-amber-500/[0.03] transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(246,168,0,0.35)]"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}