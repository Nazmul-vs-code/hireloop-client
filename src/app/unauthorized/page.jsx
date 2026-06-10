'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiLock, FiArrowLeft } from 'react-icons/fi';

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full bg-[#050508] flex items-center justify-center overflow-hidden font-sans text-white">
      {/* Background Lighting/Stars Animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s infinite;
        }
      `}</style>
      
      {/* Animated Stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            width: Math.random() * 3 + 'px',
            height: Math.random() * 3 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 3 + 's',
          }}
        />
      ))}

      {/* Decorative Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-md p-8 border border-white/10 bg-[#0c0d14]/60 backdrop-blur-xl rounded-3xl text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/20">
            <FiLock className="w-8 h-8 text-rose-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-2">
          Access Denied
        </h1>
        <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
          You don't have the necessary permissions to view this page. 
          Please check your credentials or return to the previous page.
        </p>

        <button 
          onClick={() => router.back()}
          tabIndex={-1}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-all active:scale-95"
        >
          <FiArrowLeft className="w-4 h-4" />
          Return to Previous
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;