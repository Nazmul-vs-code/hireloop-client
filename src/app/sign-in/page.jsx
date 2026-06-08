'use client'

import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation'; // 1. IMPORT THE ROUTER

const SignInPage = () => {
  const router = useRouter(); // 2. INITIALIZE THE ROUTER
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect' ) || '/'

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);

    if (data) {
      toast.success('Welcome back!');
      
      router.push(redirectTo)
    }
    if (error) {
      toast.error(error.message || 'Invalid email or password');
    }
  };

  return (
    <main className="relative w-full min-h-screen flex items-center justify-center bg-[#010208] px-4 py-20 overflow-hidden select-none">
      
      {/* ==========================================
          1. INJECTED ENGINE: CHROMATIC COSMIC FLOWS
          ========================================== */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes auroraFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes nebulaPulseSlow {
          0%, 100% { opacity: 0.2; transform: scale(1) translate(-50%, -50%); filter: blur(140px); }
          50% { opacity: 0.35; transform: scale(1.15) translate(-48%, -52%); filter: blur(170px); }
        }
        @keyframes orbitalDrift {
          0% { transform: rotate(0deg) translateX(15px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(15px) rotate(-360deg); }
        }
        .animate-aurora-text {
          background-size: 200% auto;
          animation: auroraFlow 6s linear infinite;
        }
        .animate-nebula-pulse { animation: nebulaPulseSlow 22s ease-in-out infinite; }
        .animate-drift { animation: orbitalDrift 40s linear infinite; }
      `}} />

      {/* ==========================================
          2. DEEP INTENSITY BACKGROUND ENGINE
          ========================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep Matrix Star Layer */}
        <div className="absolute inset-0 opacity-60 animate-drift">
          <div className="absolute top-[15%] left-[22%] w-[2px] h-[2px] bg-cyan-300 rounded-full shadow-[0_0_8px_#22d3ee]" />
          <div className="absolute top-[45%] right-[18%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute top-[75%] left-[35%] w-[1.5px] h-[1.5px] bg-indigo-300 rounded-full shadow-[0_0_4px_rgba(129,140,248,0.6)]" />
          <div className="absolute bottom-[20%] right-[30%] w-[2px] h-[2px] bg-emerald-400 rounded-full shadow-[0_0_6px_#34d399]" />
          <div className="absolute bottom-[40%] left-[10%] w-[1px] h-[1px] bg-zinc-500 rounded-full" />
        </div>

        {/* Hyper-glowing Ambient Nebulae */}
        <div className="absolute top-1/3 left-1/2 w-[600px] aspect-square bg-cyan-600/10 rounded-full animate-nebula-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] aspect-square bg-emerald-600/5 rounded-full animate-nebula-pulse" style={{ animationDelay: '-8s' }} />
        <div className="absolute top-1/2 left-1/4 w-[700px] aspect-square bg-indigo-600/10 rounded-full animate-nebula-pulse" style={{ animationDelay: '-4s' }} />
      </div>

      {/* ==========================================
          3. MAIN INTERFACE BOX
          ========================================== */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
        
        {/* Headline Header */}
        <div className="text-center mb-8 flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#818cf8] to-[#34d399] animate-aurora-text drop-shadow-[0_2px_15px_rgba(34,211,238,0.2)]">
            Welcome Back
          </h1>
          <p className="text-sm text-zinc-400 font-medium tracking-wide">
            Securely step back into your development loop.
          </p>
        </div>

        {/* Premium Structural Card Wrapper */}
        <div className="w-full p-[1px] rounded-3xl bg-gradient-to-b from-cyan-500/20 via-zinc-800/40 to-transparent shadow-[0_40px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          <div className="w-full bg-[#05070f]/90 rounded-[23px] p-8 sm:p-10 relative overflow-hidden">
            
            {/* Inner Cyber Accent Flare */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_1px_10px_#22d3ee]" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Field: Email Address */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase px-1">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors duration-200">
                    <FiMail className="w-5 h-5" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full h-12 pl-12 pr-4 bg-[#0a0f1d]/40 border border-zinc-800/80 rounded-xl text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-[#0d1527]/60 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  />
                </div>
              </div>

              {/* Field: Password */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">
                    Password
                  </label>
                  <a href="/forgot-password" className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                    Forgot?
                  </a>
                </div>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors duration-200">
                    <FiLock className="w-5 h-5" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full h-12 pl-12 pr-12 bg-[#0a0f1d]/40 border border-zinc-800/80 rounded-xl text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-[#0d1527]/60 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Cyan Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full h-12 mt-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#0891b2] via-[#0284c7] to-[#4f46e5] hover:from-[#06b6d4] hover:via-[#0ea5e9] hover:to-[#6366f1] text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
                {!isLoading && <FiLogIn className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
              </button>

              {/* OAuth Splitter */}
              <div className="relative flex items-center justify-center my-2">
                <div className="w-full border-t border-zinc-900" />
                <span className="absolute bg-[#05070f] px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
                  or continue with
                </span>
              </div>

              {/* Social Connectors */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="h-11 rounded-xl bg-[#0a0f1d]/60 border border-zinc-900 hover:border-zinc-800 hover:bg-[#10172c] text-zinc-300 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98]"
                >
                  <FcGoogle className="w-5 h-5" />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="h-11 rounded-xl bg-[#0a0f1d]/60 border border-zinc-900 hover:border-zinc-800 hover:bg-[#10172c] text-zinc-300 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98]"
                >
                  <FaGithub className="w-5 h-5 text-white" />
                  <span>GitHub</span>
                </button>
              </div>

            </form>

            <p className="text-center text-xs text-zinc-500 mt-8 font-medium">
              New to HireLoop?{' '}
              <a href={`/signup?redirect=${redirectTo}`} className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors ml-0.5">
                Create an account
              </a>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;