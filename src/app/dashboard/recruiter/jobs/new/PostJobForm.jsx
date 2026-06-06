'use client'
import { createJob } from '@/lib/actions/jobs';
import { useRouter } from 'next/navigation'; // Using useRouter inside Client Component for reliable navigation
import React from 'react';
import {
  FiBriefcase,
  FiFileText,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
  FiLayers,
  FiAlertTriangle
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const PostJobForm = ({ company }) => {
  const router = useRouter();

  // Guard Clause: If the recruiter hasn't registered a company yet, block submission and prompt action
  if (!company) {
    return (
      <div className="min-h-screen bg-[#020105] text-zinc-100 p-4 flex justify-center items-center">
        <div className="w-full max-w-md bg-[#0a090e]/80 border border-zinc-800/80 rounded-xl p-8 backdrop-blur-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
            <FiAlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-md font-bold text-white">Company Workspace Required</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              You must register your company profile dashboard before you can deploy live job listings to the network.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const jobPayload = Object.fromEntries(formData.entries());

    const payload = {
      ...jobPayload,
      companyId: company._id, 
      status: "active",
      companyName: company.companyName, 
      companyLogo: company.companyLogo,
      isPubliclyVisible: true
    };

    try {
      const res = await createJob(payload);

      if (res && res.insertedId) {
        toast.success('Job posted successfully');
        e.target.reset();
        
        // redirect() inside an async submit function on client components can cause unhandled promise rejections. 
        // router.push provides a cleaner navigation lifecycle experience here.
        router.push('/dashboard/recruiter/jobs');
      } else {
        throw new Error("Server processed transaction matrix but failed ingestion lifecycle.");
      }
    } catch (error) {
      console.error("Job post submission error:", error);
      toast.error(error.message || "Failed to post job listing.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020105] text-zinc-100 p-4 sm:p-6 lg:p-8 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-[#0a090e]/80 border border-zinc-800/80 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden transition-all duration-300">

        {/* Main Header Block */}
        <div className="border-b border-zinc-800/80 p-6 sm:p-8 bg-gradient-to-r from-zinc-900/40 to-transparent">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            Deploy New Position
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Fill out the listing fields completely to initialize your position on the public network.</p>
        </div>

        {/* Unified Continuous Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-10">

          {/* SECTION 1: JOB INFO */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800/60 pb-3">
              <div className="p-2 rounded-sm bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <FiBriefcase className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-md font-semibold text-zinc-200">1. Job Information</h3>
                <p className="text-xs text-zinc-500">Core parameters and targeting details for the position.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Job Title */}
              <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Job Title</label>
                <input
                  name="jobTitle"
                  type="text"
                  placeholder="e.g. Senior Full-Stack Engineer"
                  className="w-full h-11 px-4 rounded-sm bg-zinc-900/90 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  required
                />
              </div>

              {/* Job Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Job Category</label>
                <select
                  name="jobCategory"
                  className="w-full h-11 px-4 rounded-sm bg-zinc-900/90 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                >
                  <option>Software Engineering</option>
                  <option>Design & Creative</option>
                  <option>Product Management</option>
                  <option>Marketing & Sales</option>
                  <option>Data Science & AI</option>
                </select>
              </div>

              {/* Job Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Job Type</label>
                <select
                  name="jobType"
                  className="w-full h-11 px-4 rounded-sm bg-zinc-900/90 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Remote</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              {/* Application Deadline */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <FiCalendar className="text-zinc-500" /> Application Deadline
                </label>
                <input
                  name="deadline"
                  type="date"
                  className="w-full h-11 px-4 rounded-sm bg-zinc-900/90 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  required
                />
              </div>

              {/* Location Input Field */}
              <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <FiMapPin className="text-zinc-500" /> Location Specifier / Remote Configurations
                </label>
                <input
                  name="location"
                  type="text"
                  placeholder="e.g. San Francisco, US (or type 'Remote')"
                  className="w-full h-11 px-4 rounded-sm bg-zinc-900/90 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  required
                />
              </div>

              {/* Salary Grouping */}
              <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-3 p-5 rounded-sm bg-[#07060a] border border-zinc-900">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                  <FiDollarSign className="text-zinc-500" /> Compensation Parameters
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] text-zinc-500 block mb-1">Minimum Range</label>
                    <input
                      name="salaryMin"
                      type="number"
                      placeholder="60,000"
                      className="w-full h-10 px-3 rounded-sm bg-zinc-950 border border-zinc-800 text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-500 block mb-1">Maximum Range</label>
                    <input
                      name="salaryMax"
                      type="number"
                      placeholder="110,000"
                      className="w-full h-10 px-3 rounded-sm bg-zinc-950 border border-zinc-800 text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-500 block mb-1">Currency</label>
                    <select
                      name="currency"
                      className="w-full h-10 px-3 rounded-sm bg-zinc-950 border border-zinc-800 text-sm focus:outline-none focus:border-indigo-500 text-zinc-300"
                    >
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>BDT (৳)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: JOB DESCRIPTION */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800/60 pb-3">
              <div className="p-2 rounded-sm bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <FiFileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-md font-semibold text-zinc-200">2. Role Requirements & Criteria</h3>
                <p className="text-xs text-zinc-500">Provide detailed lists of expectations, daily responsibilities, and benefits.</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Responsibilities Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Core Responsibilities</label>
                <textarea
                  name="responsibilities"
                  rows={5}
                  placeholder="Outline day-to-day duties, operational goals, and team expectations..."
                  className="w-full p-4 rounded-sm bg-zinc-900/90 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
                  required
                />
              </div>

              {/* Requirements Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Requirements & Qualifications</label>
                <textarea
                  name="requirements"
                  rows={5}
                  placeholder="List standard skill profiles, education, technical tech-stacks required..."
                  className="w-full p-4 rounded-sm bg-zinc-900/90 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
                  required
                />
              </div>

              {/* Benefits Textarea (Optional) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Perks & Benefits</label>
                  <span className="text-[10px] text-zinc-600 font-medium uppercase tracking-wide">Optional</span>
                </div>
                <textarea
                  name="benefits"
                  rows={4}
                  placeholder="Health coverage, stock options, remote workspace adjustments, vacation guidelines..."
                  className="w-full p-4 rounded-sm bg-zinc-900/90 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: REAL COMPANY REGISTRY PREVIEW */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800/60 pb-3">
              <div className="p-2 rounded-sm bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <FiLayers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-md font-semibold text-zinc-200">3. Corporate Registry Authorization</h3>
                <p className="text-xs text-zinc-500">Verification parameters linking the position back to your workspace hub.</p>
              </div>
            </div>

            {/* Real Profile Card Container (Hydrated with real data props) */}
            <div className="p-6 rounded-sm bg-gradient-to-b from-zinc-900/50 to-[#07060a] border border-zinc-800/80 relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-r from-transparent to-indigo-500/5 blur-xl pointer-events-none" />

              <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase block mb-4">
                Recruiter Identity Signature
              </span>

              <div className="flex items-start sm:items-center gap-4">
                {company.companyLogo ? (
                  <img 
                    src={company.companyLogo} 
                    alt={company.companyName} 
                    className="w-12 h-12 rounded-sm object-cover border border-zinc-800 bg-zinc-900 shadow-lg"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg text-lg uppercase">
                    {company.companyName ? company.companyName.slice(0, 2) : "HL"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                    <h4 className="text-md font-bold text-white truncate">{company.companyName}</h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                      <FiCheckCircle className="w-3 h-3" /> Verified Business Account
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                    <FiMapPin className="w-3 h-3" /> {company.location || 'Global Operations Hub'}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-800/60 text-xs text-zinc-500 leading-relaxed">
                Notice: This position will automatically track under your corporate system profile. Your verified authorization signature permits sending database entries directly to live channels.
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON SYSTEM BAR */}
          <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-xs text-zinc-500 max-w-md">
              By confirming, this post initializes running states as <span className="text-emerald-400 font-semibold underline">Active</span>, linked directly to your corporate identification keys.
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 h-11 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-sm font-semibold text-sm transition-all duration-300 shadow-[0_4px_25px_rgba(99,102,241,0.25)] active:scale-[0.98]"
            >
              Publish & Make Public
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PostJobForm;