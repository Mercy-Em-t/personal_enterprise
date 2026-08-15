'use client';

import { useState, useEffect, useRef } from 'react';

type Message = {
  role: 'system' | 'user' | 'agent';
  content: string;
};

export default function AIInterviewPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const leadId = params.id;

  useEffect(() => {
    // Initial Greeting
    setTimeout(() => {
      setMessages([
        { role: 'system', content: `[SYSTEM] Interview Session initialized for Lead ID: ${leadId}` },
        { role: 'agent', content: "Hello. I am the AI Solutions Architect for Tryphen Emurugat. Before you speak with Tryphen directly, I need to understand your infrastructure bottlenecks to ensure a 1-on-1 call is the most efficient use of time.\n\nTo begin, what is the primary technical challenge or bottleneck your business is facing right now?" }
      ]);
    }, 1000);
  }, [leadId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || interviewComplete) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Mock AI Logic Tree
    setTimeout(() => {
      setIsTyping(false);
      
      if (messages.length === 2) {
        setMessages(prev => [...prev, { role: 'agent', content: "I see. And regarding your timeline and budget constraint—are you looking for a quick temporary patch, or are you prepared to invest in a scalable, 2030-ready foundation?" }]);
      } else if (messages.length === 4) {
        setMessages(prev => [...prev, { role: 'agent', content: "Understood. Based on your responses, I have compiled a preliminary architecture report. I will forward this to Tryphen for review. If he determines we are a good fit, you will receive a calendar link for your 1-on-1.\n\nThank you for your time." }]);
        setInterviewComplete(true);
        
        console.log(`[SYSTEM] Sending interview transcript to Admin OS...`);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden flex flex-col h-[80vh] shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#111] p-4 border-b border-gray-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-pink-500 font-bold tracking-widest text-sm">TRYPHEN.AI // QUALIFICATION MATRIX</span>
          </div>
          <div className="text-xs text-gray-600">SECURE SESSION</div>
        </div>

        {/* Chat Log */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-lg p-4 ${
                msg.role === 'system' ? 'w-full text-center text-xs text-gray-600 border border-gray-800/50 bg-black' :
                msg.role === 'user' ? 'bg-blue-900/20 border border-blue-800/50 text-blue-100' :
                'bg-white/5 border border-white/10 text-gray-300'
              }`}>
                {msg.role !== 'system' && (
                  <div className={`text-xs mb-2 font-bold ${msg.role === 'user' ? 'text-blue-400' : 'text-pink-500'}`}>
                    {msg.role === 'user' ? 'CLIENT' : 'SOLUTIONS ARCHITECT'}
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-w-[85%]">
                <div className="text-xs mb-2 font-bold text-pink-500">SOLUTIONS ARCHITECT</div>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 bg-[#111] border-t border-gray-800 shrink-0">
          {interviewComplete ? (
            <div className="text-center text-sm text-green-500 p-3 border border-green-900/30 bg-green-900/10 rounded">
              Interview Complete. You may close this window.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your response..."
                className="flex-1 bg-black border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                autoFocus
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-white/10 hover:bg-white/20 text-white px-6 rounded-md font-bold transition-colors disabled:opacity-50"
              >
                SEND
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
