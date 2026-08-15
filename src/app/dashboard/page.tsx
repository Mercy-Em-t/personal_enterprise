'use client';

import { useState } from 'react';
import AntiScreenshot from '@/components/AntiScreenshot';
import Link from 'next/link';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('proposals');

  return (
    <div className="flex bg-[#050505] overflow-hidden min-h-screen text-white font-sans flex-col md:flex-row">
      <AntiScreenshot />
      
      {/* Sidebar */}
      <aside className="w-full md:w-[280px] bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-gray-800 p-6 flex flex-col z-20 shrink-0">
        <Link href="/" className="text-xl font-bold mb-8">
          tryphenemurugat<span className="text-yellow-500">.com</span>
        </Link>
        
        <div className="mb-12 pb-6 border-b border-gray-800">
          <div className="font-mono text-pink-500 text-xs mb-2">ACTIVE SESSION</div>
          <h4 className="m-0 text-lg font-bold">Acme Logistics Corp</h4>
          <p className="text-gray-400 m-0 text-sm">Enterprise Account</p>
        </div>

        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('proposals')}
            className={`text-left px-4 py-3 rounded-md transition-all text-sm flex items-center gap-3 ${
              activeTab === 'proposals'
                ? 'bg-blue-500/10 text-yellow-500 border-l-4 border-yellow-500'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            Active Proposals
          </button>
          <button
            onClick={() => setActiveTab('adrs')}
            className={`text-left px-4 py-3 rounded-md transition-all text-sm flex items-center gap-3 ${
              activeTab === 'adrs'
                ? 'bg-blue-500/10 text-yellow-500 border-l-4 border-yellow-500'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            Architecture Specs (ADRs)
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`text-left px-4 py-3 rounded-md transition-all text-sm flex items-center gap-3 ${
              activeTab === 'invoices'
                ? 'bg-blue-500/10 text-yellow-500 border-l-4 border-yellow-500'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            Invoices & Billing
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`text-left px-4 py-3 rounded-md transition-all text-sm flex items-center gap-3 ${
              activeTab === 'support'
                ? 'bg-blue-500/10 text-yellow-500 border-l-4 border-yellow-500'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            Support Tickets
          </button>
        </nav>

        <div className="mt-auto pt-6">
          <button className="w-full text-center px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors">
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto relative h-screen">
        {/* PANE: Active Proposals */}
        {activeTab === 'proposals' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Bespoke Service Proposals</h1>
              <p className="text-gray-400">Custom architectural blueprints prescribed based on our initial technical discovery call.</p>
            </div>

            <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 md:p-10 mb-8 relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-800 gap-4">
                <div>
                  <div className="font-mono text-pink-500 text-sm mb-2">PHASE 1: STRATEGY</div>
                  <h2 className="text-2xl font-bold m-0">System Architecture Audit</h2>
                </div>
                <div className="font-mono text-xl md:text-2xl bg-[#1a1a1a] px-4 py-2 rounded-md border border-gray-800">500,000 KES</div>
              </div>
              
              <p className="text-gray-400 mb-6">A comprehensive 2-week deep dive into your current legacy infrastructure to identify bottlenecks, security vulnerabilities, and database inefficiencies.</p>
              
              <ul className="list-none p-0 m-0 mb-8 space-y-3">
                <li className="pl-6 relative text-gray-400 before:content-['✓'] before:absolute before:left-0 before:text-yellow-500">End-to-end code review of existing monolith.</li>
                <li className="pl-6 relative text-gray-400 before:content-['✓'] before:absolute before:left-0 before:text-yellow-500">Database schema profiling and indexing analysis.</li>
                <li className="pl-6 relative text-gray-400 before:content-['✓'] before:absolute before:left-0 before:text-yellow-500">Delivery of a formal Architecture Decision Record (ADR) for the upgrade path.</li>
                <li className="pl-6 relative text-gray-400 before:content-['✓'] before:absolute before:left-0 before:text-yellow-500">Fixed-cost blueprint for Phase 2 Implementation.</li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">Accept & Sign SOW</button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition-colors">Download PDF Proposal</button>
              </div>
            </div>

            {/* Proposal 2 */}
            <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 md:p-10 mb-8 relative overflow-hidden opacity-50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-800 gap-4">
                <div>
                  <div className="font-mono text-pink-500 text-sm mb-2">PHASE 2: IMPLEMENTATION</div>
                  <h2 className="text-2xl font-bold m-0">Core Microservice Refactor</h2>
                </div>
                <div className="font-mono text-xl md:text-2xl bg-[#1a1a1a] px-4 py-2 rounded-md border border-gray-800 opacity-50">TBD</div>
              </div>
              <p className="text-gray-400 mb-6">Locked until completion of Phase 1. This phase covers the actual engineering labor to extract your logistics tracking into an isolated, high-performance microservice.</p>
              <div className="p-4 bg-black/50 border border-dashed border-gray-800 rounded text-center">
                <p className="font-mono text-gray-500 m-0 text-sm">PENDING PHASE 1 COMPLETION</p>
              </div>
            </div>
          </div>
        )}

        {/* PANE: ADRs */}
        {activeTab === 'adrs' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Architecture Docs (ADRs)</h1>
              <p className="text-gray-400">Secure technical specifications and architecture decision records for your infrastructure.</p>
            </div>
            <div className="bg-[#111111] border border-gray-800 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 md:p-8 mb-6">
                <div>
                    <h3 className="text-lg font-bold m-0 mb-2">ADR-001: Initial State Analysis</h3>
                    <p className="font-mono text-gray-500 m-0 text-sm">Published: Oct 12, 2026</p>
                </div>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors text-sm w-full md:w-auto">View Document</button>
            </div>
            <div className="bg-[#111111] border border-gray-800 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 md:p-8 opacity-50">
                <div>
                    <h3 className="text-lg font-bold m-0 mb-2">ADR-002: Target Architecture Blueprint</h3>
                    <p className="font-mono text-gray-500 m-0 text-sm">Status: Drafting</p>
                </div>
                <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded-md transition-colors text-sm cursor-not-allowed w-full md:w-auto" disabled>Locked</button>
            </div>
          </div>
        )}

        {/* PANE: Invoices */}
        {activeTab === 'invoices' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Invoices & Billing</h1>
              <p className="text-gray-400">Track payments, download receipts, and manage your billing methods.</p>
            </div>
            <div className="overflow-x-auto bg-[#111111] border border-gray-800 rounded-xl">
                <table className="w-full border-collapse text-left min-w-[600px]">
                    <thead>
                        <tr className="border-b border-gray-800 text-gray-400">
                            <th className="p-4 uppercase tracking-wider text-xs">Invoice</th>
                            <th className="p-4 uppercase tracking-wider text-xs">Amount</th>
                            <th className="p-4 uppercase tracking-wider text-xs">Status</th>
                            <th className="p-4 text-right uppercase tracking-wider text-xs">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-white/5">
                            <td className="p-4 md:py-6 md:px-4">
                                <strong className="block mb-1 text-sm md:text-base">INV-2026-042</strong>
                                <span className="text-gray-500 text-xs md:text-sm">Phase 1: Architecture Audit (Retainer)</span>
                            </td>
                            <td className="p-4 md:py-6 md:px-4 font-mono text-sm md:text-base">250,000 KES</td>
                            <td className="p-4 md:py-6 md:px-4"><span className="text-green-500 bg-green-500/10 px-3 py-1 rounded text-xs">PAID</span></td>
                            <td className="p-4 md:py-6 md:px-4 text-right"><button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors text-sm">Download PDF</button></td>
                        </tr>
                        <tr>
                            <td className="p-4 md:py-6 md:px-4">
                                <strong className="block mb-1 text-sm md:text-base">INV-2026-043</strong>
                                <span className="text-gray-500 text-xs md:text-sm">Phase 1: Architecture Audit (Final)</span>
                            </td>
                            <td className="p-4 md:py-6 md:px-4 font-mono text-sm md:text-base">250,000 KES</td>
                            <td className="p-4 md:py-6 md:px-4"><span className="text-red-500 bg-red-500/10 px-3 py-1 rounded text-xs">DUE OCT 30</span></td>
                            <td className="p-4 md:py-6 md:px-4 text-right"><button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm">Pay Now</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        )}

        {/* PANE: Support */}
        {activeTab === 'support' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Priority Support</h1>
              <p className="text-gray-400">Open a high-priority support ticket directly with the engineering team.</p>
            </div>
            
            <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 md:p-10">
                <form onSubmit={(e) => { e.preventDefault(); alert('Ticket Submitted'); }}>
                    <div className="mb-6">
                        <label className="block mb-2 text-gray-400 text-sm">Urgency Level</label>
                        <select className="w-full p-3 bg-[#1a1a1a] border border-gray-800 text-white rounded-md focus:outline-none focus:border-blue-500 text-sm md:text-base">
                            <option>Low - General Inquiry</option>
                            <option>Medium - Non-Critical Bug</option>
                            <option>High - Production Issue</option>
                            <option>CRITICAL - System Outage</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-gray-400 text-sm">Issue Description</label>
                        <textarea rows={5} className="w-full p-3 bg-[#1a1a1a] border border-gray-800 text-white rounded-md focus:outline-none focus:border-blue-500 text-sm md:text-base" placeholder="Describe the issue in detail..."></textarea>
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors w-full md:w-auto">Submit Ticket</button>
                </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
