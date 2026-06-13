import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020105]">
      <div className="relative flex flex-col items-center gap-6">
        {/* Glowing Pulse Ring */}
        <div className="relative flex items-center justify-center">
          <div className="absolute size-20 rounded-full border-2 border-indigo-500/30 animate-ping" />
          <div className="size-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        </div>

        {/* Text Shimmer Effect */}
        <div className="text-zinc-500 text-sm font-medium tracking-widest uppercase">
          <span className="animate-pulse">Loading</span>
          <span className="animate-bounce delay-75">.</span>
          <span className="animate-bounce delay-150">.</span>
          <span className="animate-bounce delay-300">.</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;