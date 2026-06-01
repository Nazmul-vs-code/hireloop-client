'use client'  

import React, { useState } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import MyNavLink from "./MyNavLink"; // Importing your animated custom nav link

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Global CSS Injection directly for custom keyframe animations */}
      <style jsx global>{`
        @keyframes borderRotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient-border {
          background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(99,102,241,0.4), rgba(167,139,250,0.4), rgba(255,255,255,0.1));
          background-size: 200% 200%;
          animation: borderRotate 6s linear infinite;
        }
      `}</style>

      {/* Floating Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-4 sticky top-0 z-50">
        
        {/* Outer Animated Boundary Border Wrap */}
        <div className="p-[1px] rounded-2xl animated-gradient-border shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          
          <nav className="w-full rounded-2xl bg-[#0d0d0f]/80 backdrop-blur-xl transition-all duration-300">
            <header className="flex h-16 items-center justify-between px-6">
              
              {/* Left Section: Branding & Mobile Toggle */}
              <div className="flex items-center gap-4">
                <button
                  className="md:hidden text-white hover:text-gray-300 transition-colors focus:outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <span className="sr-only">Menu</span>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
                
                {/* Logo Home Routing Container */}
                <MyNavLink href="/">
                  <div className="flex items-center h-8 w-[120px] relative">
                    <Image 
                      src="/images/logo.png" 
                      alt="HireLoop Logo" 
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </MyNavLink>
              </div>

              {/* Center Right: Actual Dynamic Page Routes via MyNavLink */}
              <div className="hidden md:flex items-center gap-6">
                <ul className="flex items-center gap-6">
                  <li>
                    <MyNavLink href="/browse-jobs">Browse Jobs</MyNavLink>
                  </li>
                  <li>
                    <MyNavLink href="/company">Company</MyNavLink>
                  </li>
                  <li>
                    <MyNavLink href="/pricing">Pricing</MyNavLink>
                  </li>
                </ul>

                {/* Micro Divider */}
                <div className="h-4 w-[1px] bg-white/10" />

                {/* Call To Actions */}
                <div className="flex items-center gap-5">
                  <MyNavLink href="/sign-in">
                    <span className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                      Sign In
                    </span>
                  </MyNavLink>
                  
                  {/* HIGH-LIGHTED MIXED GRADIENT BUTTON */}
                  <MyNavLink href="/signup">
                    <Button
                      className="bg-gradient-to-r from-[#5046e6] via-[#7c3aed] to-[#c026d3] hover:from-[#6366f1] hover:via-[#8b5cf6] hover:to-[#d946ef] text-white font-semibold px-6 h-10 min-w-0 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(192,38,211,0.6)] hover:scale-[1.04] active:scale-[0.97] transition-all duration-300"
                    >
                      Get Started
                    </Button>
                  </MyNavLink>
                </div>
              </div>
            </header>

            {/* Responsive Dropdown Mobile Menu */}
            {isMenuOpen && (
              <div className="border-t border-white/5 md:hidden bg-[#0d0d0f]/95 rounded-b-2xl transition-all duration-300">
                <ul className="flex flex-col gap-3 p-5">
                  <li>
                    <MyNavLink href="/browse-jobs">Browse Jobs</MyNavLink>
                  </li>
                  <li>
                    <MyNavLink href="/company">Company</MyNavLink>
                  </li>
                  <li>
                    <MyNavLink href="/pricing">Pricing</MyNavLink>
                  </li>
                  <hr className="border-white/5 my-1" />
                  <li>
                    <MyNavLink href="/sign-in">Sign In</MyNavLink>
                  </li>
                  <li className="pt-2">
                    <MyNavLink href="/signup">
                      <Button
                        className="w-full bg-gradient-to-r from-[#5046e6] via-[#7c3aed] to-[#c026d3] text-white font-semibold h-10 rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                      >
                        Get Started
                      </Button>
                    </MyNavLink>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}

export default NavBar;