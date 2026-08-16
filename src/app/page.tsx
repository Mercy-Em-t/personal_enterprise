'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    "Welcome to Tryphen Emurugat's interactive server. Type <span class='text-pink-500'>help</span> for a list of commands."
  ]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
      let response = '';

      if (command === 'help') {
        response = "Available commands: <br> - <span class='text-pink-500'>about</span>: Learn about my background <br> - <span class='text-pink-500'>skills</span>: View technical stack <br> - <span class='text-pink-500'>contact</span>: Get in touch <br> - <span class='text-pink-500'>clear</span>: Clear terminal";
      } else if (command === 'about') {
        response = "I am a Senior Systems Architect specializing in building high-performance, secure, and scalable web infrastructure for enterprise clients.";
      } else if (command === 'skills') {
        response = "Core Stack: React/Next.js, Node.js, PostgreSQL, TypeScript, Microservices, CI/CD pipelines, and Secure API Design.";
      } else if (command === 'contact') {
        response = "Scroll down to the Inquire section or email me directly at <a href='mailto:hello@tryphenemurugat.com' class='text-blue-400'>hello@tryphenemurugat.com</a>";
      } else if (command === 'init_core') {
        window.location.href = '/admin';
        return;
      } else if (command === 'clear') {
        setTerminalHistory(["Welcome to Tryphen Emurugat's interactive server. Type <span class='text-pink-500'>help</span> for a list of commands."]);
        setTerminalInput('');
        return;
      } else if (command === '') {
        response = "";
      } else {
        response = `bash: ${command}: command not found`;
      }

      const newHistory = [...terminalHistory];
      if (command !== '') {
          newHistory.push(`<span class="text-green-400">guest@tryphenemurugat:~$</span> ${command}`);
      } else {
          newHistory.push(`<span class="text-green-400">guest@tryphenemurugat:~$</span>`);
      }
      if (response) newHistory.push(response);
      
      setTerminalHistory(newHistory);
      setTerminalInput('');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-pink-500/30 selection:text-pink-300">
      
      {/* Background glow effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none mix-blend-screen z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-400/10 blur-[100px] pointer-events-none mix-blend-screen z-0"></div>

      <nav className="fixed w-full z-50 border-b border-white/10 backdrop-blur-md bg-black/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            tryphenemurugat<span className="text-yellow-500">.com</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#work" className="text-gray-300 hover:text-white transition-colors">Work</a>
            <a href="#capabilities" className="text-gray-300 hover:text-white transition-colors">Capabilities</a>
            <a href="#process" className="text-gray-300 hover:text-white transition-colors">Process</a>
            <a href="#contact" className="text-yellow-500 hover:text-yellow-400 transition-colors">Inquire</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section id="hero" className="min-h-[90vh] flex items-center py-20">
          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-medium tracking-wide uppercase">Available for Select Q3/Q4 Projects</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                Engineering <span className="text-yellow-500">High-Performance</span> Platforms, Custom Commerce & Automated Cloud Infrastructure.
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                I design and deploy scalable full-stack applications, secure multi-tenant architectures, and payment integrations engineered for reliability.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#work" className="inline-flex justify-center items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
                  Explore Production Architecture
                </a>
                <a href="#contact" className="inline-flex justify-center items-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-md font-medium transition-colors">
                  Inquire for Q3/Q4 Project
                </a>
              </div>
              <p className="font-mono text-gray-500 text-sm">TYPICAL ENGAGEMENT: Starting from $2,500 / KES 300K</p>
            </div>
            
            <div className="hidden lg:block relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-square lg:aspect-[4/5] animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
              <img src="/hero_architecture_1786701529151.jpg" alt="Architecture Visualization" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* The Moat */}
        <section id="moat" className="py-20 bg-black/40 border-y border-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-yellow-500 text-xl font-bold mb-4">Production-Grade Architecture</h3>
                <p className="text-gray-400 leading-relaxed">Real relational schemas, secure session management, and microservice/agentic automation. No shortcuts.</p>
              </div>
              <div>
                <h3 className="text-yellow-500 text-xl font-bold mb-4">Turnkey Integrations</h3>
                <p className="text-gray-400 leading-relaxed">End-to-end payment gateway plumbing, transactional pipelines, and instant lead processing.</p>
              </div>
              <div>
                <h3 className="text-yellow-500 text-xl font-bold mb-4">Zero Dependency Bloat</h3>
                <p className="text-gray-400 leading-relaxed">Bespoke, ultra-fast headless builds without fragile page-builder plugins or unnecessary bloat.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="work" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-20">Interactive <span className="text-yellow-500">Flagship</span> Case Studies</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32 group">
              <div className="order-2 lg:order-1">
                <div className="font-mono text-pink-500 text-sm mb-4">01 // Multi-Tenant Logistics Platform</div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Apex Logistics Core</h3>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed mb-8">
                    <p><strong className="text-white">The Challenge:</strong> Legacy spreadsheet-based tracking causing 20% shipment loss and operational bottlenecks.</p>
                    <p><strong className="text-white">The Architecture:</strong> Built a custom headless CMS architecture with isolated multi-tenant relational databases (PostgreSQL) and real-time WebSocket updates.</p>
                    <p><strong className="text-white">Trade-offs:</strong> Sacrificed minor write-latency to guarantee 100% read consistency across 5 million records, ensuring zero data-race conditions during peak load.</p>
                </div>
                <button className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-md text-sm font-medium transition-colors mb-6">
                  View Architecture Doc (ADR)
                </button>
                <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 text-blue-200 text-sm rounded-r-md">
                  Outcome: Zero-downtime scalability, saving 20M KES annually in operational overhead.
                </div>
              </div>
              <div className="order-1 lg:order-2 bg-white/5 border border-white/10 rounded-2xl aspect-[4/3] lg:aspect-square relative overflow-hidden group-hover:border-white/20 transition-colors duration-500 flex items-center justify-center">
                  <img src="/logistics_dashboard_1786701538451.jpg" alt="Logistics Dashboard" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
              <div className="bg-white/5 border border-white/10 rounded-2xl aspect-[4/3] lg:aspect-square relative overflow-hidden group-hover:border-white/20 transition-colors duration-500 flex items-center justify-center">
                  <img src="/ecommerce_pipeline_1786701549217.jpg" alt="E-Commerce API Pipeline" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-mono text-pink-500 text-sm mb-4">02 // Automated E-Commerce Pipeline</div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">RetailFlow Integration</h3>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed mb-8">
                    <p><strong className="text-white">The Challenge:</strong> Manual payment reconciliation and order processing leading to fulfillment delays.</p>
                    <p><strong className="text-white">The Architecture:</strong> Automated backend pipelines integrating Daraja/M-Pesa API directly with a custom inventory state machine.</p>
                    <p><strong className="text-white">Trade-offs:</strong> Opted for a complex state machine over simple webhooks to ensure idempotent transaction processing, preventing double-billing during network timeouts.</p>
                </div>
                <button className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-md text-sm font-medium transition-colors mb-6">
                  View Architecture Doc (ADR)
                </button>
                <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 text-blue-200 text-sm rounded-r-md">
                  Outcome: Faster load times and 100% automated workflows.
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Tech Capabilities */}
        <section id="capabilities" className="py-20 bg-black/60 border-y border-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-16">Systems Architecture & <span className="text-yellow-500">Tech Capabilities</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                <div className="bg-[#111] border border-white/10 p-8 rounded-xl hover:bg-[#151515] hover:border-white/20 transition-all duration-300">
                    <h4 className="text-pink-500 text-lg font-bold mb-3">Frontend & Interfaces</h4>
                    <p className="text-gray-400">Modern reactive apps, dynamic dashboards, high-performance UI/UX.</p>
                </div>
                <div className="bg-[#111] border border-white/10 p-8 rounded-xl hover:bg-[#151515] hover:border-white/20 transition-all duration-300">
                    <h4 className="text-pink-500 text-lg font-bold mb-3">Backend & Cloud Services</h4>
                    <p className="text-gray-400">REST/GraphQL APIs, real-time relational databases, state machines, and microservices.</p>
                </div>
                <div className="bg-[#111] border border-white/10 p-8 rounded-xl hover:bg-[#151515] hover:border-white/20 transition-all duration-300">
                    <h4 className="text-pink-500 text-lg font-bold mb-3">Integration & Automation</h4>
                    <p className="text-gray-400">Custom payment gateways, automated lead funnels, background job queues.</p>
                </div>
                <div className="bg-[#111] border border-white/10 p-8 rounded-xl hover:bg-[#151515] hover:border-white/20 transition-all duration-300">
                    <h4 className="text-pink-500 text-lg font-bold mb-3">DevOps & Infrastructure</h4>
                    <p className="text-gray-400">Custom domain routing, multi-tenant architectures, secure preview environments, and cloud deployments.</p>
                </div>
            </div>

            {/* Interactive Terminal */}
            <div className="max-w-4xl mx-auto bg-[#0a0a0a] rounded-lg overflow-hidden border border-gray-800 shadow-2xl font-mono" onClick={() => document.getElementById('terminal-input')?.focus()}>
                <div className="bg-[#1a1a1a] px-4 py-3 flex items-center border-b border-gray-800">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-gray-400 text-xs font-medium">guest@tryphenemurugat: ~</div>
                </div>
                <div className="p-6 text-sm text-gray-300 min-h-[300px] flex flex-col cursor-text">
                    {terminalHistory.map((line, i) => (
                      <div key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: line }}></div>
                    ))}
                    <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 mt-2 w-full">
                        <span className="text-green-400 whitespace-nowrap">guest@tryphenemurugat:~$</span>
                        <input 
                          id="terminal-input"
                          type="text" 
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none text-gray-300 font-mono shadow-none focus:ring-0"
                          autoComplete="off"
                        />
                    </form>
                </div>
            </div>
          </div>
        </section>

      </main>
      
      <footer className="py-16 text-center border-t border-white/10 relative z-10 bg-black mt-20">
        <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 bg-[#111] border border-white/10 px-6 py-2 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="font-mono text-gray-400 text-xs tracking-wider">GLOBAL INFRASTRUCTURE: UPTIME 99.99% | API LATENCY 42MS | ACTIVE NODES: 12</span>
            </div>
            <p className="font-mono text-gray-500 text-sm mb-6">&copy; 2026 Tryphen eMurugat. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">WhatsApp</a>
                <Link href="/dashboard" className="text-yellow-500 hover:text-yellow-400 transition-colors">Client Portal</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}
