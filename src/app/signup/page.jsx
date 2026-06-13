'use client'

import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seeker',
  });

  
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'
  const router = useRouter()


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const plan = formData.role === 'seeker' ? 'seeker_free' : 'recruiter_free'

    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      plan

    });
    // console.log(data, error, ' data , error ')
    if (data) {
      toast.success('data here : ' + data.user)
      router.push(redirectTo)
    }
    if (error) {

      toast.error('error here : ' + error.message)
    }
  };

  return (
    <main className="relative w-full min-h-screen flex items-center justify-center bg-[#020105] px-4 py-20 overflow-hidden select-none">

      {/* ==========================================
          1. INJECTED ENGINE: ULTRA-SLOW STARS & TEXT GRADIENT ANIMATIONS
          ========================================== */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes textGradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes cosmicDriftOne {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-35px, 20px) scale(1.03); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes cosmicDriftTwo {
          0% { transform: translate(0px, 0px) scale(1.05); }
          50% { transform: translate(30px, -25px) scale(0.98); }
          100% { transform: translate(0px, 0px) scale(1.05); }
        }
        @keyframes cosmicDriftThree {
          0% { transform: translate(0px, 0px) scale(0.95); opacity: 0.3; }
          50% { transform: translate(-15px, -15px) scale(1.05); opacity: 0.7; }
          100% { transform: translate(0px, 0px) scale(0.95); opacity: 0.3; }
        }
        @keyframes nebularPulse {
          0%, 100% { opacity: 0.25; transform: scale(1) translate(-50%, -50%); }
          50% { opacity: 0.4; transform: scale(1.12) translate(-47%, -53%); }
        }
        .animate-text-gradient {
          background-size: 200% auto;
          animation: textGradientFlow 5s linear infinite;
        }
        .animate-star-dense-1 { animation: cosmicDriftOne 45s ease-in-out infinite; }
        .animate-star-dense-2 { animation: cosmicDriftTwo 60s ease-in-out infinite; }
        .animate-star-dense-3 { animation: cosmicDriftThree 35s ease-in-out infinite; }
        .animate-nebula-glow { animation: nebularPulse 18s ease-in-out infinite; }
      `}} />

      {/* ==========================================
          2. HIGH-DENSITY SKY BEAUTY BACKGROUND
          ========================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

        {/* Layer 1: Massive Micro-Star Array */}
        <div className="absolute inset-0 animate-star-dense-1 opacity-70">
          <div className="absolute top-[7%] left-[12%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_4px_#fff]" />
          <div className="absolute top-[18%] right-[28%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute top-[32%] left-[40%] w-[1px] h-[1px] bg-zinc-400 rounded-full" />
          <div className="absolute top-[52%] right-[14%] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
          <div className="absolute top-[68%] left-[8%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute top-[85%] right-[44%] w-[1.5px] h-[1.5px] bg-indigo-200 rounded-full" />
          <div className="absolute bottom-[22%] left-[23%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute bottom-[8%] right-[19%] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_4px_#fff]" />
        </div>

        {/* Layer 2: Secondary Deep-Space Clusters */}
        <div className="absolute inset-0 animate-star-dense-2 opacity-55">
          <div className="absolute top-[12%] left-[48%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute top-[25%] left-[19%] w-[1.5px] h-[1.5px] bg-sky-200 rounded-full" />
          <div className="absolute top-[40%] right-[35%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute top-[62%] left-[29%] w-[2px] h-[2px] bg-purple-300 rounded-full" />
          <div className="absolute top-[78%] right-[21%] w-[1px] h-[1px] bg-zinc-500 rounded-full" />
          <div className="absolute bottom-[38%] right-[8%] w-[1.5px] h-[1.5px] bg-white rounded-full" />
          <div className="absolute bottom-[17%] left-[42%] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_6px_#fff]" />
          <div className="absolute bottom-[29%] left-[78%] w-[1px] h-[1px] bg-white rounded-full" />
        </div>

        {/* Layer 3: Faint Cosmic Dust Backing */}
        <div className="absolute inset-0 animate-star-dense-3">
          <div className="absolute top-[5%] right-[8%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute top-[45%] left-[15%] w-[1.5px] h-[1.5px] bg-fuchsia-300 rounded-full" />
          <div className="absolute top-[20%] right-[48%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute top-[72%] left-[49%] w-[1px] h-[1px] bg-zinc-400 rounded-full" />
          <div className="absolute bottom-[12%] left-[10%] w-[1.5px] h-[1.5px] bg-white rounded-full" />
          <div className="absolute bottom-[48%] right-[24%] w-[1px] h-[1px] bg-white rounded-full" />
          <div className="absolute bottom-[20%] right-[47%] w-[1.5px] h-[1.5px] bg-sky-300 rounded-full" />
        </div>

        {/* Glowing Ambient Nebulae Background Panels */}
        <div className="absolute top-1/4 left-1/3 w-[550px] aspect-square bg-indigo-600/10 blur-[130px] rounded-full animate-text-gradient animate-nebula-glow" />
        <div className="absolute bottom-1/4 right-1/3 w-[650px] aspect-square bg-purple-600/10 blur-[160px] rounded-full animate-text-gradient animate-nebula-glow" style={{ animationDelay: '-6s' }} />
      </div>

      {/* ==========================================
          3. SIGNUP CONTAINER LAYER
          ========================================== */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">

        {/* Dynamic Animated Text Headline */}
        <div className="text-center mb-8 flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] via-[#e879f9] to-[#bfdbfe] animate-text-gradient drop-shadow-[0_2px_10px_rgba(124,58,237,0.3)]">
            Create an Account
          </h1>
          <p className="text-sm text-zinc-400 font-medium tracking-wide">
            Join HireLoop and unlock your direct career loop.
          </p>
        </div>

        {/* Form Structural Box */}
        <div className="w-full p-[1px] rounded-3xl bg-gradient-to-b from-white/10 via-white/[0.02] to-transparent shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <div className="w-full bg-[#0a090e]/85 rounded-[23px] p-8 sm:p-10">

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Field: Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase px-1">
                  Full Name
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors duration-200">
                    <FiUser className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full h-12 pl-12 pr-4 bg-[#121118]/60 border border-zinc-800/80 rounded-xl text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-indigo-500/50 focus:bg-[#121118] focus:shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                  />
                </div>
              </div>

              {/* Field: Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase px-1">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors duration-200">
                    <FiMail className="w-5 h-5" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full h-12 pl-12 pr-4 bg-[#121118]/60 border border-zinc-800/80 rounded-xl text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-indigo-500/50 focus:bg-[#121118] focus:shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                  />
                </div>
              </div>

              {/* Field: Password */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase px-1">
                  Password
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors duration-200">
                    <FiLock className="w-5 h-5" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full h-12 pl-12 pr-12 bg-[#121118]/60 border border-zinc-800/80 rounded-xl text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-indigo-500/50 focus:bg-[#121118] focus:shadow-[0_0_15px_rgba(99,102,241,0.1)]"
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

              {/* RBAC */}

              <div className="flex flex-col gap-4">
                <div className="text-sm font-semibold text-zinc-400 tracking-wide uppercase px-1">
                  Select your role
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`cursor-pointer rounded-2xl border border-zinc-800/80 p-4 text-center transition-all duration-200 ${formData.role === 'seeker' ? 'bg-indigo-600/20 border-indigo-500/70 shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'bg-[#121118]/60 hover:bg-[#1e1b28]'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="seeker"
                      checked={formData.role === 'seeker'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="block text-sm font-medium text-white">Job Seeker</span>
                  </label>

                  <label className={`cursor-pointer rounded-2xl border border-zinc-800/80 p-4 text-center transition-all duration-200 ${formData.role === 'recruiter' ? 'bg-indigo-600/20 border-indigo-500/70 shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'bg-[#121118]/60 hover:bg-[#1e1b28]'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={formData.role === 'recruiter'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="block text-sm font-medium text-white">Job recruiter</span>
                  </label>
                </div>
              </div>


              {/* Gradient Submit Button */}
              <button
                type="submit"
                className="group relative w-full h-12 mt-4 overflow-hidden rounded-xl bg-gradient-to-r from-[#5046e6] via-[#7c3aed] to-[#c026d3] hover:from-[#6366f1] hover:via-[#8b5cf6] hover:to-[#d946ef] text-white font-semibold shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_32px_rgba(192,38,211,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Register Account</span>
                <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* OAuth Splitter */}
              <div className="relative flex items-center justify-center my-3">
                <div className="w-full border-t border-zinc-800/70" />
                <span className="absolute bg-[#0a090e] px-3 text-xs font-medium text-zinc-500 uppercase tracking-widest">
                  or register with
                </span>
              </div>

              {/* Social Login Connectors */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="h-11 rounded-xl bg-[#121118]/80 border border-zinc-800/80 hover:border-zinc-700 hover:bg-[#17151f] text-zinc-300 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98]"
                >
                  <FcGoogle className="w-5 h-5" />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="h-11 rounded-xl bg-[#121118]/80 border border-zinc-800/80 hover:border-zinc-700 hover:bg-[#17151f] text-zinc-300 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98]"
                >
                  <FaGithub className="w-5 h-5 text-white" />
                  <span>GitHub</span>
                </button>
              </div>

            </form>

            <p className="text-center text-xs text-zinc-500 mt-8 font-medium">
              Already have an account?{' '}
              <a href={`/sign-in?redirect=${redirectTo}`} className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors ml-0.5">
                Sign In here
              </a>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;