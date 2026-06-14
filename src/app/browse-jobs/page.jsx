'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import PublicJobsCard from '@/components/jobs/PublicJobsCard';
import FilterJobs from '@/components/jobs/FilterJobs';
import { GetAllJobsForBrowsing } from '@/lib/api/jobs';
import { PaginationWithSummary } from './PaginationWithSummary';

const PublicJobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [page, setPage] = useState(1);
    
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    
    const JOBS_PER_PAGE = 6;

    // 1. Initial Load
    useEffect(() => {
        GetAllJobsForBrowsing().then((data) => setJobs(data || []));
    }, []);

    // 2. Filter logic & Pagination reset
    useEffect(() => {
        if (jobs.length === 0) return;
        
        const s = searchParams.get('search') || '';
        const cat = searchParams.get('category') || 'All';
        const type = searchParams.get('type') || 'All';
        const remote = searchParams.get('remote') || 'All';

        let filtered = jobs;
        if (s) filtered = filtered.filter(j => j.jobTitle.toLowerCase().includes(s.toLowerCase()));
        if (cat !== 'All') filtered = filtered.filter(j => j.jobCategory === cat);
        if (type !== 'All') filtered = filtered.filter(j => j.jobType === type);
        if (remote !== 'All') filtered = filtered.filter(j => j.isRemote === (remote === 'true'));

        setFilteredJobs(filtered);
        setPage(1); // Reset to page 1 whenever filters change
    }, [searchParams, jobs]);

    // 3. Handle Filter Changes
    const handleFilter = (newFilters) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(newFilters).forEach(([key, val]) => {
            if (val && val !== 'All') params.set(key, val);
            else params.delete(key);
        });
        router.push(`${pathname}?${params.toString()}`);
    };

    // 4. Calculate pagination slice
    const startIndex = (page - 1) * JOBS_PER_PAGE;
    const paginatedJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);
    const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE) || 1;

    return (
        <div className="min-h-screen bg-[#020105] text-zinc-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <FilterJobs onFilterChange={handleFilter} />
                
                <p className="text-zinc-500 mb-6 font-medium">
                    Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'} found
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedJobs.map((job) => (
                        <PublicJobsCard key={job._id} job={job} />
                    ))}
                </div>

                {filteredJobs.length > 0 && (
                    <PaginationWithSummary 
                        page={page} 
                        setPage={setPage} 
                        totalPages={totalPages} 
                        totalItems={filteredJobs.length}
                        itemsPerPage={JOBS_PER_PAGE}
                    />
                )}
            </div>
        </div>
    );
};

export default PublicJobsPage;