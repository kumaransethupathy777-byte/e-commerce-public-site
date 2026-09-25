import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
  UserCheck,
  Bot
} from 'lucide-react';
import { ChatMessage } from '../types';

interface OmnichannelSupportWidgetProps {
  initialPrompt?: string;
  isCartOpen?: boolean;
  isModalOpen?: boolean;
}

export const OmnichannelSupportWidget: React.FC<OmnichannelSupportWidgetProps> = ({
  initialPrompt,
  isCartOpen = false,
  isModalOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState<'chat' | 'channels'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Hello! I am Aura AI, your 24/7 shopping assistant. How can I help you with styles, sizes, or return policies today?',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLiveAgentJoined, setIsLiveAgentJoined] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialPrompt) {
      setIsOpen(true);
      setActiveChannel('chat');
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  // If cart or product modal opens, auto-close the expanded chat widget so they don't clash
  useEffect(() => {
    if (isCartOpen) {
      setIsOpen(false);
    }
  }, [isCartOpen]);

  const quickQuestions = [
    'Do you have this in Blue, size L?',
    'What is your 30-day return policy?',
    'How long does standard delivery take?',
    'Can I speak with a human stylist?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      let isHandoff = false;

      const lower = query.toLowerCase();
      if (lower.includes('blue') || lower.includes('size l') || lower.includes('size')) {
        botResponse = 'Yes! Our Heavyweight Organic Tee and Cashmere Knits are in stock in size L across Navy Slate and Optic White. Would you like me to reserve one in your shopping bag?';
      } else if (lower.includes('return') || lower.includes('refund') || lower.includes('exchange')) {
        botResponse = 'We offer a complimentary 30-Day Hassle-Free Return policy with doorstep pickup and instant refund once collected.';
      } else if (lower.includes('delivery') || lower.includes('shipping') || lower.includes('time')) {
        botResponse = 'Standard express delivery takes 2 to 4 business days. Orders placed before 2 PM IST are dispatched on the same day!';
      } else if (lower.includes('human') || lower.includes('stylist') || lower.includes('agent') || lower.includes('speak')) {
        botResponse = 'Connecting you with Sarah from our Senior Styling Team...';
        isHandoff = true;
      } else {
        botResponse = `Thanks for your inquiry about "${query}". All our apparel is crafted from 100% GOTS certified organic materials. How else may I assist your selection?`;
      }

      setIsTyping(false);

      if (isHandoff) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: botResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);

        setTimeout(() => {
          setIsLiveAgentJoined(true);
          setMessages((prev) => [
            ...prev,
            {
              id: `agent-${Date.now()}`,
              sender: 'agent',
              text: 'Hi there! Sarah here from Aura Styling Support. I see your inquiry — how can I assist you with sizing or personalized recommendations today?',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isHumanHandoff: true
            }
          ]);
        }, 1200);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: isLiveAgentJoined ? 'agent' : 'bot',
            text: botResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    }, 850);
  };

  // When cart is open, hide floating button to prevent covering the checkout button
  if (isCartOpen) return null;

  return (
    <div id="chat-assistant" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group border border-slate-700"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Need help? Chat with AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {/* Chat / Omnichannel Modal Card */}
      {isOpen && (
        <div className="w-[360px] sm:w-[390px] h-[540px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-inner">
                {isLiveAgentJoined ? <UserCheck className="w-5 h-5 text-emerald-300" /> : <Bot className="w-5 h-5 text-amber-300" />}
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  <span>{isLiveAgentJoined ? 'Sarah (Live Stylist)' : 'Aura AI Assistant'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[11px] text-slate-300">
                  {isLiveAgentJoined ? 'Human Agent Connected' : 'Omnichannel Inquiries & Sizing'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Channel Tabs */}
          <div className="grid grid-cols-2 bg-slate-100 p-1 border-b border-slate-200 text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveChannel('chat')}
              className={`py-1.5 rounded-lg transition-colors ${
                activeChannel === 'chat' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Live Assistant
            </button>
            <button
              onClick={() => setActiveChannel('channels')}
              className={`py-1.5 rounded-lg transition-colors ${
                activeChannel === 'channels' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              WhatsApp &amp; Phone
            </button>
          </div>

          {/* Channel 1: Live Chat & AI */}
          {activeChannel === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              {/* Messages viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none shadow-xs'
                          : m.sender === 'agent'
                          ? 'bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-bl-none shadow-2xs font-medium'
                          : 'bg-slate-100 text-slate-800 rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-100 text-slate-500 w-fit rounded-bl-none text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions Pills - hidden scrollbar */}
              <div className="px-3 py-2 border-t border-slate-100 bg-slate-50 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-medium text-slate-700 hover:border-indigo-500 hover:text-indigo-600 whitespace-nowrap transition-colors cursor-pointer shrink-0 shadow-2xs"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 h-9.5 px-3.5 rounded-full bg-slate-100 text-xs text-slate-900 placeholder:text-slate-400 border border-transparent focus:outline-none focus:bg-white focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9.5 h-9.5 rounded-full bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-300 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Channel 2: WhatsApp, SMS, Email, Phone Direct */}
          {activeChannel === 'channels' && (
            <div className="flex-1 p-5 space-y-3.5 overflow-y-auto no-scrollbar">
              <div className="text-center pb-1">
                <h4 className="font-bold text-sm text-slate-900">Direct Client Concierge</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reach our dedicated team on your preferred platform
                </p>
              </div>

              <div className="space-y-2.5">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919876543210?text=Hi%20Aura%20Team%2C%20I%20have%20an%20inquiry%20regarding%20products."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-950 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs">WhatsApp Business Chat</h5>
                    <p className="text-[11px] text-emerald-800">Instant responses · +91 98765 43210</p>
                  </div>
                </a>

                {/* SMS Support */}
                <a
                  href="sms:+919876543210?body=AURA%20Inquiry%3A%20"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 text-indigo-950 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs">SMS Inquiries</h5>
                    <p className="text-[11px] text-indigo-800">Fast tracking updates &amp; alerts</p>
                  </div>
                </a>

                {/* Phone Call */}
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs">Toll-Free Phone Concierge</h5>
                    <p className="text-[11px] text-slate-500">Mon - Sat: 9 AM - 8 PM IST</p>
                  </div>
                </a>

                {/* Email Support */}
                <a
                  href="mailto:support@aurafashion.com?subject=Aura%20Product%20Inquiry"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-700 text-white flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs">Email Concierge</h5>
                    <p className="text-[11px] text-slate-500">support@aurafashion.com</p>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
