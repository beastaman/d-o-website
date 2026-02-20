import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, ArrowRight, Calendar, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  className?: string;
}

const nextSteps = [
  { icon: Calendar, title: 'Technical Consultation', desc: 'Schedule a deep-dive session to discuss specific requirements' },
  { icon: Building, title: 'Facility Visit', desc: 'Inspect our R&D and manufacturing capabilities firsthand' },
  { icon: ArrowRight, title: 'Pilot Proposal', desc: 'Define scope for initial collaboration project' },
];

export default function Contact({ className = '' }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Flowing section - reveal animations
      gsap.fromTo(
        headlineRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
          },
        }
      );

      gsap.fromTo(
        stepsRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', organization: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative w-full min-h-screen bg-[#12131A] py-20 lg:py-32 ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-sora font-bold text-[clamp(40px,6vw,72px)] text-white text-center mb-4"
        >
          Start a <span className="text-gradient">Project.</span>
        </h2>
        
        <p className="text-center text-gray-400 text-lg max-w-xl mx-auto mb-16">
          Tell us what you're building. We'll respond within 2 business days.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left Column - Contact Info */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h3 className="font-sora font-semibold text-xl text-white mb-6">
                Get in touch
              </h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:info@dnomotorsports@gmail.com"
                  className="flex items-center gap-4 text-gray-300 hover:text-amber-400 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                  <span>info@dnomotorsports@gmail.com</span>
                </a>
                
                <a
                  href="tel:+919820154567"
                  className="flex items-center gap-4 text-gray-300 hover:text-amber-400 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-amber-500" />
                  </div>
                  <span>+91 98201 54567</span>
                </a>
                
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-500" />
                  </div>
                  <span>Pune, Maharashtra, India</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-sora font-medium text-white mb-4">Follow us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-500/30 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-500/30 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Tagline */}
            <div className="pt-8 border-t border-white/10">
              <p className="font-sora text-2xl text-white italic">
                "Engineering the Future, Together."
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            ref={formRef}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="font-sora font-semibold text-2xl text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400">
                  We'll get back to you within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500/50 focus:ring-amber-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500/50 focus:ring-amber-500/20"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-gray-300">Organization</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Your company or organization"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500/50 focus:ring-amber-500/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    required
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500/50 focus:ring-amber-500/20 resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-6 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(246,168,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Inquiry
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div ref={stepsRef} className="mb-16">
          <h3 className="font-sora font-semibold text-xl text-white text-center mb-8">
            Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nextSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="font-mono text-xs text-amber-500/60">0{index + 1}</span>
                </div>
                <h4 className="font-sora font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/do-logo.png" 
                alt="D&O Advanced Engineering" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-sora text-sm text-gray-400">
                Advanced Engineering
              </span>
            </div>
            
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} D&O Advanced Engineering. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
