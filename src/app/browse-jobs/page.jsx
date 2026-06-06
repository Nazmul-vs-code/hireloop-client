'use client'; // This must be a client component now to hold the filtered list
import React, { useState, useEffect } from 'react';
import PublicJobsCard from '@/components/jobs/PublicJobsCard';
import FilterJobs from '@/components/jobs/FilterJobs';
import { GetAllJobsForBrowsing } from '@/lib/api/jobs';

const PublicJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    GetAllJobsForBrowsing().then((data) => {
      setJobs(data || []);
      setFilteredJobs(data || []);
    });
  }, []);

  const handleFilter = ({ search, category, type }) => {
    let filtered = jobs;

    if (search) filtered = filtered.filter(j => j.jobTitle.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'All') filtered = filtered.filter(j => j.jobCategory === category);
    if (type !== 'All') filtered = filtered.filter(j => j.jobType === type);

    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-[#020105] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Explore Opportunities</h1>
        </div>
        
        <FilterJobs onFilterChange={handleFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => <PublicJobsCard key={job._id} job={job} />)}
        </div>
      </div>
    </div>
  );
};

export default PublicJobsPage;