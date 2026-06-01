import React, { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const MyNavLink = ({ href, children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // Determine if this specific route is active
  const isActive = pathname === href;

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (isActive) return;

    // --- Particle / Star Blink Burst Animation Logic ---
    const rect = e.currentTarget.getBoundingClientRect();
    const rippleContainer = document.createElement('div');
    rippleContainer.style.position = 'fixed';
    rippleContainer.style.top = `${rect.top}px`;
    rippleContainer.style.left = `${rect.left}px`;
    rippleContainer.style.width = `${rect.width}px`;
    rippleContainer.style.height = `${rect.height}px`;
    rippleContainer.style.pointerEvents = 'none';
    rippleContainer.style.zIndex = '9999';
    document.body.appendChild(rippleContainer);

    // Create 8 micro star particles cascading outward
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      const angle = (i / 8) * 2 * Math.PI;
      const distance = 30 + Math.random() * 20;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      particle.style.position = 'absolute';
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.width = '6px';
      particle.style.height = '6px';
      particle.style.borderRadius = '50%';
      // High intensity vibrant neon color variations
      particle.style.backgroundColor = i % 2 === 0 ? '#818cf8' : '#a78bfa';
      particle.style.boxShadow = '0 0 10px #a78bfa, 0 0 20px #818cf8';
      particle.style.transform = 'translate(-50%, -50%) scale(1)';
      particle.style.transition = 'all 0.6s cubic-bezier(0.1, 0.8, 0.3, 1)';
      
      rippleContainer.appendChild(particle);

      // Force frame calculation to trigger outward movement
      setTimeout(() => {
        particle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`;
        particle.style.opacity = '0';
      }, 10);
    }

    // Clean up particles from DOM
    setTimeout(() => {
      rippleContainer.remove();
    }, 600);

    // Trigger Next.js route transition natively
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <a
      href={href}
      onClick={handleLinkClick}
      className={`relative py-2 px-1 text-sm font-medium transition-all duration-300 block select-none ${
        isActive 
          ? 'text-white drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]' 
          : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      {children}

      {/* Persistent Active Glow Underline */}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full shadow-[0_1px_8px_rgba(139,92,246,0.8)] animate-pulse" />
      )}
    </a>
  );
};

export default MyNavLink;