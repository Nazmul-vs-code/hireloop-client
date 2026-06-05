import React from 'react';
import RecentApplications from '@/components/dashboard/RecentApplications';
import TopCompanies from '@/components/dashboard/TopCompanies';
import { getJobs } from '@/lib/api/jobs';
import { GetLoggedinRecruiterCompany } from '@/lib/api/companys';

const RecruiterJobsPage = async () => {
  
  const company = await GetLoggedinRecruiterCompany();

  const jobs = await getJobs(company._id) || [];

  return (
    <div className="min-h-screen bg-[#020105] text-zinc-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Core Jobs Data Table */}
        <div className="lg:col-span-2">
          <RecentApplications jobs={jobs} />
        </div>

        {/* Right Column: Dynamic Stats Panel */}
        <div className="lg:col-span-1">
          <TopCompanies jobs={jobs} />
        </div>

      </div>
    </div>
  );
};

export default RecruiterJobsPage;