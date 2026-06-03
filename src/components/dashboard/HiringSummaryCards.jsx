import React, { useState } from 'react';
import { FiBriefcase, FiUsers, FiZap, FiCheckCircle, FiChevronDown, FiEye } from 'react-icons/fi';

const HiringSummaryCards = () => {
  const [showCards, setShowCards] = useState(false);

  const stats = [
    {
      title: "Total Job Posts",
      value: "48",
      icon: FiBriefcase,
      color: "from-indigo-500 via-purple-500 to-pink-500",
      glow: "rgba(99, 102, 241, 0.15)",
    },
    {
      title: "Total Applicants",
      value: "1,284",
      icon: FiUsers,
      color: "from-sky-400 via-indigo-500 to-purple-500",
      glow: "rgba(56, 189, 248, 0.15)",
    },
    {
      title: "Active Jobs",
      value: "18",
      icon: FiZap,
      color: "from-amber-400 via-orange-500 to-pink-500",
      glow: "rgba(251, 191, 36, 0.15)",
    },
    {
      title: "Jobs Closed",
      value: "32",
      icon: FiCheckCircle,
      color: "from-emerald-400 via-teal-500 to-indigo-500",
      glow: "rgba(52, 211, 153, 0.15)",
    },
  ];

  return (
    <div className="w-full p-4 bg-[#020105]">
      {/* Localized Animation Keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes cardReveal {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-card-fade {
            animation: cardReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `
      }} />

      {/* Animated Toggle Button - Strictly visible ONLY on small mobile screens (hidden on md and lg) */}
      <div className="md:hidden w-full flex justify-center mb-5">
        <button
          type="button"
          onClick={() => setShowCards(!showCards)}
          className="group relative px-6 h-11 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#121118] to-[#1a1924] border border-zinc-800 text-zinc-300 font-medium text-sm transition-all duration-300 hover:border-indigo-500/50 hover:text-white active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <FiEye className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span>{showCards ? "Hide Analytics Dashboard" : "View Analytics Dashboard"}</span>
          <FiChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${showCards ? "rotate-180 text-purple-400" : ""}`} />
        </button>
      </div>

      {/* Dynamic Content Wrapper: Collapses on mobile via state; is always completely visible on md & lg screens */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden md:overflow-visible md:max-h-none ${showCards ? "max-h-[1200px] opacity-100 pb-4" : "max-h-0 opacity-0 md:opacity-100"}`}>
        
        {/* Layout Engine: Stacks full-width on mobile, scales to fixed sizing on md & lg desktops */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full max-w-[1400px] mx-auto justify-items-stretch lg:justify-items-start">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="animate-card-fade opacity-0 group relative p-[1px] rounded-sm bg-gradient-to-b from-white/10 via-white/[0.02] to-transparent transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] w-full md:w-[500px] lg:w-[280px]"
                style={{ 
                  animationDelay: `${index * 80}ms`,
                  '--hover-glow': stat.glow 
                }}
              >
                {/* Outer soft dynamic glow on card hover */}
                <div 
                  className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${stat.glow}, transparent 70%)` }}
                />

                {/* Card Interior Panel */}
                <div className="relative bg-[#0a090e]/90 rounded-sm p-5 sm:p-6 flex flex-col justify-between overflow-hidden backdrop-blur-xl h-36 lg:h-44">
                  
                  {/* Header Icon */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2.5 sm:p-3 rounded-sm bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-all duration-300 shadow-inner">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Text Description & Numerical Outputs */}
                  <div className="flex flex-col gap-0.5 sm:gap-1.5">
                    <span className="text-[10px] sm:text-xs font-semibold text-zinc-500 tracking-wider uppercase group-hover:text-zinc-400 transition-colors duration-300">
                      {stat.title}
                    </span>
                    <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${stat.color} filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]`}>
                      {stat.value}
                    </h3>
                  </div>

                  {/* Hover Bottom Border Animated Trace Line */}
                  <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r ${stat.color} transition-all duration-500 ease-out`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default HiringSummaryCards;