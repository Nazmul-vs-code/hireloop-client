'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaAngleDoubleDown, FaGlobe } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDropdown } from 'react-icons/io';

const FilterJobs = ({ onFilterChange }) => {
  const sp = useSearchParams();
  const [filters, setFilters] = useState({ 
    search: sp.get('search') || '', 
    category: sp.get('category') || 'All', 
    type: sp.get('type') || 'All',
    remote: sp.get('remote') || 'All'
  });

  const handleChange = (e) => {
    const next = { ...filters, [e.target.name]: e.target.value };
    setFilters(next);
    onFilterChange(next);
  };

  return (
    <div className="bg-[#0a0a0c] border border-zinc-800 p-4 rounded-3xl mb-10 flex flex-wrap gap-4">
      <input name="search" value={filters.search} onChange={handleChange} placeholder="Search..." className="flex-1 min-w-[200px] p-3 bg-zinc-950 border border-zinc-800 rounded-2xl" />
      
      <select name="category" value={filters.category} onChange={handleChange} className="w-48 p-3 bg-zinc-950 border border-zinc-800 rounded-2xl">
        <option value="All">All Categories</option>
        <option value="Software Engineering">Software Engineering</option>
        <option value="Design">Design</option>
      </select>

      <select name="type" value={filters.type} onChange={handleChange} className="w-48 p-3 bg-zinc-950 border border-zinc-800 rounded-2xl">
        <option value="All">All Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
      </select>

      <select name="remote" value={filters.remote} onChange={handleChange} className="w-48 p-3 bg-zinc-950 border border-zinc-800 rounded-2xl">
        <option value="All">Any Location</option>
        <option value="true">Remote Only</option>
        <option value="false">On-site</option>
      </select>
    </div>
  );
};
export default FilterJobs;