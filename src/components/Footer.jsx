'use client'

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ==========================================
    // COSMIC TWINKLING STAR ENGINE
    // ==========================================
    const stars = [];
    const maxStars = 140;

    class Star {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -5;
        this.size = Math.random() * 1.5 + 0.4;
        this.speedY = Math.random() * 0.05 + 0.02; 
        this.speedX = (Math.random() - 0.5) * 0.01;
        this.opacity = Math.random() * 0.8 + 0.2;
        
        const colors = ['#ffedd5', '#fef08a', '#ffffff', '#fed7aa', '#bae6fd'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        this.opacity += (Math.random() - 0.5) * 0.05;
        if (this.opacity < 0.15) this.opacity = 0.15;
        if (this.opacity > 0.95) this.opacity = 0.95;

        if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    for (let i = 0; i < maxStars; i++) {
      stars.push(new Star());
    }

    // ==========================================
    // HIGH-CONTRAST JAGGED MOUNTAIN ENGINE
    // ==========================================
    const drawMountains = () => {
      ctx.save();
      
      // LAYER 1: Distant Sharp Mountain Range (Solid Dark Purple Silhouette)
      ctx.fillStyle = '#0f0b1e';
      ctx.globalAlpha = 1.0; // Enforce full opaque visibility
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      ctx.lineTo(0, canvas.height - 50);
      ctx.lineTo(canvas.width * 0.14, canvas.height - 95);
      ctx.lineTo(canvas.width * 0.24, canvas.height - 65);
      ctx.lineTo(canvas.width * 0.38, canvas.height - 110); // Dominant peak
      ctx.lineTo(canvas.width * 0.52, canvas.height - 50);
      ctx.lineTo(canvas.width * 0.68, canvas.height - 100); // Secondary sharp peak
      ctx.lineTo(canvas.width * 0.82, canvas.height - 45);
      ctx.lineTo(canvas.width * 0.92, canvas.height - 75);
      ctx.lineTo(canvas.width, canvas.height - 35);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // LAYER 2: Foreground Canyon Layer (Deep Midnight Solid Black)
      ctx.fillStyle = '#050309';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      ctx.lineTo(0, canvas.height - 30);
      ctx.lineTo(canvas.width * 0.20, canvas.height - 55);
      ctx.lineTo(canvas.width * 0.45, canvas.height - 35);
      ctx.lineTo(canvas.width * 0.72, canvas.height - 65);
      ctx.lineTo(canvas.width * 0.88, canvas.height - 25);
      ctx.lineTo(canvas.width, canvas.height - 45);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render cosmic background stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      // Render strong solid mountain ridges over the stars
      drawMountains();

      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    // Vibrant deep space gradient that transitions down to a vivid glowing sunset base line
    <footer className="relative w-full bg-gradient-to-b from-[#05030c] via-[#0b061a] to-[#1a0710] text-[#a1a1aa] border-t border-orange-500/10 pt-20 pb-12 px-6 md:px-12 overflow-hidden group">
      
      {/* Live Star Space & Mountain Layers (mix-blend-screen removed for deep opaque visibility) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-100"
      />

      {/* STRONGER HORIZON SUNSET GLOW BLEED (Direct match to your reference photo!) */}
      <div className="absolute bottom-0 left-0 right-0 h-[190px] bg-gradient-to-t from-[#f97316]/25 via-[#a21caf]/12 to-transparent blur-xl pointer-events-none z-0" />
      <div className="absolute bottom-4 left-1/4 w-[450px] h-[200px] bg-[#ea580c]/20 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Golden Crescent Moon */}
      <div className="absolute top-12 right-12 md:right-24 w-12 h-12 pointer-events-none z-0 select-none opacity-90 hidden sm:block">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-100 to-amber-200 shadow-[0_0_35px_rgba(245,158,11,0.4)] relative after:content-[''] after:absolute after:w-8 after:h-8 after:rounded-full after:bg-[#05030c] after:top-[-4px] after:left-[-7px]" />
      </div>

      {/* ==========================================
          OASIS SYSTEM (REUSING PREVIOUS 2 ASSETS)
          ========================================== */}
      {/* Left Base Side Grove */}
      <div className="absolute bottom-4 left-[5%] w-16 h-14 hidden md:block pointer-events-none z-0 opacity-95 select-none transition-transform group-hover:scale-105 duration-700">
        <Image src="/images/palm-cluster-left.svg" alt="Oasis Palms" fill className="object-contain" />
      </div>

      <div className="absolute bottom-3 left-[16%] w-12 h-10 hidden lg:block pointer-events-none z-0 opacity-75 select-none scale-90">
        <Image src="/images/palm-cluster-right.svg" alt="Oasis Palms" fill className="object-contain" />
      </div>

      <div className="absolute bottom-5 left-[28%] w-14 h-12 hidden xl:block pointer-events-none z-0 opacity-80 select-none scale-95">
        <Image src="/images/palm-cluster-left.svg" alt="Oasis Palms" fill className="object-contain" />
      </div>

      {/* Right Base Side Grove */}
      <div className="absolute bottom-4 right-[25%] w-14 h-14 hidden md:block pointer-events-none z-0 opacity-90 select-none transition-transform group-hover:scale-105 duration-700">
        <Image src="/images/palm-cluster-right.svg" alt="Oasis Palms" fill className="object-contain" />
      </div>

      <div className="absolute bottom-3 right-[12%] w-16 h-14 hidden lg:block pointer-events-none z-0 opacity-80 select-none scale-95">
        <Image src="/images/palm-cluster-left.svg" alt="Oasis Palms" fill className="object-contain" />
      </div>

      <div className="absolute bottom-5 right-[3%] w-11 h-11 hidden xl:block pointer-events-none z-0 opacity-65 select-none scale-75">
        <Image src="/images/palm-cluster-right.svg" alt="Oasis Palms" fill className="object-contain" />
      </div>


      {/* ==========================================
          FOOTER LAYOUT CONTENT NODE LINK DIRECTORY
          ========================================== */}
      <div className="max-w-7xl mx-auto flex flex-col justify-between h-full gap-16 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
          
          {/* Left Column: Brand Identity */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link href="/" className="flex items-center w-[120px] h-8 relative hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/logo.png" 
                alt="HireLoop Logo" 
                fill
                className="object-contain"
                priority
              />
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Right Columns: Category Link Matrices */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-orange-400/90 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Product</h3>
              <ul className="flex flex-col gap-3 text-sm text-zinc-400">
                <li><Link href="/job-discovery" className="hover:text-amber-200 hover:translate-x-1 transition-all duration-200 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Job discovery</Link></li>
                <li><Link href="/worker-ai" className="hover:text-amber-200 hover:translate-x-1 transition-all duration-200 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Worker AI</Link></li>
                <li><Link href="/companies" className="hover:text-amber-200 hover:translate-x-1 transition-all duration-200 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Companies</Link></li>
                <li><Link href="/salary-data" className="hover:text-amber-200 hover:translate-x-1 transition-all duration-200 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Salary data</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-orange-400/90 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Navigations</h3>
              <ul className="flex flex-col gap-3 text-sm text-zinc-400">
                <li><Link href="/help" className="hover:text-amber-200 hover:translate-x-1 transition-all duration-200 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Help center</Link></li>
                <li><Link href="/library" className="hover:text-amber-200 hover:translate-x-1 transition-all duration-200 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Career library</Link></li>
                <li><Link href="/contact" className="hover:text-amber-200 hover:translate-x-1 transition-all duration-200 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Contact</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-orange-400/90 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Resources</h3>
              <ul className="flex flex-col gap-3 text-sm text-zinc-400">
                <li><Link href="/guidelines" className="hover:text-amber-200 hover:translate-x-1 transition-all duration-200 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Brand Guideline</Link></li>
                <li><Link href="/newsroom" className="hover:text-amber-200 hover:translate-x-1 transition-all duration-200 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Newsroom</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Socials Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-white/5 gap-6">
          <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 text-zinc-400 hover:text-white hover:scale-110 transition-all duration-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/></svg>
            </a>
            
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-600 hover:text-white hover:scale-110 shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.68 7.91 6.46 9.33-.09-.8-.17-2.03.03-2.91.19-.82 1.22-5.18 1.22-5.18s-.31-.63-.31-1.55c0-1.45.84-2.54 1.89-2.54.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.86 3.49-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.27-1.95 3.27-4.77 0-2.49-1.79-4.24-4.35-4.24-2.96 0-4.7 2.22-4.7 4.52 0 .9.35 1.86.78 2.38.09.1.1.19.07.31l-.29 1.18c-.05.18-.16.22-.36.13-1.32-.61-2.14-2.55-2.14-4.11 0-3.34 2.43-6.42 7.01-6.42 3.68 0 6.54 2.62 6.54 6.13 0 3.66-2.31 6.6-5.51 6.6-1.08 0-2.09-.56-2.44-1.22 0 0-.53 2.03-.66 2.53-.24.92-.89 2.08-1.33 2.8 1 .31 2.06.48 3.16.48 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
            </a>

            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 text-zinc-400 hover:text-white hover:scale-110 transition-all duration-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs text-zinc-600 font-medium">
            <span>Copyright 2024 — Programming Hero</span>
            <div className="flex items-center gap-3">
              <Link href="/terms" className="hover:text-orange-300 transition-colors">Terms & Policy</Link>
              <span>-</span>
              <Link href="/privacy" className="hover:text-orange-300 transition-colors">Privacy Guideline</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;