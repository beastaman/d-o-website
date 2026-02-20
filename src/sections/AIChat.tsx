import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Hello! I'm D&O Assistant. How can I help you learn about our engineering capabilities, projects, or partnership opportunities?",
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
- Email: info@dnomotorsports@gmail.com
- Phone: +91 98201 54567
- Location: Pune, Maharashtra, India
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

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Build conversation history for context (last 10 messages to stay within token limits)
    const history = [...messages, userMessage]
      .filter((m) => m.id !== '1') // skip initial greeting from history
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }));

    const aiResponse = await callOpenRouter(history);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[300] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          isOpen
            ? 'bg-gray-700 hover:bg-gray-600'
            : 'bg-amber-500 hover:bg-amber-600 hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-black" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-[300] w-[380px] max-w-[calc(100vw-48px)] bg-[#1a1b23] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 translate-y-4 invisible'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/10 border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-sora font-semibold text-white">D&O Assistant</h3>
              <p className="text-xs text-gray-400">Powered by AI</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[350px] overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' ? 'bg-amber-500/20' : 'bg-white/10'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-amber-500" />
                ) : (
                  <Bot className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                  message.role === 'user'
                    ? 'bg-amber-500 text-black rounded-br-none'
                    : 'bg-white/10 text-gray-200 rounded-bl-none'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-400" />
              </div>
              <div className="bg-white/10 rounded-2xl rounded-bl-none px-4 py-3">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about D&O..."
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500/50 focus:ring-amber-500/20"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              size="icon"
              className="bg-amber-500 hover:bg-amber-600 text-black disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2 mt-3">
            {['Capabilities', 'Projects', 'Contact', 'Defence', 'Team'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setInput(`Tell me about your ${suggestion.toLowerCase()}`);
                }}
                className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}