'use client';

import { useState } from 'react';
import Link from 'next/link';
import AntiScreenshot from '@/components/AntiScreenshot';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('catalog');

  // Generator State
  const [services, setServices] = useState([
    { id: 1, name: 'Architecture Audit', price: 500000, type: 'Core', checked: true },
    { id: 2, name: 'Auth Pipeline Microservice', price: 850000, type: 'Micro', checked: false },
    { id: 3, name: 'Enterprise DB Sharding', price: 1200000, type: 'Micro', checked: false }
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceType, setNewServiceType] = useState('CORE');

  // Report Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Secure Preview State
  const [generatedPreview, setGeneratedPreview] = useState<{ url: string; pin: string } | null>(null);

  // Agentic Insights State
  const [leads, setLeads] = useState([
    {
      id: 'L-1002',
      name: 'Sarah Jenkins (TechFlow)',
      email: 'sarah@techflow.io',
      service: 'Custom Logistics Backend',
      status: 'INTERVIEW_COMPLETED',
      insight: {
        estimatedBudget: 1200000,
        urgencyScore: 9,
        techStack: ['Legacy Monolith', 'Spreadsheets'],
        recommendedServices: [1, 2, 3], // Recommends everything
        riskAnalysis: 'High operational risk due to legacy tech stack. High probability of converting to retainer.',
        finalReport: 'Client admitted their current monolith is failing 3x a week under peak load. They need a scalable, decoupled architecture immediately. Budget is highly flexible for the right solution.'
      }
    },
    {
      id: 'L-1003',
      name: 'Marcus Bell (Acme Corp)',
      email: 'mbell@acmecorp.com',
      service: 'General Inquiry',
      status: 'INTERVIEW_PENDING',
      insight: null
    }
  ]);

  const openReport = (lead: any) => {
    setSelectedReport(lead);
    setIsReportModalOpen(true);
  };

  const handleAutoGenerateSOW = (recommendedServiceIds: number[]) => {
    // Check only the recommended services
    const updatedServices = services.map(s => ({
      ...s,
      checked: recommendedServiceIds.includes(s.id)
    }));
    setServices(updatedServices);
    
    // Instead of switching tabs, we generate the secure preview link
    const pin = '2050'; // In a real app, generate securely: Math.floor(1000 + Math.random() * 9000).toString();
    const leadId = selectedReport?.id || 'L-1002';
    
    setGeneratedPreview({
      url: `http://localhost:3000/preview/${leadId}`,
      pin
    });
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    setServices([...services, {
      id: newId,
      name: newServiceName,
      price: Number(newServicePrice),
      type: newServiceType,
      checked: true
    }]);
    setIsModalOpen(false);
    setNewServiceName('');
    setNewServicePrice('');
  };

  const toggleService = (id: number) => {
    setServices(services.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  const total = services.filter(s => s.checked).reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans flex flex-col md:flex-row overflow-hidden">
      <AntiScreenshot />
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-[280px] bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-gray-800 p-6 flex flex-col z-20 shrink-0">
        <Link href="/" className="text-xl font-bold mb-8">
          tryphenemurugat<span className="text-yellow-500">.com</span>
        </Link>
        
        <div className="mb-12 pb-6 border-b border-gray-800">
          <div className="font-mono text-pink-500 text-xs mb-2">SYSTEM ADMINISTRATOR</div>
          <h4 className="m-0 text-lg font-bold">Tryphen Emurugat</h4>
          <p className="text-gray-400 m-0 text-sm">Internal Agency OS v1.0</p>
        </div>

        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`text-left px-4 py-3 rounded-md transition-all text-sm flex items-center gap-3 ${
              activeTab === 'catalog'
                ? 'bg-pink-500/10 text-pink-500 border-l-4 border-pink-500'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            Service Catalog Builder
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`text-left px-4 py-3 rounded-md transition-all text-sm flex items-center gap-3 ${
              activeTab === 'generator'
                ? 'bg-pink-500/10 text-pink-500 border-l-4 border-pink-500'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            Proposal Generator
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`text-left px-4 py-3 rounded-md transition-all text-sm flex items-center gap-3 ${
              activeTab === 'insights'
                ? 'bg-pink-500/10 text-pink-500 border-l-4 border-pink-500'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Agentic Insights
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`text-left px-4 py-3 rounded-md transition-all text-sm flex items-center gap-3 ${
              activeTab === 'clients'
                ? 'bg-pink-500/10 text-pink-500 border-l-4 border-pink-500'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            Active Clients
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`text-left px-4 py-3 rounded-md transition-all text-sm flex items-center gap-3 ${
              activeTab === 'settings'
                ? 'bg-pink-500/10 text-pink-500 border-l-4 border-pink-500'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            System Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto relative h-screen">
        
        {/* PANE: Catalog Builder */}
        {activeTab === 'catalog' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Service Catalog Builder</h1>
                <p className="text-gray-400">Define your internal core offerings, microservices, and high-margin upsells.</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors shrink-0" onClick={() => setIsModalOpen(true)}>
                + Add New Service
              </button>
            </div>

            <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 md:p-8 overflow-x-auto">
              <h3 className="text-xl font-bold mt-0 mb-6">Global Service Inventory</h3>
              <table className="w-full border-collapse text-left min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-gray-800 text-gray-400 uppercase tracking-wider text-xs">SKU / Service Name</th>
                    <th className="p-4 border-b border-gray-800 text-gray-400 uppercase tracking-wider text-xs">Category</th>
                    <th className="p-4 border-b border-gray-800 text-gray-400 uppercase tracking-wider text-xs">Base Price (KES)</th>
                    <th className="p-4 border-b border-gray-800 text-gray-400 uppercase tracking-wider text-xs">Billing Type</th>
                    <th className="p-4 border-b border-gray-800 text-gray-400 uppercase tracking-wider text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-4">
                      <strong className="block mb-1">Architecture Audit</strong>
                      <span className="text-gray-500 text-xs">Deep dive legacy system review</span>
                    </td>
                    <td className="p-4"><span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-mono">CORE</span></td>
                    <td className="p-4 font-mono">500,000</td>
                    <td className="p-4 text-sm">Fixed / Milestone</td>
                    <td className="p-4"><button className="text-pink-500 hover:underline text-sm">Edit</button></td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">
                      <strong className="block mb-1">Auth Pipeline Microservice</strong>
                      <span className="text-gray-500 text-xs">Isolated SSO & JWT system</span>
                    </td>
                    <td className="p-4"><span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-mono">MICROSERVICE</span></td>
                    <td className="p-4 font-mono">850,000</td>
                    <td className="p-4 text-sm">Fixed / Milestone</td>
                    <td className="p-4"><button className="text-pink-500 hover:underline text-sm">Edit</button></td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">
                      <strong className="block mb-1">Enterprise DB Sharding</strong>
                      <span className="text-gray-500 text-xs">Postgres horizontal scaling</span>
                    </td>
                    <td className="p-4"><span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-mono">MICROSERVICE</span></td>
                    <td className="p-4 font-mono">1,200,000</td>
                    <td className="p-4 text-sm">Fixed / Milestone</td>
                    <td className="p-4"><button className="text-pink-500 hover:underline text-sm">Edit</button></td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">
                      <strong className="block mb-1">Domain Procurement & Setup</strong>
                      <span className="text-gray-500 text-xs">DNS, SSL, CDN configuration</span>
                    </td>
                    <td className="p-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-mono">UPSELL / ADD-ON</span></td>
                    <td className="p-4 font-mono">15,000</td>
                    <td className="p-4 text-sm">One-time Checkbox</td>
                    <td className="p-4"><button className="text-pink-500 hover:underline text-sm">Edit</button></td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <strong className="block mb-1">Google Workspace Mail Setup</strong>
                      <span className="text-gray-500 text-xs">MX records, SPF/DKIM</span>
                    </td>
                    <td className="p-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-mono">UPSELL / ADD-ON</span></td>
                    <td className="p-4 font-mono">25,000</td>
                    <td className="p-4 text-sm">One-time Checkbox</td>
                    <td className="p-4"><button className="text-pink-500 hover:underline text-sm">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PANE: Proposal Generator */}
        {activeTab === 'generator' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Proposal / SOW Generator</h1>
              <p className="text-gray-400">Bundle services from your catalog to generate a secure client dashboard view and PDF.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Builder Controls */}
              <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold mt-0 pb-4 border-b border-gray-800 mb-6">1. Select Client</h3>
                <div className="mb-8">
                    <select className="w-full p-3 bg-black border border-gray-800 rounded-md text-white focus:outline-none focus:border-pink-500">
                        <option>Acme Logistics Corp (CID: 001)</option>
                        <option>RetailFlow Ltd (CID: 002)</option>
                        <option>+ Add New Client</option>
                    </select>
                </div>
                
                <h3 className="text-xl font-bold mt-0 pb-4 border-b border-gray-800 mb-6">2. Bundle Services</h3>
                
                <div className="space-y-4 mb-8">
                  {services.map(service => (
                    <label key={service.id} className="flex items-center gap-4 cursor-pointer p-4 bg-white/5 rounded-md hover:bg-white/10 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={service.checked}
                        onChange={() => toggleService(service.id)}
                        className="w-5 h-5 accent-pink-500"
                      />
                      <div>
                          <strong className="block text-white">{service.name}</strong>
                          <div className="font-mono text-gray-400 text-xs mt-1">{(service.price).toLocaleString()} KES ({service.type})</div>
                      </div>
                    </label>
                  ))}
                </div>

                <h3 className="text-xl font-bold mt-0 pb-4 border-b border-gray-800 mb-6">3. Configure Upsells (Checkout Options)</h3>
                <p className="text-gray-500 text-sm mb-4">These will appear as optional add-ons when the client clicks &quot;Accept & Sign&quot;.</p>
                <div className="space-y-3 mb-8">
                    <label className="flex items-center gap-3 text-sm text-gray-300"><input type="checkbox" defaultChecked className="accent-pink-500" /> Offer: Domain Procurement (15,000 KES)</label>
                    <label className="flex items-center gap-3 text-sm text-gray-300"><input type="checkbox" defaultChecked className="accent-pink-500" /> Offer: Google Workspace Mail Setup (25,000 KES)</label>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-colors font-medium">Deploy to Client Portal</button>
              </div>

              {/* Live Preview */}
              <div>
                <div className="bg-white text-black p-8 md:p-10 rounded-xl shadow-2xl">
                    <div className="flex flex-col sm:flex-row justify-between border-b-2 border-gray-200 pb-6 mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold m-0 text-gray-900 tracking-tight">STATEMENT OF WORK</h2>
                            <p className="text-gray-600 m-0 text-sm mt-1">Prepared for: Acme Logistics Corp</p>
                        </div>
                        <div className="sm:text-right">
                            <div className="font-mono font-bold text-gray-900">T. EMURUGAT</div>
                            <div className="text-gray-600 text-xs">Systems Architect</div>
                        </div>
                    </div>

                    <div className="min-h-[200px] space-y-4">
                      {services.filter(s => s.checked).length > 0 ? (
                        services.filter(s => s.checked).map(s => (
                          <div key={s.id} className="flex justify-between text-gray-800">
                            <div className="font-medium text-sm md:text-base">{s.name}</div>
                            <div className="font-mono font-medium">{(s.price).toLocaleString()} KES</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-400 italic text-sm">No services selected.</div>
                      )}
                    </div>

                    <div className="border-t-2 border-gray-200 pt-6 text-right mt-8">
                        <div className="text-gray-600 text-sm mb-1 uppercase tracking-wider font-semibold">Subtotal</div>
                        <div className="text-2xl md:text-3xl font-bold font-mono text-gray-900">
                          {total.toLocaleString()} KES
                        </div>
                    </div>
                </div>
                
                <p className="text-center text-gray-500 mt-6 text-sm">Live Preview of Client Document</p>
              </div>
            </div>
          </div>
        )}

        {/* PANE: Agentic Insights */}
        {activeTab === 'insights' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Agentic Lead Intelligence</h1>
            <p className="text-gray-400 mb-8">Incoming leads are automatically intercepted, enriched, and scored by your AI pipeline before hitting your inbox.</p>
            
            <div className="space-y-6">
              {leads.map(lead => (
                <div key={lead.id} className="bg-[#111] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
                  {lead.status === 'INTERVIEW_PENDING' && (
                    <div className="absolute top-0 right-0 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 text-xs font-bold rounded-bl-lg">AWAITING INTERVIEW</div>
                  )}
                  {lead.status === 'INTERVIEW_COMPLETED' && (
                    <div className="absolute top-0 right-0 bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 text-xs font-bold rounded-bl-lg">INTERVIEW COMPLETED</div>
                  )}

                  <div className="flex justify-between items-start mb-6 mt-2">
                    <div>
                      <div className="text-pink-500 font-mono text-sm mb-1">{lead.id}</div>
                      <h2 className="text-2xl font-bold text-white">{lead.name}</h2>
                      <p className="text-gray-400 text-sm">{lead.email} | {lead.service}</p>
                    </div>
                    {lead.insight && (
                      <div className="text-right">
                        <div className="text-gray-400 text-sm mb-1">AI Calculated Budget Capacity</div>
                        <div className="text-2xl font-mono text-green-400">{lead.insight.estimatedBudget.toLocaleString()} KES</div>
                      </div>
                    )}
                  </div>
                  
                  {lead.insight ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-black/50 p-4 rounded border border-gray-800">
                          <div className="text-xs text-gray-500 font-mono mb-2">URGENCY SCORE</div>
                          <div className="text-xl font-bold text-white">{lead.insight.urgencyScore} / 10</div>
                        </div>
                        <div className="bg-black/50 p-4 rounded border border-gray-800">
                          <div className="text-xs text-gray-500 font-mono mb-2">DETECTED TECH STACK</div>
                          <div className="text-sm text-gray-300">{lead.insight.techStack.join(', ')}</div>
                        </div>
                        <div className="bg-black/50 p-4 rounded border border-gray-800">
                          <div className="text-xs text-gray-500 font-mono mb-2">RISK ANALYSIS</div>
                          <div className="text-sm text-gray-300">{lead.insight.riskAnalysis}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-4 border-t border-gray-800 gap-4">
                        <button 
                          onClick={() => openReport(lead)}
                          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                        >
                          View Interview Report
                        </button>
                        <button 
                          onClick={() => handleAutoGenerateSOW(lead.insight.recommendedServices)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                          Auto-Generate SOW
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-8 bg-black/30 rounded border border-gray-800/50">
                      <div className="inline-block w-8 h-8 rounded-full border-2 border-gray-600 border-t-pink-500 animate-spin mb-4"></div>
                      <p className="text-gray-500 text-sm">Agent is waiting for client to complete the interview chat...</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Placeholder Panes */}
        {activeTab === 'clients' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Active Clients DB</h1>
            <p className="text-gray-400">CRM features and client onboarding pipelines would live here.</p>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">System Settings</h1>
            <p className="text-gray-400">API keys, Stripe integration, and global configurations.</p>
          </div>
        )}
      </main>

      {/* Add New Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-gray-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Add New Service</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleAddService} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Service Name</label>
                <input required type="text" value={newServiceName} onChange={e => setNewServiceName(e.target.value)} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:outline-none focus:border-pink-500" placeholder="e.g. SEO Audit" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Base Price (KES)</label>
                <input required type="number" min="0" value={newServicePrice} onChange={e => setNewServicePrice(e.target.value)} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:outline-none focus:border-pink-500" placeholder="e.g. 50000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                  <select value={newServiceType} onChange={e => setNewServiceType(e.target.value)} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:outline-none focus:border-pink-500">
                    <option value="CORE">CORE</option>
                    <option value="MICROSERVICE">MICROSERVICE</option>
                    <option value="UPSELL">UPSELL / ADD-ON</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Billing Type</label>
                  <select className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:outline-none focus:border-pink-500">
                    <option>Fixed / Milestone</option>
                    <option>Retainer</option>
                    <option>One-time Checkbox</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Interview Report Modal */}
      {isReportModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-gray-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-black">
              <div>
                <h2 className="text-xl font-bold text-white">AI Interview Report</h2>
                <div className="text-sm text-pink-500 font-mono">{selectedReport.name}</div>
              </div>
              <button onClick={() => setIsReportModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-xs font-mono text-gray-500 mb-2">EXECUTIVE SUMMARY</h3>
                <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-pink-500 pl-4">{selectedReport.insight.finalReport}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black p-4 rounded border border-gray-800">
                  <div className="text-xs font-mono text-gray-500 mb-1">RECOMMENDED ACTION</div>
                  <div className="font-bold text-white">Proceed to 1-on-1 Call</div>
                </div>
                <div className="bg-black p-4 rounded border border-gray-800">
                  <div className="text-xs font-mono text-gray-500 mb-1">PROPOSED SOW VALUE</div>
                  <div className="font-bold text-green-400 font-mono">{selectedReport.insight.estimatedBudget.toLocaleString()} KES</div>
                </div>
              </div>
              
              <div className="flex gap-4 justify-end">
                <button 
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-6 py-3 rounded text-sm text-gray-400 hover:text-white transition-colors border border-gray-800 hover:bg-gray-800"
                >
                  Close Report
                </button>
                <button 
                  onClick={() => {
                    setIsReportModalOpen(false);
                    handleAutoGenerateSOW(selectedReport.insight.recommendedServices);
                  }}
                  className="px-6 py-3 rounded text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                >
                  Accept & Generate Secure Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generated Secure Link Modal */}
      {generatedPreview && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-green-500/30 rounded-xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-800 text-center bg-green-500/10">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 text-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h2 className="text-xl font-bold text-white">SOW Encrypted & Ready</h2>
              <p className="text-gray-400 text-sm mt-1">Send these details to your client to grant them access.</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase">Secure Preview Link</label>
                <div className="bg-black border border-gray-800 p-3 rounded text-blue-400 font-mono text-sm break-all">
                  {generatedPreview.url}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase">Access PIN (Secret)</label>
                <div className="bg-black border border-gray-800 p-4 rounded text-center text-white font-mono text-3xl tracking-[0.5em] font-bold">
                  {generatedPreview.pin}
                </div>
              </div>
              
              <button 
                onClick={() => setGeneratedPreview(null)}
                className="w-full bg-white text-black font-bold py-3 rounded-md hover:bg-gray-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
