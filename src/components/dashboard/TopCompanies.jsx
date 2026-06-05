import React from 'react';
import { FiGrid, FiMapPin, FiDatabase } from 'react-icons/fi';

const TopCompanies = ({ jobs = [] }) => {
  
  // Calculate dynamic metrics from the live records array
  const totalJobs = jobs.length;
  
  // Extract distinct functional categories from active jobs
  const uniqueCategories = [...new Set(jobs.map(j => j.jobCategory).filter(Boolean))];
  
  // Extract distinct geo-locations from active jobs
  const uniqueLocations = [...new Set(jobs.map(j => j.location).filter(Boolean))];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-white">Workspace Metrics</h2>
        <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/20 rounded-sm">Live</span>
      </div>

      <div className="bg-[#0a090e]/80 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] space-y-6">
        
        <div className="space-y-4">
          {/* Dynamic Row 1: Total Active Database Nodes */}
          <div className="flex items-center justify-between bg-zinc-900/30 p-3 rounded-lg border border-zinc-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <FiDatabase className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Hosted Positions</h4>
                <p className="text-[11px] text-zinc-600 mt-0.5">Active registry entries</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xl font-mono font-bold text-white">{totalJobs}</span>
            </div>
          </div>

          {/* Dynamic Row 2: Distributed Operational Segments */}
          <div className="flex items-center justify-between bg-zinc-900/30 p-3 rounded-lg border border-zinc-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <FiGrid className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Active Categories</h4>
                <p className="text-[11px] text-zinc-600 mt-0.5">Functional departments</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xl font-mono font-bold text-white">{uniqueCategories.length}</span>
            </div>
          </div>

          {/* Dynamic Row 3: Geo Deployment Clusters */}
          <div className="flex items-center justify-between bg-zinc-900/30 p-3 rounded-lg border border-zinc-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <FiMapPin className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Registered Hubs</h4>
                <p className="text-[11px] text-zinc-600 mt-0.5">Unique work locations</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xl font-mono font-bold text-white">{uniqueLocations.length}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Summary Statement footer instead of standard string label button */}
        <div className="pt-2 text-center text-[11px] text-zinc-600 leading-relaxed border-t border-zinc-900">
          Sync status nominal. Monitoring {totalJobs} positions across {uniqueCategories.length} functional structural frameworks.
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;