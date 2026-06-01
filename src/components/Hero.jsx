'use client'

import React, { useState } from 'react';
import { FiSearch, FiMapPin, FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  // Track active input state for custom focus elements
  const [activeInput, setActiveInput] = useState(null);

  const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center bg-transparent px-4 py-16 text-white overflow-hidden select-none">
      
      {/* Ambient Celestial Backdrop Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-t from-[#f97316]/[0.06] via-purple-500/[0.02] to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/4 left-1/3 w-[1.5px] h-[1.5px] bg-white rounded-full opacity-40 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[2px] h-[2px] bg-amber-200 rounded-full opacity-50 animate-[ping_4s_infinite]" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 gap-7">
        
        {/* ==========================================
            1. RECONSTRUCTED BANNER
            ========================================== */}
        <div className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#121214]/90 border border-zinc-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.6)] group transition-all duration-300 hover:border-orange-500/20">
          {/* Subtle horizontal alignment wire effects behind the pill */}
          <div className="absolute left-[-40px] right-[-40px] h-[1px] bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent top-1/2 -translate-y-1/2 -z-10" />
          
          <span className="text-base filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">💼</span>
          <p className="text-[11px] tracking-[0.14em] font-medium text-zinc-400">
            <span className="text-white font-semibold">50,000+</span> NEW JOBS THIS MONTH
          </p>
        </div>

        {/* ==========================================
            2. TYPOGRAPHY MATRIX (font-semibold Update)
            ========================================== */}
        <div className="flex flex-col gap-4 max-w-3xl mt-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.15] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            Find Your Dream Job Today
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed opacity-85">
            HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
          </p>
        </div>

        {/* ==========================================
            3. SEARCH ENGINE CONSOLE (React Icons + Custom Indicators)
            ========================================== */}
        <div className="w-full max-w-3xl mt-5 px-2">
          <div className="w-full bg-[#0a0a0c]/80 border border-zinc-800/70 backdrop-blur-xl rounded-2xl p-2.5 flex flex-col md:flex-row items-center gap-2 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative group">
            
            {/* Input Node 1: Job Spec Title */}
            <div 
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 cursor-text relative overflow-hidden ${
                activeInput === 'title' ? 'bg-zinc-900/60 ring-1 ring-orange-500/30 shadow-[0_0_20px_rgba(234,88,12,0.08)]' : 'hover:bg-zinc-900/30'
              }`}
            >
              <FiSearch className={`w-5 h-5 transition-colors duration-300 shrink-0 ${activeInput === 'title' ? 'text-orange-400' : 'text-zinc-500'}`} />
              <input 
                type="text" 
                placeholder="Job title, skill or company"
                onFocus={() => setActiveInput('title')}
                onBlur={() => setActiveInput(null)}
                className="w-full bg-transparent border-none outline-none text-sm text-zinc-200 placeholder-zinc-600 font-medium"
              />
              {/* Slid-out active line under focus state */}
              <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 ${activeInput === 'title' ? 'w-full' : 'w-0'}`} />
            </div>

            {/* Split Divider Axis Line */}
            <div className="hidden md:block h-7 w-[1px] bg-zinc-800/80" />

            {/* Input Node 2: Geolocation Vector */}
            <div 
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 cursor-text relative overflow-hidden ${
                activeInput === 'location' ? 'bg-zinc-900/60 ring-1 ring-orange-500/30 shadow-[0_0_20px_rgba(234,88,12,0.08)]' : 'hover:bg-zinc-900/30'
              }`}
            >
              <FiMapPin className={`w-5 h-5 transition-colors duration-300 shrink-0 ${activeInput === 'location' ? 'text-orange-400' : 'text-zinc-500'}`} />
              <input 
                type="text" 
                placeholder="Location or Remote"
                onFocus={() => setActiveInput('location')}
                onBlur={() => setActiveInput(null)}
                className="w-full bg-transparent border-none outline-none text-sm text-zinc-200 placeholder-zinc-600 font-medium"
              />
              <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 ${activeInput === 'location' ? 'w-full' : 'w-0'}`} />
            </div>

            {/* Submission Action Anchor Button */}
            <button className="w-full md:w-auto px-5.5 py-3.5 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#6366f1] hover:from-[#4338ca] hover:to-[#4f46e5] text-white font-medium text-sm tracking-wide shadow-[0_4px_25px_rgba(79,70,229,0.35)] transition-all duration-200 flex items-center justify-center gap-2 shrink-0 active:scale-98">
              <FiSearch className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* ==========================================
            4. TRENDING DIRECTORY TABS
            ========================================== */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-1 text-sm">
          <span className="text-zinc-500 text-xs font-medium tracking-wide">Trending Position</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trendingPositions.map((tag, i) => (
              <button 
                key={i}
                className="px-4 py-1.5 rounded-full bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-400 font-medium hover:text-orange-400 hover:border-orange-500/20 hover:bg-[#121214] shadow-sm transition-all duration-200 active:scale-95"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;