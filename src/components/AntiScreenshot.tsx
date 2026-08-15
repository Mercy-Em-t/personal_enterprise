'use client';

import { useEffect, useState } from 'react';

export default function AntiScreenshot() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const handleBlur = () => {
      if (!isMobile) setIsActive(true);
    };

    const handleFocus = () => {
      if (!isMobile) setIsActive(false);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        setIsActive(true);
        try {
          navigator.clipboard.writeText("Confidential Document - Tryphen Emurugat");
        } catch (err) {
          console.log("Clipboard write blocked.");
        }
        setTimeout(() => setIsActive(false), 2000);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsActive(true);
      } else {
        setTimeout(() => {
          if (!document.hidden) setIsActive(false);
        }, 100);
      }
    };

    if (!isMobile) {
      window.addEventListener('blur', handleBlur);
      window.addEventListener('focus', handleFocus);
    }
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (!isMobile) {
        window.removeEventListener('blur', handleBlur);
        window.removeEventListener('focus', handleFocus);
      }
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      id="security-overlay"
      className={`fixed inset-0 w-screen h-screen bg-black/95 backdrop-blur-2xl z-[9999] flex flex-col items-center justify-center transition-opacity duration-200 ${
        isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <h1 className="font-mono text-pink-500 text-3xl md:text-5xl tracking-[0.1em] uppercase text-center break-words max-w-[90%]">
        tryphenemurugat.com
      </h1>
      <p className="font-mono text-gray-400 mt-4 text-sm text-center px-4">
        SECURE VIEWING MODE ENFORCED
      </p>
    </div>
  );
}
