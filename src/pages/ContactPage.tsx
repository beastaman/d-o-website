import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, Instagram, ArrowRight, ExternalLink, ChevronRight, Youtube } from 'lucide-react';
import { submitContactInquiry } from '@/lib/airtable';
import { showToast } from '@/lib/toaster';

gsap.registerPlugin(ScrollTrigger);

const inquiryTypes = [
  'Project Collaboration',
  'Government Partnership',
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

    const phoneNumber = "919820154567"; // Note: no spaces, with country code
  const message = "Hi, I would like to get in touch with you."; // Optional pre-filled message

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // WhatsApp URL - works on both mobile and desktop
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

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
    try {
      await submitContactInquiry({
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        inquiryType: formData.inquiryType || 'General Inquiry',
        message: formData.message,
      });
      setSubmitted(true);
      showToast({ title: 'Message Sent!', message: "We'll respond within 2 business days.", variant: 'success' });
    } catch {
      showToast({ title: 'Submission Failed', message: 'Please try again or email us directly.', variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E]">
      {/* Navbar spacer */}
      <div className="h-28" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-24">
        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <div ref={heroRef} className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-gray-500 mb-8">
            <span>D&O</span><ChevronRight className="w-3 h-3" /><span className="text-amber-500">Contact</span>
          </div>
          <h1 className="font-sora font-black text-[clamp(40px,7vw,96px)] text-white leading-[1.0] mb-4">
            LET'S<br /><span className="text-amber-400">TALK.</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-xl max-w-lg mx-auto px-2">
            Tell us what you're building. We respond within 2 business days.
          </p>
        </div>

        {/* ── Two-column layout ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-12 items-start">
          {/* ── Left: Info ──────────────────────────────────────────────── */}
          <div ref={infoRef} className="space-y-10">
            {/* Contact details */}
            <div className="space-y-5">
              <h3 className="font-sora font-semibold text-white text-xl">Contact Details</h3>
              <a href="mailto:design.dnomotorsports@gmail.com"
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-1">Email</div>
                  <div className="text-gray-300 group-hover:text-amber-400 transition-colors">design.dnomotorsports@gmail.com</div>
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
                  <div className="text-gray-300">TTC Industrial Area, MIDC Industrial Area, Pawne, Navi Mumbai, Maharashtra 400710,<br />India 🇮🇳</div>
                </div>
              </div>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                  aria-label="Chat on WhatsApp"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                    {/* WhatsApp SVG Icon */}
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-6 h-6 text-[#25D366]"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-1">WhatsApp</div>
                    <div className="text-gray-300 group-hover:text-[#25D366] transition-colors">Chat Now</div>
                  </div>
                </a>
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
                </div>
                <ExternalLink className="w-3 h-3 text-gray-700 ml-auto group-hover:text-amber-500 transition-colors" />
              </a>

              <a href="_blank" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all">
                  <Youtube className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                </div>
                <div>
                  <div className="text-sm text-gray-300 group-hover:text-white transition-colors">YouTube</div>
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

            <div className="p-5 sm:p-8 lg:p-10">
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