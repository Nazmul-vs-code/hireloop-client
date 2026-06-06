import React from 'react';
import { FiMapPin, FiDollarSign, FiArrowRight, FiBriefcase } from 'react-icons/fi';

const PublicJobsCard = ({ job }) => {
  const formatSalary = (amount) => new Intl.NumberFormat('en-US').format(amount);

  return (
    <div className="group relative bg-[#060608] border border-zinc-800 rounded-3xl p-6 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]">
      
      {/* 1. TOP SECTION: Company Logo & Basic Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-lg">
          {job.companyLogo ? (
            <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold text-lg">
              {job.companyName?.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-zinc-300 font-medium text-sm">{job.companyName}</h4>
          <p className="text-zinc-600 text-xs tracking-wide uppercase">Verified Employer</p>
        </div>
      </div>

      {/* 2. JOB TITLE & CATEGORY (Highlighted Area) */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl mb-4">
        <div className="flex items-center gap-2 mb-2 text-indigo-400">
          <FiBriefcase className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">{job.jobCategory}</span>
        </div>
        <h3 className="text-white font-bold text-xl leading-tight">
          {job.jobTitle}
        </h3>
      </div>

      {/* 3. METADATA TAGS */}
      <div className="flex gap-2 mb-6">
        <span className="px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase">
          {job.jobType}
        </span>
      </div>

      {/* 4. SALARY & LOCATION (Bottom Footer View) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-emerald-400 font-bold text-lg flex items-center gap-1.5">
              <FiDollarSign className="w-4 h-4" />
              {job.currency} {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)}
            </div>
            <div className="text-zinc-500 text-xs flex items-center gap-1.5">
              <FiMapPin className="w-3 h-3" />
              {job.location}
            </div>
          </div>
          
          <button className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all duration-300">
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicJobsCard;