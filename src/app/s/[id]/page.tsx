'use client';

import { use } from 'react';

export default function ServiceDetailHub({ params }: { params: Promise<{ id: string }> }) {
  const { id: serviceId } = use(params);

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans p-4 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-gray-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Custom Enterprise Infrastructure
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Scalable full-stack applications, secure multi-tenant architectures, and zero-dependency deployments.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-l-4 border-pink-500 pl-4">Standard Operating Procedures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#111] p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-2">Phase 1: Architecture Audit</h3>
              <p className="text-gray-400 text-sm">We analyze your current stack, database load, and deployment constraints before writing a single line of code.</p>
            </div>
            <div className="bg-[#111] p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-2">Phase 2: Data Schemas</h3>
              <p className="text-gray-400 text-sm">Relational blueprints and payload definitions ensure data integrity across all microservices.</p>
            </div>
            <div className="bg-[#111] p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-2">Phase 3: Headless Build</h3>
              <p className="text-gray-400 text-sm">Decoupled React frontends with high-performance edge caching.</p>
            </div>
            <div className="bg-[#111] p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-2">Phase 4: Handoff</h3>
              <p className="text-gray-400 text-sm">Zero-friction integration, load testing, and comprehensive technical documentation.</p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#111] to-black border border-gray-800 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Ready to proceed?</h2>
            <p className="text-gray-400 text-sm">Let our AI assist you in scoping the project, or jump straight to checkout if you have a brief.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <a href={`/a/${serviceId}`} className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md font-bold transition-colors text-center w-full md:w-auto">
              Help Me Define Scope
            </a>
            <a href={`/q/${serviceId}`} className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-6 py-3 rounded-md font-bold transition-colors text-center w-full md:w-auto">
              I Have My Specs
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
