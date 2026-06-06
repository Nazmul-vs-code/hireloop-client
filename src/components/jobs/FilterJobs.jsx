'use client';
import React, { useState } from 'react';
import { FaAngleDoubleDown } from 'react-icons/fa';
import { FiSearch, FiBriefcase, FiFilter, FiLayers } from 'react-icons/fi';
import { IoIosArrowDropdown } from 'react-icons/io';

const FilterJobs = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({ search: '', category: 'All', type: 'All' });

  const handleChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-[#0a0a0c] border border-zinc-800 p-4 rounded-3xl mb-10 flex flex-col md:flex-row gap-4 shadow-xl">
      {/* Search Input */}
      <div className="relative flex-1">
        <FiSearch className="absolute left-4 top-3.5 text-zinc-500" />
        <input
          name="search"
          type="text"
          placeholder="Search by title..."
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Category Filter */}
      <div className="relative w-full md:w-48">
        <FaAngleDoubleDown className="absolute left-4 top-3.5 text-zinc-500" />
        <select
          name="category"
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-100 focus:outline-none focus:border-indigo-500 appearance-none transition-all"
        >
          <option value="All">All Categories</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing & Sales">Marketing</option>
          <option value="Data Science & AI">Data Science</option>
        </select>
      </div>

      {/* Job Type Filter */}
      <div className="relative w-full md:w-48">
        <IoIosArrowDropdown className="absolute left-4 top-3.5 text-zinc-500" />
        <select
          name="type"
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-100 focus:outline-none focus:border-indigo-500 appearance-none transition-all"
        >
          <option value="All">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>
    </div>
  );
};

export default FilterJobs;