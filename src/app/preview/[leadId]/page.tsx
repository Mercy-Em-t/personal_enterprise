'use client';

import { useState, use } from 'react';
import AntiScreenshot from '@/components/AntiScreenshot';

export default function SecureClientPreview({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = use(params);
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // Mocking the correct PIN based on the leadId (In reality, this would be a DB check)
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2050') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Access PIN. Please check the credentials provided in your email.');
      setPin('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0a0a0a] border border-gray-800 rounded-xl p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-blue-500"></div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-2">Secure Client Portal</h1>
            <p className="text-gray-500 text-sm">Enter your 4-digit PIN to access your customized architecture proposal.</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <input 
                type="password" 
                maxLength={4}
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[#111] border border-gray-800 rounded-lg p-4 text-center text-3xl tracking-[1em] text-white focus:outline-none focus:border-pink-500 font-mono"
                placeholder="••••"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
            </div>
            
            <button 
              type="submit" 
              disabled={pin.length < 4}
              className="w-full bg-white text-black hover:bg-gray-200 disabled:opacity-50 py-3 rounded-md font-bold transition-colors"
            >
              Decrypt Proposal
            </button>
          </form>
          
          <div className="mt-8 text-center text-xs text-gray-600 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            AES-256-GCM SECURED TUNNEL
          </div>
        </div>
      </div>
    );
  }

  // Authenticated View (The SOW / Proposal)
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans p-4 md:p-8">
      <AntiScreenshot />
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navbar */}
        <nav className="flex justify-between items-center bg-[#111] border border-gray-800 p-4 rounded-xl">
          <div className="text-white font-bold tracking-tight">TRYPHEN EMURUGAT</div>
          <button onClick={() => setIsAuthenticated(false)} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
            Secure Logout
          </button>
        </nav>

        {/* SOW Document */}
        <div className="bg-white text-black p-8 md:p-12 rounded-xl shadow-2xl">
          <div className="border-b-2 border-gray-200 pb-8 mb-8 flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tighter mb-2">STATEMENT OF WORK</h1>
              <div className="text-gray-500 font-mono text-sm">REF: SOW-{leadId.toUpperCase()}</div>
            </div>
            <div className="md:text-right">
              <div className="font-bold">PREPARED FOR</div>
              <div className="text-gray-600">Sarah Jenkins (TechFlow)</div>
              <div className="text-gray-600">August 15, 2026</div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">1. Executive Summary</h2>
              <p className="text-gray-700 leading-relaxed">
                Based on our AI architectural interview, your current monolith is failing 3x a week under peak load. 
                This statement of work outlines the complete migration to a decoupled, edge-cached React frontend and a highly scalable microservice backend to resolve the operational bottlenecks.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">2. Investment Structure</h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-sm font-semibold text-gray-900">Service Component</th>
                    <th className="p-4 text-sm font-semibold text-gray-900 text-right">Investment (KES)</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-b border-gray-200">
                  <tr>
                    <td className="p-4 text-gray-700">Architecture Audit & Technical Blueprint</td>
                    <td className="p-4 text-gray-900 font-mono text-right text-sm">250,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-700">Microservice Backend Refactor</td>
                    <td className="p-4 text-gray-900 font-mono text-right text-sm">650,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-700">High-Performance Frontend Migration</td>
                    <td className="p-4 text-gray-900 font-mono text-right text-sm">300,000</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td className="p-4 text-gray-900 font-bold text-right uppercase text-sm tracking-wider">Total Investment</td>
                    <td className="p-4 text-gray-900 font-bold font-mono text-right text-xl">1,200,000</td>
                  </tr>
                </tfoot>
              </table>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-12">
              <h3 className="font-bold text-blue-900 mb-2">Ready to initiate the build?</h3>
              <p className="text-blue-800 text-sm mb-4">Click below to digitally sign this SOW and initiate the first milestone invoice via our secure payment gateway.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow transition-colors">
                Accept & Sign Digitally
              </button>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}
