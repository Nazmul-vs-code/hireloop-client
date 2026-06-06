import { GetAllJobsForBrowsing } from '@/lib/api/jobs';
import React from 'react';
import PublicJobsCard from '@/components/dashboard/PublicJobsCard'; // Adjust import path if needed

const PublicJobsPage = async () => {
  const PublicJobs = await GetAllJobsForBrowsing() || [];
  console.log(PublicJobs , ' public jobs ')

  return (
    <div className="min-h-screen bg-[#020105] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Opportunities</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl">
            Discover roles from top tier companies. Find your next great career move.
          </p>
        </div>

        {/* Jobs Grid */}
        {PublicJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PublicJobs.map((job, index) => (
              <PublicJobsCard key={job._id || index} job={job} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
            <svg className="w-16 h-16 text-zinc-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <h3 className="text-xl font-medium text-zinc-300">No jobs found</h3>
            <p className="text-zinc-500 mt-2">Check back later for new opportunities.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default PublicJobsPage;