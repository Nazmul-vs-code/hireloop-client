'use client'

import React from 'react';
import Image from 'next/image';
import { FiBriefcase, FiGrid, FiUsers, FiAward } from 'react-icons/fi';

const State = () => {
  const statsData = [
    {
      icon: <FiBriefcase className="w-5 h-5 text-zinc-400" />,
      value: "50K",
      label: "Active Jobs"
    },
    {
      icon: <FiGrid className="w-5 h-5 text-zinc-400" />,
      value: "12K",
      label: "Companies"
    },
    {
      icon: <FiUsers className="w-5 h-5 text-zinc-400" />,
      value: "2M",
      label: "Job Seekers"
    },
    {
      icon: <FiAward className="w-5 h-5 text-zinc-400" />,
      value: "97%",
      label: "Satisfaction Rate"
    }
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#020104] px-4 py-32 overflow-hidden select-none">
      
      {/* ==========================================
          1. ULTRA-SLOW DENSE COSMIC KEYFRAMES
          ========================================== */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ultraSlowDriftLeft {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-30px, 15px) scale(1.03); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes ultraSlowDriftRight {
          0% { transform: translate(0px, 0px) scale(1.05); }
          50% { transform: translate(25px, -20px) scale(0.98); }
          100% { transform: translate(0px, 0px) scale(1.05); }
        }
        @keyframes deepSpaceTwinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.65; }
        }
        .animate-drift-slow-1 { animation: ultraSlowDriftLeft 35s ease-in-out infinite; }
        .animate-drift-slow-2 { animation: ultraSlowDriftRight 45s ease-in-out infinite; }
        .animate-drift-slow-3 { animation: ultraSlowDriftLeft 60s ease-in-out infinite; }
        .animate-space-twinkle { animation: deepSpaceTwinkle 8s ease-in-out infinite; }
      `}} />

      {/* ==========================================
          2. FIXED FULL HEIGHT UNBROKEN BACKGROUND
          ========================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image 
          src="/images/globe.png" 
          alt="Global Horizon Backdrop" 
          fill
          priority
          className="object-cover object-center pointer-events-none w-full h-full" 
        />
        {/* Soft edge-vignette to balance global imagery structure */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020104] via-transparent to-[#020104] opacity-85" />
      </div>

      {/* ==========================================
          3. HIGH-DENSITY RUNNING STARFIELD CLUSTERS
          ========================================== */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        
        {/* Layer 1: Leftward Drifting Massive Micro-Star Field */}
        <div className="absolute inset-0 animate-drift-slow-1 opacity-60">
          <div className="absolute top-[8%] left-[5%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_4px_#fff]" />
          <div className="absolute top-[15%] right-[25%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute top-[28%] left-[45%] w-[2px] h-[2px] bg-indigo-200 rounded-full" />
          <div className="absolute top-[42%] right-[8%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute bottom-[35%] left-[12%] w-[1.5px] h-[1.5px] bg-purple-200 rounded-full" />
          <div className="absolute bottom-[18%] right-[30%] w-[2px] h-[2px] bg-white rounded-full" />
          <div className="absolute bottom-[8%] left-[28%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute top-[60%] left-[3%] w-[1.5px] h-[1.5px] bg-zinc-300 rounded-full" />
        </div>

        {/* Layer 2: Rightward Drifting Alternate Cluster */}
        <div className="absolute inset-0 animate-drift-slow-2 opacity-50">
          <div className="absolute top-[22%] left-[18%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute top-[11%] right-[12%] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_5px_#fff]" />
          <div className="absolute top-[35%] right-[40%] w-[1.5px] h-[1.5px] bg-sky-200 rounded-full" />
          <div className="absolute top-[55%] left-[22%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute bottom-[45%] right-[18%] w-[2px] h-[2px] bg-purple-300 rounded-full" />
          <div className="absolute bottom-[22%] left-[40%] w-[1.5px] h-[1.5px] bg-white rounded-full" />
          <div className="absolute bottom-[12%] right-[5%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute top-[75%] right-[28%] w-[2px] h-[2px] bg-zinc-400 rounded-full" />
        </div>

        {/* Layer 3: Deep Deep-Space Ultra Slow Background Dust */}
        <div className="absolute inset-0 animate-drift-slow-3 opacity-40 animate-space-twinkle">
          <div className="absolute top-[5%] left-[35%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute top-[19%] left-[75%] w-[1.5px] h-[1.5px] bg-white rounded-full" />
          <div className="absolute top-[50%] left-[50%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute bottom-[30%] left-[85%] w-[2px] h-[2px] bg-amber-100 rounded-full shadow-[0_0_3px_rgba(251,191,36,0.6)]" />
          <div className="absolute bottom-[15%] left-[19%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute bottom-[40%] left-[68%] w-[1.5px] h-[1.5px] bg-white rounded-full" />
          <div className="absolute top-[68%] right-[15%] w-[1px] h-[1px] bg-white rounded-full" />
        </div>

        {/* Core Atmosphere Purple Aura Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[950px] aspect-square bg-purple-600/[0.025] blur-[150px] rounded-full pointer-events-none" />
      </div>

      {/* ==========================================
          4. CONTENT OVERLAY CONTROLLER
          ========================================== */}
      <div className="relative z-20 max-w-6xl w-full mx-auto flex flex-col items-center text-center gap-16">
        
        {/* Headline Header Typography */}
        <div className="flex flex-col gap-3 max-w-2xl px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Assisting over <span className="text-zinc-200 font-bold">15,000 job seekers</span> <br className="hidden sm:block" /> find their dream positions.
          </h2>
        </div>

        {/* Responsive Layout Architecture Cards Matrix */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl px-2">
          {statsData.map((card, i) => (
            <div 
              key={i}
              className="relative flex flex-col items-start text-left p-6 sm:p-7 rounded-2xl bg-[#0b0a0f]/80 border border-zinc-900/90 backdrop-blur-md shadow-[0_25px_50px_rgba(0,0,0,0.8)] group overflow-hidden transition-all duration-300 hover:border-purple-500/20 hover:-translate-y-1"
            >
              {/* Radial flare bloom context on card hover */}
              <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-purple-500/5 blur-2xl rounded-full group-hover:bg-purple-500/10 transition-all duration-500 pointer-events-none" />
              
              {/* Boxed Icon Bracket Container */}
              <div className="mb-8 p-2 rounded-lg bg-zinc-900/40 border border-zinc-800/50 group-hover:text-purple-400 group-hover:border-purple-500/20 transition-all duration-300">
                {card.icon}
              </div>

              {/* Large Format Value Metric */}
              <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2 transition-colors duration-300 group-hover:text-purple-100">
                {card.value}
              </h3>

              {/* Text Description Label */}
              <p className="text-xs font-medium text-zinc-500 tracking-wide uppercase">
                {card.label}
              </p>

              {/* Interaction underline glow tracer */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-purple-500/50 via-transparent to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default State;