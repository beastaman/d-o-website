import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Shield,
  Ship,
  Truck,
  Car,
  Landmark,
  Factory,
  FlaskConical,
  LineChart,
  BadgeCheck,
  Database,
  Users,
  Newspaper,
  Phone as PhoneIcon,
  Mail as MailIcon,
  FileText,
  ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { submitContactInquiry } from '@/lib/airtable';
import { showToast } from '@/lib/toaster';

interface ActionCard {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  to?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ts: Date;
  actions?: ActionCard[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Hello! I'm D&O Assistant. How can I help you learn about our engineering capabilities, projects, or partnership opportunities?",
    ts: new Date(),
  },
];

// ── Full pitch-deck knowledge base injected as system prompt ──
const SYSTEM_PROMPT = `ROLE: You are the official AI assistant for D&O Advanced Engineering — an India-based advanced engineering company.

STRICT RULES:
- ONLY answer using facts from the knowledge base below. Never invent, guess, or hallucinate.
- If asked something not in the knowledge base, say "I don't have that detail — please contact us at design.dnomotorsports@gmail.com."
- Never pretend to be a general AI. Always stay in character as D&O Assistant.
- Be concise (3-5 sentences). Use bullet points for lists. Use **bold** for key terms.
- Greet warmly. Be professional but human.
- If user asks about pricing, timelines, or classified specs → say these require direct consultation and offer the contact form.

=== COMPANY OVERVIEW ===
D&O Advanced Engineering is an India-based engineering and technology company specialising in advanced automotive systems, Government-grade engineering solutions, and high-performance mobility platforms. Originally established as D&O Motorsports, the company has evolved into a comprehensive engineering firm capable of tackling complex challenges across multiple sectors. D&O operates at the intersection of R&D, manufacturing, integration, and real-world deployment, delivering solutions that meet both civilian and strategic requirements. The company functions as the parent engineering entity for United Motorsports Academy (UMA), ensuring that all education and talent development initiatives are backed by live engineering projects and operational experience.

=== VISION ===
To build indigenous, world-class engineering solutions that meet global performance standards while strengthening India's capabilities across Government, mobility, and advanced vehicle systems.

=== MISSION ===
To design, develop, and deploy robust, scalable, and field-ready engineering systems through innovation, precision manufacturing, and interdisciplinary expertise.

=== CORE FOCUS AREAS ===
1. Automotive & Mobility Engineering: High-performance vehicle development, custom vehicle architecture & integration, advanced drivetrain and chassis solutions, motorsport-derived engineering methodologies.
2. Government & Strategic Engineering: Indigenous Government mobility platforms, anti-drone and counter-UAS systems, surveillance/jamming/spoofing technologies, rapid-response and disaster management vehicles.
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

=== Government ENGINEERING ===
Developing specialized equipment and secure projects for national security applications: advanced mechanical systems, composite armor solutions, classified project development, military-grade fabrication.

=== PRODUCTION OPTIMIZATION ===
Implementing lean manufacturing principles and advanced equipment for maximum efficiency: advanced manufacturing equipment, rigorous quality assurance, lean process implementation, complete in-house capabilities.

=== COMPUTATIONAL ANALYSIS ===
Utilizing advanced simulations to predict performance and optimize designs before prototyping: CFD analysis, FEA & structural analysis, multi-physics modeling, design optimization.

=== GOVERNMENT COLLABORATIONS ===
Proven partnership record with successful delivery of complex projects for key government agencies:
01. Maharashtra Government – MINGO Airboat Project: Indigenous disaster management solution
02. NHAI – Infrastructure Solutions: Specialized engineering for national highways
03. Indian Army – Government Technology: Classified projects and advanced equipment
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

// ── Intent map for action cards ──
const INTENT_MAP: Array<{
  regex: RegExp;
  label: string;
  icon: LucideIcon;
  to?: string;
  href?: string;
}> = [
  { regex: /indrajaal|anti.?drone|ranger|bsf/i, label: 'View Indrajaal Ranger', icon: Shield, to: '/projects/indrajaal-ranger' },
  { regex: /mingo|airboat|disaster|flood/i, label: 'View MINGO Airboat', icon: Ship, to: '/projects/mingo-airboat' },
  { regex: /nhai|highway|road.?survey/i, label: 'View NHAI Vehicles', icon: Truck, to: '/projects/nhai-vehicles' },
  { regex: /automotive|motorsport|car|bmw|porsche/i, label: 'Automotive', icon: Car, to: '/automotive' },
  { regex: /government|defence|military|govt/i, label: 'Govt Collaborations', icon: Landmark, to: '/govt-collaborations' },
  { regex: /manufactur|fabricat|production/i, label: 'Manufacturing', icon: Factory, to: '/manufacturing' },
  { regex: /material|peek|ultem|composite/i, label: 'Materials', icon: FlaskConical, to: '/materials' },
  { regex: /analy|simulation|cfd|fea/i, label: 'Analysis', icon: LineChart, to: '/analysis' },
  { regex: /quality|certif|testing/i, label: 'Quality', icon: BadgeCheck, to: '/quality' },
  { regex: /data.?library|scan|catalog/i, label: 'Data Library', icon: Database, to: '/data-library' },
  { regex: /team|founder|omkar|about/i, label: 'About Us', icon: Users, to: '/about' },
  { regex: /blog|article|news/i, label: 'Blog', icon: Newspaper, to: '/blog' },
  { regex: /phone|call/i, label: 'Call +91 98201 54567', icon: PhoneIcon, href: 'tel:+919820154567' },
  { regex: /email|mail/i, label: 'Email D&O', icon: MailIcon, href: 'mailto:design.dnomotorsports@gmail.com' },
];

const FORM_TRIGGER_REGEX = /quote|contact|reach.*out|get.*touch|start.*project|work.*with|collab|partner|hire|inquire|proposal|consultation|talk.*team|email|whatsapp|call.*you|connect|enquir|discuss.*project|need.*help|require.*service|interested/i;

function detectActions(userInput: string): ActionCard[] {
  const lower = userInput.toLowerCase();
  const matched: ActionCard[] = [];
  INTENT_MAP.forEach((intent, idx) => {
    if (intent.regex.test(lower)) {
      matched.push({
        id: `action-${idx}-${Date.now()}`,
        label: intent.label,
        icon: intent.icon,
        to: intent.to,
        href: intent.href,
      });
    }
  });
  return matched;
}

// ── User context helpers ──
interface DnoUser {
  name?: string;
  email?: string;
}

function loadUser(): DnoUser | null {
  try {
    const raw = localStorage.getItem('dno_user');
    if (!raw) return null;
    return JSON.parse(raw) as DnoUser;
  } catch {
    return null;
  }
}

function saveUser(user: DnoUser) {
  try {
    localStorage.setItem('dno_user', JSON.stringify(user));
  } catch {
    /* ignore */
  }
}

function extractUserDetails(text: string): DnoUser {
  const result: DnoUser = {};
  const nameMatch = text.match(/my name is (\w+)/i);
  if (nameMatch) result.name = nameMatch[1];
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  if (emailMatch) result.email = emailMatch[0];
  return result;
}

// ── OpenRouter streaming call ──
// Free models tried in order — if one returns 404/429 move to next
const FREE_MODELS = [
  'openai/gpt-oss-120b:free',
  'meta-llama/llama-4-scout:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'mistralai/mistral-small-3.2-24b-instruct:free',
];

const OR_HEADERS = (key: string) => ({
  Authorization: `Bearer ${key}`,
  'Content-Type': 'application/json',
  'HTTP-Referer': window.location.origin,
  'X-Title': 'D&O Advanced Engineering',
});

// Try each model with streaming; skip to next on 404/429
async function streamOpenRouter(
  messages: { role: string; content: string }[],
  systemPrompt: string,
  onChunk: (text: string) => void,
): Promise<{ ok: boolean; full: string }> {
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!API_KEY) return { ok: false, full: 'AI service not configured. Contact site admin.' };

  for (const model of FREE_MODELS) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: OR_HEADERS(API_KEY),
        body: JSON.stringify({
          model,
          stream: true,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          max_tokens: 600,
          temperature: 0.7,
        }),
      });

      // Skip unavailable / rate-limited models
      if (res.status === 404 || res.status === 429 || !res.ok || !res.body) continue;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line || !line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (payload === '[DONE]') return { ok: true, full };
          try {
            const delta: string | undefined = JSON.parse(payload)?.choices?.[0]?.delta?.content;
            if (delta) { full += delta; onChunk(delta); }
          } catch { /* skip keepalive */ }
        }
      }
      if (full) return { ok: true, full };
    } catch {
      continue;
    }
  }
  return { ok: false, full: '' };
}

// Non-streaming fallback — tries same model list without streaming
async function fallbackOpenRouter(
  messages: { role: string; content: string }[],
  systemPrompt: string,
): Promise<string> {
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!API_KEY) return 'AI service not configured.';

  for (const model of FREE_MODELS) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: OR_HEADERS(API_KEY),
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          max_tokens: 600,
          temperature: 0.7,
        }),
      });
      if (res.status === 404 || res.status === 429 || !res.ok) continue;
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) return content;
    } catch {
      continue;
    }
  }
  return "Sorry, all AI models are currently busy. Please try again in a moment or reach us at design.dnomotorsports@gmail.com.";
}

function fmtTime(d: Date) {
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

const SUGGESTIONS = ['Projects', 'Capabilities', 'Government Tech', 'Team'];
const CONTACT_CHIP = 'Start a Project';

type ChatMode = 'chat' | 'form';

// ── Structured AI response renderer ──────────────────────────────────────────
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  );
}

function AiBubble({ content }: { content: string }) {
  const lines = content.split('\n');
  const nodes: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    nodes.push(
      <ul key={`ul-${nodes.length}`} className="mt-1.5 space-y-1 pl-1">
        {listItems.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[12px] text-gray-300 leading-relaxed">
            <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-amber-500/70 flex-shrink-0" />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    if (!line) { flushList(); return; }

    // heading: ## or ###
    if (/^#{1,3}\s/.test(line)) {
      flushList();
      const text = line.replace(/^#+\s/, '');
      nodes.push(
        <p key={i} className="mt-2 mb-0.5 text-[11px] font-mono tracking-widest text-amber-400/80 uppercase">
          {text}
        </p>
      );
      return;
    }

    // bullet: - or * or •
    if (/^[-*•]\s/.test(line)) {
      listItems.push(line.replace(/^[-*•]\s/, ''));
      return;
    }

    // numbered list
    if (/^\d+[.)]\s/.test(line)) {
      listItems.push(line.replace(/^\d+[.)]\s/, ''));
      return;
    }

    flushList();
    nodes.push(
      <p key={i} className="text-[12.5px] text-gray-200 leading-relaxed">
        {renderInline(line)}
      </p>
    );
  });
  flushList();

  return (
    <div className="px-3 py-2.5 bg-white/[0.06] rounded-2xl rounded-tl-sm border border-white/[0.06] space-y-1 max-w-full">
      {nodes}
    </div>
  );
}

export default function AIChat() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>('chat');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesBoxRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ─────────────────────────────────────────────────────────────────
     SCROLL LOCK  capture-phase approach (unchanged)
  ───────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;

    const blockOutside = (e: Event) => {
      e.stopImmediatePropagation();
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
    if (isOpen && mode === 'chat') {
      const t = setTimeout(() => inputRef.current?.focus(), 280);
      return () => clearTimeout(t);
    }
  }, [isOpen, mode]);

  /* ── Auto-scroll to latest message ── */
  useEffect(() => {
    const box = messagesBoxRef.current;
    if (!box) return;
    requestAnimationFrame(() => {
      box.scrollTop = box.scrollHeight;
    });
  }, [messages, isTyping]);

  // Pre-fill form with stored user details when entering form mode
  useEffect(() => {
    if (mode === 'form') {
      const stored = loadUser();
      if (stored) {
        setFormData((prev) => ({
          ...prev,
          name: prev.name || stored.name || '',
          email: prev.email || stored.email || '',
        }));
      }
    }
  }, [mode]);

  const buildSystemPrompt = (): string => {
    const user = loadUser();
    if (user?.name || user?.email) {
      const namePart = user.name ?? 'Unknown';
      const emailPart = user.email ?? 'no email';
      return `${SYSTEM_PROMPT}\n\nUser: ${namePart} (${emailPart}).`;
    }
    return SYSTEM_PROMPT;
  };

  const appendAssistantPlaceholder = (id: string) => {
    setMessages((prev) => [
      ...prev,
      { id, role: 'assistant', content: '', ts: new Date() },
    ]);
  };

  const updateLastAssistant = (updater: (m: Message) => Message) => {
    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      if (last.role !== 'assistant') return prev;
      const next = [...prev];
      next[next.length - 1] = updater(last);
      return next;
    });
  };

  const handleSend = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || isTyping) return;

    // Capture user details if present in the message
    const detected = extractUserDetails(msg);
    if (detected.name || detected.email) {
      const current = loadUser() ?? {};
      saveUser({ ...current, ...detected });
    }

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

    // Build action cards from user input
    const actions = detectActions(msg);
    const formIntent = FORM_TRIGGER_REGEX.test(msg);

    // Streaming assistant placeholder
    const assistantId = (Date.now() + 1).toString();
    appendAssistantPlaceholder(assistantId);

    const systemPrompt = buildSystemPrompt();

    const result = await streamOpenRouter(history, systemPrompt, (chunk) => {
      updateLastAssistant((m) => ({ ...m, content: m.content + chunk }));
    });

    if (!result.ok || !result.full) {
      // Fallback once
      const fallback = await fallbackOpenRouter(history, systemPrompt);
      updateLastAssistant((m) => ({ ...m, content: fallback }));
    }

    if (actions.length > 0) {
      updateLastAssistant((m) => ({ ...m, actions }));
    }

    setIsTyping(false);

    // If user expressed intent to contact / start project — auto-open form
    if (formIntent) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `form-prompt-${Date.now()}`,
            role: 'assistant',
            content:
              "Sure — I'll open our project form for you. Drop your details below and the D&O team will reach out within 2 business days.",
            ts: new Date(),
          },
        ]);
        setMode('form');
      }, 350);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleActionClick = (action: ActionCard) => {
    if (action.label === 'Open Project Form' || action.id.startsWith('action-form-')) {
      setMode('form');
      return;
    }
    if (action.to) {
      navigate(action.to);
      setIsOpen(false);
      return;
    }
    if (action.href) {
      window.location.href = action.href;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactInquiry({
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        inquiryType: 'AI Chat Inquiry',
        message: formData.message,
      });
      // Persist user
      saveUser({ name: formData.name, email: formData.email });

      setSubmitted(true);
      showToast({
        title: 'Message Sent!',
        message: "We'll respond within 2 business days.",
        variant: 'success',
      });

      // Append a success message into the chat and return to chat mode
      setMessages((prev) => [
        ...prev,
        {
          id: `form-success-${Date.now()}`,
          role: 'assistant',
          content:
            "Thanks " +
            (formData.name || 'there') +
            "! Your project inquiry has been received. The D&O team will reach out within 2 business days.",
          ts: new Date(),
        },
      ]);

      // Reset form and return to chat after a beat
      setTimeout(() => {
        setFormData({ name: '', email: '', organization: '', message: '' });
        setSubmitted(false);
        setMode('chat');
      }, 1400);
    } catch {
      showToast({
        title: 'Submission Failed',
        message: 'Please try again or email us directly.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const clearChat = () => {
    setMessages(initialMessages);
    setMode('chat');
  };

  return (
    <>
      {/* ── FAB Toggle Button ── */}
      <div className="fixed z-[400] bottom-[26px] left-1/2 -translate-x-1/2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.button
              key="fab-open"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              onClick={open}
              aria-label="Open chat"
              className="relative flex flex-col items-center gap-0.5"
            >
              {/* Circle — bigger on mobile to match Apollo-style raised center button */}
              <div className="relative w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center shadow-[0_6px_28px_rgba(246,168,0,0.55)] transition-colors">
                <span className="absolute inset-0 rounded-full bg-amber-400/25 animate-ping pointer-events-none" />
                <MessageCircle className="w-6 h-6 sm:w-5 sm:h-5 text-black relative z-10" />
              </div>
              {/* Label only on mobile */}
              <span className="sm:hidden text-[9px] font-mono text-gray-400 tracking-wide -mt-0.5">Chat</span>
            </motion.button>
          ) : (
            <motion.button
              key="fab-close"
              initial={{ scale: 0, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 90 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              onClick={close}
              aria-label="Close chat"
              className="flex flex-col items-center gap-0.5"
            >
              <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-[#13141c] border border-white/10 flex items-center justify-center shadow-lg hover:border-amber-500/30 transition-colors">
                <X className="w-4 h-4 text-gray-300" />
              </div>
              <span className="sm:hidden text-[9px] font-mono text-gray-400 tracking-wide -mt-0.5">Close</span>
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
            className="fixed z-[400] flex flex-col
              bottom-[80px] left-3 right-3
              sm:left-auto sm:right-5 sm:bottom-[80px] sm:w-[420px]
              md:right-6 md:w-[440px]"
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
              {mode === 'form' ? (
                <button
                  onClick={() => setMode('chat')}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-white/[0.05] transition-all"
                  aria-label="Back to chat"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="absolute -bottom-px -right-px w-2 h-2 bg-emerald-500 rounded-full border-[1.5px] border-[#13141c]" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="font-sora font-semibold text-white text-[12.5px] leading-tight">
                  {mode === 'form' ? 'Start a Project' : 'D&O Assistant'}
                </div>
                <div className="text-[9px] text-emerald-400/80 font-mono flex items-center gap-1 mt-px">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                  {mode === 'form' ? 'Sends to D&O team' : 'Online · AI Powered'}
                </div>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                {mode === 'chat' && messages.length > 1 && (
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

            {/* ── BODY ── */}
            <AnimatePresence mode="wait">
              {mode === 'chat' ? (
                <motion.div
                  key="chat-body"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col flex-1 min-h-0"
                >
                  {/* Messages */}
                  <div
                    ref={messagesBoxRef}
                    className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-3"
                    style={{ scrollbarWidth: 'none', overscrollBehavior: 'contain' }}
                  >
                    {messages.map((msg, msgIdx) => {
                      // Streaming in progress = last assistant message with no content yet
                      const isStreamingPlaceholder =
                        isTyping &&
                        msgIdx === messages.length - 1 &&
                        msg.role === 'assistant' &&
                        msg.content === '';

                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                          {/* Avatar — single, always present */}
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

                          {/* Bubble + actions */}
                          <div
                            className={`max-w-[85%] flex flex-col gap-1.5 ${
                              msg.role === 'user' ? 'items-end' : 'items-start'
                            }`}
                          >
                            {/* Streaming placeholder → show dots inside same bubble */}
                            {isStreamingPlaceholder ? (
                              <div className="px-3 py-2.5 bg-white/[0.06] border border-white/[0.06] rounded-2xl rounded-tl-sm flex items-center gap-1">
                                {[0, 160, 320].map((delay) => (
                                  <span
                                    key={delay}
                                    className="w-1.5 h-1.5 bg-amber-500/50 rounded-full animate-bounce"
                                    style={{ animationDelay: `${delay}ms` }}
                                  />
                                ))}
                              </div>
                            ) : msg.content ? (
                              msg.role === 'user' ? (
                                <div className="px-3 py-2 text-[12.5px] leading-relaxed bg-amber-500 text-black font-medium rounded-2xl rounded-tr-sm">
                                  {msg.content}
                                </div>
                              ) : (
                                <AiBubble content={msg.content} />
                              )
                            ) : null}

                            {/* Action cards */}
                            {msg.role === 'assistant' && msg.actions && msg.actions.length > 0 && (
                              <div className="flex flex-col gap-1.5 w-full mt-0.5">
                                {msg.actions.map((action) => {
                                  const Icon = action.icon;
                                  return (
                                    <button
                                      key={action.id}
                                      onClick={() => handleActionClick(action)}
                                      className="group flex items-center gap-2.5 w-full px-3 py-2 rounded-xl bg-amber-500/[0.06] border border-amber-500/25 hover:border-amber-500/55 hover:bg-amber-500/[0.12] transition-all"
                                    >
                                      <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-3.5 h-3.5 text-amber-400" />
                                      </div>
                                      <span className="flex-1 text-left text-[11.5px] font-medium text-amber-100/90 group-hover:text-amber-100">
                                        {action.label}
                                      </span>
                                      {action.href ? (
                                        <ExternalLink className="w-3 h-3 text-amber-500/70 group-hover:text-amber-400 flex-shrink-0" />
                                      ) : (
                                        <ArrowRight className="w-3.5 h-3.5 text-amber-500/70 group-hover:text-amber-400 flex-shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {!isStreamingPlaceholder && (
                              <span className="font-mono text-[8.5px] text-gray-700 px-1">
                                {fmtTime(msg.ts)}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* No separate typing indicator — dots live inside the placeholder message bubble above */}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Suggestions + Contact CTA */}
                  <div
                    className="px-3 pb-1.5 flex gap-1.5 flex-shrink-0 overflow-x-auto"
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
                    {/* Contact chip — opens form directly */}
                    <button
                      key={CONTACT_CHIP}
                      onClick={() => setMode('form')}
                      disabled={isTyping}
                      className="flex-shrink-0 px-2.5 py-1 text-[10px] font-mono bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all disabled:opacity-30 disabled:pointer-events-none whitespace-nowrap"
                    >
                      ✉ {CONTACT_CHIP}
                    </button>
                  </div>

                  {/* Input Area */}
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
              ) : (
                /* ── FORM VIEW ── */
                <motion.div
                  key="form-body"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-1 min-h-0 overflow-y-auto px-4 py-4"
                  style={{ scrollbarWidth: 'none', overscrollBehavior: 'contain' }}
                >
                  {submitted ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                      <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                        <Send className="w-7 h-7 text-amber-400" />
                      </div>
                      <h3 className="font-sora font-semibold text-lg text-white mb-1">Message Sent!</h3>
                      <p className="text-gray-400 text-[12px]">
                        We'll get back to you within 2 business days.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5">
                      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-amber-500/[0.06] border border-amber-500/20">
                        <FileText className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-[11px] text-amber-100/80 leading-snug">
                          Send your project brief to D&O. We typically respond within 2 business days.
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="chat-name" className="text-[10.5px] font-mono text-gray-400 uppercase tracking-wider">
                          Name
                        </label>
                        <input
                          id="chat-name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          required
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12.5px] text-white placeholder:text-gray-600 outline-none focus:border-amber-500/40 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="chat-email" className="text-[10.5px] font-mono text-gray-400 uppercase tracking-wider">
                          Email
                        </label>
                        <input
                          id="chat-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                          required
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12.5px] text-white placeholder:text-gray-600 outline-none focus:border-amber-500/40 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="chat-org" className="text-[10.5px] font-mono text-gray-400 uppercase tracking-wider">
                          Organization
                        </label>
                        <input
                          id="chat-org"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="Company or organization"
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12.5px] text-white placeholder:text-gray-600 outline-none focus:border-amber-500/40 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="chat-message" className="text-[10.5px] font-mono text-gray-400 uppercase tracking-wider">
                          Message
                        </label>
                        <textarea
                          id="chat-message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your project..."
                          required
                          rows={4}
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12.5px] text-white placeholder:text-gray-600 outline-none focus:border-amber-500/40 transition-colors resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setMode('chat')}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11.5px] text-gray-300 hover:text-white hover:border-white/[0.18] transition-all"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          Back
                        </button>
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-[12px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Inquiry
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
