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
                <div className="mb-10 text-center md:text-left relative group">
                    {/* Glowing backdrop effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                    <h1 className="relative text-4xl md:text-5xl font-extrabold tracking-tight mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Explore
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 ml-3 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                            Opportunities
                        </span>
                    </h1>

                    <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mt-4 mx-auto md:mx-0 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
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