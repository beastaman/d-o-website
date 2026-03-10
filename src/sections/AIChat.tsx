import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ts: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm D&O Assistant. How can I help you learn about our engineering capabilities, projects, or partnership opportunities?",
    ts: new Date(),
  },
];

// ── Full pitch-deck knowledge base injected as system prompt ──
const SYSTEM_PROMPT = `You are D&O Assistant, the official AI assistant for D&O Advanced Engineering.
You answer questions ONLY about D&O Advanced Engineering using the knowledge base below.
If a question is outside this scope, politely redirect to D&O topics.
Keep answers concise (2-4 sentences) unless the user asks for detail.
Use a professional yet friendly tone.

=== COMPANY OVERVIEW ===
D&O Advanced Engineering is an India-based engineering and technology company specialising in advanced automotive systems, defence-grade engineering solutions, and high-performance mobility platforms. Originally established as D&O Motorsports, the company has evolved into a comprehensive engineering firm capable of tackling complex challenges across multiple sectors. D&O operates at the intersection of R&D, manufacturing, integration, and real-world deployment, delivering solutions that meet both civilian and strategic requirements. The company functions as the parent engineering entity for United Motorsports Academy (UMA), ensuring that all education and talent development initiatives are backed by live engineering projects and operational experience.

=== VISION ===
To build indigenous, world-class engineering solutions that meet global performance standards while strengthening India's capabilities across defence, mobility, and advanced vehicle systems.

=== MISSION ===
To design, develop, and deploy robust, scalable, and field-ready engineering systems through innovation, precision manufacturing, and interdisciplinary expertise.

=== CORE FOCUS AREAS ===
1. Automotive & Mobility Engineering: High-performance vehicle development, custom vehicle architecture & integration, advanced drivetrain and chassis solutions, motorsport-derived engineering methodologies.
2. Defence & Strategic Engineering: Indigenous defence mobility platforms, anti-drone and counter-UAS systems, surveillance/jamming/spoofing technologies, rapid-response and disaster management vehicles.
3. Advanced Engineering & Manufacturing: Reverse engineering & system replication, precision fabrication & production optimisation, rapid prototyping and validation, multi-material manufacturing (metals, composites, polymers).

=== KEY ENGINEERING CAPABILITIES ===
- End-to-end product development (concept → deployment)
- Reverse engineering of complex mechanical systems
- Multi-dynamic simulations & performance modelling
- Structural analysis & system reliability engineering
- Manufacturing process optimisation
- Integrated testing & validation
- Software & Tools: Ansys, SolidWorks, CAD/CAE platforms

=== CORE COMPETENCIES ===
- Reverse Engineering: Precise component analysis and reconstruction
- Production Optimisation: Efficiency enhancement and process improvement
- Multi-Dynamic Simulations: Advanced computational analysis and modelling
- Product Development: End-to-end engineering and maintenance

=== FLAGSHIP PROJECTS ===

1. Indrajaal Ranger – Anti-Drone Vehicle:
   - Helped create India's first indigenously developed anti-drone vehicle and emergency response vehicle by Indrajaal.
   - Features: Multi-functional design, advanced spoofing and jamming system, rapid deployment capability.
   - Displayed at 61st BSF Parade 2025.

2. MINGO Airboat Project:
   - Flagship indigenous development for disaster management and emergency response.
   - Developed for Maharashtra Government's disaster management needs.
   - Features: Multi-functional design, advanced propulsion system, government validated, rapid deployment capability.

3. NHAI Road Survey & Inspection Vehicles:
   - Developed indigenous vehicles for highway inspection and tarmac assessments through sensors.
   - Features: Multi-sensor system, advanced data logging system, government validated, rapid deployment capability.

=== AUTOMOTIVE & MOTORSPORTS ===
Delivering high-performance solutions through precision engineering and custom fabrication: custom fabrication, performance tuning, drift build projects, precision engineering.

=== CUTTING-EDGE MATERIALS ===
Leveraging advanced materials like PEEK and ULTEM for superior performance and durability: high-performance polymers, composite materials, material testing & validation, custom formulations.

=== DEFENSE ENGINEERING ===
Developing specialized equipment and secure projects for national security applications: advanced mechanical systems, composite armor solutions, classified project development, military-grade fabrication.

=== PRODUCTION OPTIMIZATION ===
Implementing lean manufacturing principles and advanced equipment for maximum efficiency: advanced manufacturing equipment, rigorous quality assurance, lean process implementation, complete in-house capabilities.

=== COMPUTATIONAL ANALYSIS ===
Utilizing advanced simulations to predict performance and optimize designs before prototyping: CFD analysis, FEA & structural analysis, multi-physics modeling, design optimization.

=== GOVERNMENT COLLABORATIONS ===
Proven partnership record with successful delivery of complex projects for key government agencies:
01. Maharashtra Government – MINGO Airboat Project: Indigenous disaster management solution
02. NHAI – Infrastructure Solutions: Specialized engineering for national highways
03. Indian Army – Defence Technology: Classified projects and advanced equipment
04. Track Record – Demonstrated ability to meet stringent requirements and security protocols

=== LEADERSHIP & TEAM ===
- Founder & Visionary Leader: Omkar Rane
- Engineering Core: Specialists in Design & Simulation
- Technical Staff: Skilled Fabrication & Assembly
- Team Structure: Core → Leadership, R&D, Production, Testing
- United by a commitment to engineering excellence.

=== QUALITY ASSURANCE ===
A comprehensive quality control framework ensuring reliability and performance:
01. Material Testing: Strict verification of all raw materials and composites
02. Precision Inspection: Advanced metrology for dimensional accuracy
03. Performance Validation: Real-world functional testing under stress conditions
04. Certification Compliance: Adherence to international industry standards

=== COMPETITIVE ADVANTAGES (Why Choose D&O?) ===
- End-to-End Solutions: Seamless execution from concept to production
- Indigenous Innovation: Proudly "Make in India" with global standards
- Rapid Prototyping: Accelerated development cycles
- Cost-Effective: Optimized engineering for maximum value

=== CORE VALUES ===
- Precision: Zero tolerance for error in critical systems
- Innovation: Continuous improvement through R&D
- Integrity: Transparent operations and ethical practices
- Safety: Prioritizing user safety in all designs

=== CONTINUOUS INNOVATION ===
Investing in advanced research and development: materials innovation, design & engineering, process innovation, technology integration.

=== CONTACT INFORMATION ===
- Email: design.dnomotorsports@gmail.com
- Phone: +91 98201 54567
- Location: TTC Industrial Area, MIDC Industrial Area, Pawne, Navi Mumbai, Maharashtra 400710
- Next Steps: Technical Consultation, Facility Visit, Pilot Proposal
- Tagline: "Engineering the Future, Together."
`;

// ── OpenRouter API call ──
async function callOpenRouter(messages: { role: string; content: string }[]): Promise<string> {
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!API_KEY) {
    console.error('Missing VITE_OPENROUTER_API_KEY in .env');
    return 'Sorry, the AI service is not configured. Please contact the site administrator.';
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'D&O Advanced Engineering',
      },
      body: JSON.stringify({
        model: 'z-ai/glm-4.5-air:free',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API error:', response.status, errorData);
      return 'Sorry, I encountered an error. Please try again in a moment.';
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('OpenRouter fetch error:', error);
    return 'Sorry, I could not connect to the AI service. Please check your internet connection.';
  }
}

function fmtTime(d: Date) {
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

const SUGGESTIONS = ['Projects', 'Defence Tech', 'Capabilities', 'Team', 'Get a Quote'];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesBoxRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ─────────────────────────────────────────────────────────────────
     SCROLL LOCK — capture-phase approach:
     Lenis registers its wheel/touch listeners in the bubble phase.
     By intercepting in the capture phase first with
     stopImmediatePropagation(), Lenis never receives the event at
     all. Events inside the chat window are left alone so native
     overflow-y scroll works; events outside get preventDefault() so
     the page cannot scroll.
  ───────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;

    const blockOutside = (e: Event) => {
      // Stop Lenis (bubble phase) from ever seeing this event
      e.stopImmediatePropagation();
      // If the event originated outside the chat window, block native scroll too
      if (!chatWindowRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', blockOutside, { capture: true, passive: false });
    document.addEventListener('touchmove', blockOutside, { capture: true, passive: false });

    return () => {
      document.removeEventListener('wheel', blockOutside, { capture: true });
      document.removeEventListener('touchmove', blockOutside, { capture: true });
    };
  }, [isOpen]);

  /* ── Auto-focus input when chat opens ── */
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 280);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  /* ── Auto-scroll to latest message inside the messages box ── */
  useEffect(() => {
    const box = messagesBoxRef.current;
    if (!box) return;
    // Use requestAnimationFrame to scroll after DOM paints
    requestAnimationFrame(() => {
      box.scrollTop = box.scrollHeight;
    });
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      ts: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const history = [...messages, userMessage]
      .filter((m) => m.id !== '1')
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }));

    const aiResponse = await callOpenRouter(history);

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        ts: new Date(),
      },
    ]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const clearChat = () => setMessages(initialMessages);

  return (
    <>
      {/* ── FAB Toggle Button ── */}
      <div className="fixed bottom-5 right-5 z-[400] sm:bottom-6 sm:right-6">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.button
              key="fab-open"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={open}
              aria-label="Open chat"
              className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center shadow-[0_6px_28px_rgba(246,168,0,0.5)] transition-colors"
              style={{ width: '48px', height: '48px' }}
            >
              <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
              <MessageCircle className="w-5 h-5 text-black relative z-10" />
            </motion.button>
          ) : (
            <motion.button
              key="fab-close"
              initial={{ scale: 0, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 90 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={close}
              aria-label="Close chat"
              className="w-12 h-12 rounded-full bg-[#13141c] border border-white/10 flex items-center justify-center shadow-lg hover:border-white/20 transition-colors"
              style={{ width: '48px', height: '48px' }}
            >
              <X className="w-4 h-4 text-gray-300" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            /* Responsive: full-width on mobile, fixed width on sm+ */
            className="fixed z-[400] flex flex-col
              /* mobile: full width, anchored to bottom */
              bottom-[72px] left-3 right-3
              /* sm+: anchored to bottom-right like a widget */
              sm:left-auto sm:right-5 sm:bottom-[72px] sm:w-[360px]
              md:right-6 md:w-[380px]"
            style={{
              maxHeight: 'calc(100dvh - 90px)',
              background: 'linear-gradient(160deg, #13141c 0%, #0f1016 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              boxShadow:
                '0 32px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(246,168,0,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* Amber top accent */}
            <div className="h-[2px] flex-shrink-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-t-[20px]" />

            {/* ── Header ── */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.06] flex-shrink-0">
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-amber-400" />
                </div>
                <span className="absolute -bottom-px -right-px w-2 h-2 bg-emerald-500 rounded-full border-[1.5px] border-[#13141c]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-sora font-semibold text-white text-[12.5px] leading-tight">D&O Assistant</div>
                <div className="text-[9px] text-emerald-400/80 font-mono flex items-center gap-1 mt-px">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                  Online · AI Powered
                </div>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                {messages.length > 1 && (
                  <button
                    onClick={clearChat}
                    title="Clear conversation"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-700 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={close}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:text-white hover:bg-white/[0.07] transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ── Messages — native overflow-y scroll, Lenis is stopped so it works ── */}
            <div
              ref={messagesBoxRef}
              className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-3"
              style={{
                scrollbarWidth: 'none',
                /* Give it a fixed height so flex-1 + overflow-y-auto actually scrolls */
                overscrollBehavior: 'contain',
              }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      msg.role === 'user'
                        ? 'bg-amber-500/15 border border-amber-500/20'
                        : 'bg-white/[0.06] border border-white/[0.08]'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="w-3 h-3 text-amber-400" />
                    ) : (
                      <Bot className="w-3 h-3 text-amber-500/70" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[80%] flex flex-col gap-0.5 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-3 py-2 text-[12.5px] leading-relaxed whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-amber-500 text-black font-medium rounded-2xl rounded-tr-sm'
                          : 'bg-white/[0.06] text-gray-200 rounded-2xl rounded-tl-sm border border-white/[0.06]'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="font-mono text-[8.5px] text-gray-700 px-1">{fmtTime(msg.ts)}</span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-amber-500/70" />
                    </div>
                    <div className="px-3 py-2.5 bg-white/[0.06] border border-white/[0.06] rounded-2xl rounded-tl-sm flex items-center gap-1">
                      {[0, 160, 320].map((delay) => (
                        <span
                          key={delay}
                          className="w-1.5 h-1.5 bg-amber-500/50 rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick Suggestions — horizontal scroll row ── */}
            <div
              className="px-3 pb-2 flex gap-1.5 flex-shrink-0 overflow-x-auto"
              style={{ scrollbarWidth: 'none' }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(`Tell me about ${s.toLowerCase()}`)}
                  disabled={isTyping}
                  className="flex-shrink-0 px-2.5 py-1 text-[10px] font-mono bg-white/[0.04] border border-white/[0.07] rounded-full text-gray-600 hover:text-amber-400 hover:border-amber-500/25 hover:bg-amber-500/[0.04] transition-all disabled:opacity-30 disabled:pointer-events-none whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* ── Input Area ── */}
            <div className="px-3 pb-3 flex-shrink-0">
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 focus-within:border-amber-500/35 focus-within:bg-white/[0.05] transition-all">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about D&O..."
                  maxLength={500}
                  className="flex-1 bg-transparent text-[12.5px] text-white placeholder:text-gray-600 outline-none"
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-7 h-7 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center flex-shrink-0 disabled:opacity-25 disabled:pointer-events-none transition-colors"
                >
                  <Send className="w-3 h-3 text-black" />
                </motion.button>
              </div>
              <p className="text-center mt-1.5 font-mono text-[8.5px] text-gray-700 tracking-wide">
                D&O AI · Enter to send
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
