'use client'  

import React, { useState } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import { FiLogOut, FiChevronDown, FiUser, FiBriefcase } from "react-icons/fi";
import MyNavLink from "./MyNavLink"; 
import { authClient } from "@/lib/auth-client";
import { useRouter } from 'next/navigation'; // 1. IMPORT THE ROUTER


function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Hooking up better-auth session monitoring
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  console.log("user : " , session)

  // Extracting first letter for safe avatar fallback display
  const getInitial = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href ='/sign-in'
        }
      }
    });
  };

  return (
    <>
      {/* Global CSS Injection for premium rotating border */}
      <style jsx global>{`
        @keyframes borderRotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient-border {
          background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(99,102,241,0.3), rgba(34,211,238,0.3), rgba(255,255,255,0.05));
          background-size: 200% 200%;
          animation: borderRotate 6s linear infinite;
        }
      `}</style>

      {/* Floating Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-4 sticky top-0 z-50">
        
        {/* Outer Animated Boundary Border Wrap */}
        <div className="p-[1px] rounded-2xl animated-gradient-border shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          
          <nav className="w-full rounded-2xl bg-[#090a10]/85 backdrop-blur-xl transition-all duration-300">
            <header className="flex h-16 items-center justify-between px-6">
              
              {/* Left Section: Branding & Mobile Toggle */}
              <div className="flex items-center gap-4">
                <button
                  className="md:hidden text-zinc-400 hover:text-white transition-colors focus:outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
                
                {/* Logo Link */}
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

              {/* Center Right: Core Navigation & Session Conditionals */}
              <div className="hidden md:flex items-center gap-6">
                <ul className="flex items-center gap-6">
                  <li><MyNavLink href="/browse-jobs">Browse Jobs</MyNavLink></li>
                  <li><MyNavLink href="/company">Company</MyNavLink></li>
                  <li><MyNavLink href="/pricing">Pricing</MyNavLink></li>
                </ul>

                {/* Micro Vertical Splitter Divider */}
                <div className="h-4 w-[1px] bg-zinc-800" />

                {/* Loading State / Skeleton Placeholder */}
                {isPending && (
                  <div className="w-24 h-8 bg-zinc-800 animate-pulse rounded-lg" />
                )}

                {/* CONDITIONAL INTERFACE: User Is Authenticated */}
                {!isPending && user && (
                  <div className="relative">
                    <button 
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-zinc-900/60 transition-all duration-200 outline-none group text-left"
                    >
                      {/* Avatar with fallback character setup */}
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                        {user.image ? (
                          <img src={user.image} alt={user.name} className="h-full w-full object-cover rounded-lg" />
                        ) : (
                          getInitial(user.name)
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-zinc-200 max-w-[100px] truncate">
                          {user.name}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-medium">Account</span>
                      </div>
                      <FiChevronDown className={`w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Premium Contextual Flyout Dropdown Menu */}
                    {isUserDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsUserDropdownOpen(false)} />
                        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-zinc-800/80 bg-[#0c0d14] p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                          <div className="px-3 py-2 border-b border-zinc-900 mb-1">
                            <p className="text-xs font-medium text-zinc-400 truncate">{user.email}</p>
                          </div>
                          <a href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">
                            <FiBriefcase className="w-4 h-4 text-zinc-500" />
                            <span>My Dashboard</span>
                          </a>
                          <a href="/profile" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">
                            <FiUser className="w-4 h-4 text-zinc-500" />
                            <span>Profile Settings</span>
                          </a>
                          <button 
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-lg transition-colors text-left"
                          >
                            <FiLogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* CONDITIONAL INTERFACE: Guest State (No active session logged) */}
                {!isPending && !user && (
                  <div className="flex items-center gap-5">
                    <MyNavLink href="/sign-in">
                      <span className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                        Sign In
                      </span>
                    </MyNavLink>
                    
                    <MyNavLink href="/signup">
                      <Button
                        className="bg-gradient-to-r from-[#0891b2] via-[#0284c7] to-[#4f46e5] hover:from-[#06b6d4] hover:via-[#0ea5e9] hover:to-[#6366f1] text-white font-semibold px-5 h-9 min-w-0 rounded-xl border border-white/5 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                      >
                        Get Started
                      </Button>
                    </MyNavLink>
                  </div>
                )}

              </div>
            </header>

            {/* Responsive Dropdown Mobile Menu Panel */}
            {isMenuOpen && (
              <div className="border-t border-zinc-900 md:hidden bg-[#090a10]/95 rounded-b-2xl transition-all duration-300">
                <ul className="flex flex-col gap-3 p-5">
                  <li><MyNavLink href="/browse-jobs">Browse Jobs</MyNavLink></li>
                  <li><MyNavLink href="/company">Company</MyNavLink></li>
                  <li><MyNavLink href="/pricing">Pricing</MyNavLink></li>
                  
                  <hr className="border-zinc-900 my-1" />
                  
                  {/* Mobile Actions conditional on state mapping */}
                  {!isPending && user ? (
                    <>
                      <div className="flex items-center gap-3 px-1 py-1.5 mb-2">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                          {getInitial(user.name)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-zinc-200">{user.name}</span>
                          <span className="text-xs text-zinc-500 truncate max-w-[200px]">{user.email}</span>
                        </div>
                      </div>
                      <li><MyNavLink href="/dashboard">Dashboard</MyNavLink></li>
                      <li className="pt-2">
                        <Button
                          onClick={handleSignOut}
                          className="w-full bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 text-rose-400 font-medium h-10 rounded-xl flex items-center justify-center gap-2"
                        >
                          <FiLogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </Button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li><MyNavLink href="/sign-in">Sign In</MyNavLink></li>
                      <li className="pt-2">
                        <MyNavLink href="/sign-up">
                          <Button className="w-full bg-gradient-to-r from-[#0891b2] via-[#0284c7] to-[#4f46e5] text-white font-semibold h-10 rounded-xl">
                            Get Started
                          </Button>
                        </MyNavLink>
                      </li>
                    </>
                  )}
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