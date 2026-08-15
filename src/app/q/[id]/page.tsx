'use client';

import { useState, useRef, use } from 'react';

export default function CuratedIntakeForm({ params }: { params: Promise<{ id: string }> }) {
  const { id: serviceId } = use(params);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'scanning' | 'passed' | 'rejected'>('idle');
  const [securityMessage, setSecurityMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = async (selectedFile: File) => {
    setFile(selectedFile);
    setUploadStatus('scanning');
    setSecurityMessage('Running Zero-Trust Security Diagnostics...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (!res.ok) {
        setUploadStatus('rejected');
        setSecurityMessage(`[VIOLATION] ${data.error || 'Unknown Security Exception'}`);
      } else {
        setUploadStatus('passed');
        setSecurityMessage(`[CLEAN] ${data.message}`);
      }
    } catch (err) {
      setUploadStatus('rejected');
      setSecurityMessage('[VIOLATION] Network/CORS policy rejected the payload stream.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only allow submit if a file wasn't rejected
    if (uploadStatus === 'rejected') return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-gray-300 font-sans p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#111] border border-gray-800 rounded-xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Requirements Secured.</h2>
          <p className="text-gray-400 text-sm">
            Your project specifications and verified files have been safely delivered to our architecture partners.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-pink-900/20 border-b border-pink-900/30 p-4 text-center">
          <span className="text-pink-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            Zero-Trust File Ingestion
          </span>
        </div>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Upload Project Brief</h2>
          <p className="text-gray-400 text-sm mb-6">Drag and drop your specification documents (PDF, DOCX) here. All files are scanned prior to internal storage ingestion.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* DRAG AND DROP ZONE */}
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                uploadStatus === 'scanning' ? 'border-blue-500 bg-blue-900/10' :
                uploadStatus === 'passed' ? 'border-green-500 bg-green-900/10' :
                uploadStatus === 'rejected' ? 'border-red-500 bg-red-900/10' :
                'border-gray-700 hover:border-pink-500 hover:bg-white/5'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={(e) => e.target.files && handleFileSelection(e.target.files[0])}
              />
              
              {uploadStatus === 'idle' && (
                <div className="text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <p className="font-medium text-white mb-1">Click or drag file to upload</p>
                  <p className="text-xs">Max 5MB. Strict MIME-type checking enforced.</p>
                </div>
              )}

              {uploadStatus === 'scanning' && (
                <div className="text-blue-400 font-mono text-sm flex flex-col items-center gap-3">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  {securityMessage}
                </div>
              )}

              {uploadStatus === 'passed' && (
                <div className="text-green-500 font-mono text-xs text-left">
                  <span className="block font-bold text-sm mb-1">{file?.name}</span>
                  {securityMessage}
                </div>
              )}

              {uploadStatus === 'rejected' && (
                <div className="text-red-500 font-mono text-xs text-left">
                  <span className="block font-bold text-sm mb-1 line-through">{file?.name}</span>
                  {securityMessage}
                  <div className="mt-2 text-white underline cursor-pointer" onClick={(e) => { e.stopPropagation(); setUploadStatus('idle'); setFile(null); }}>Upload a different file</div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-800">
              <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
              <input required type="text" className="w-full bg-[#111] border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-pink-500" placeholder="Jane Doe" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
              <input required type="email" className="w-full bg-[#111] border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:border-pink-500" placeholder="jane@enterprise.com" />
            </div>
            
            <button 
              type="submit" 
              disabled={uploadStatus === 'scanning' || uploadStatus === 'rejected'}
              className="w-full bg-white text-black hover:bg-gray-200 py-3 rounded-md font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Secure & Submit Brief
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
