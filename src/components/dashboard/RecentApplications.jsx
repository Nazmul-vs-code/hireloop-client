import React from 'react';
import { FiEdit2, FiEye } from 'react-icons/fi';
import { DeleteJobsModal } from './DeleteJobsModal';

const RecentApplications = ({ jobs = [] }) => {
  
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'expired':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      default:
        return 'bg-zinc-800 text-zinc-300 border border-zinc-700';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-white">Active Deployments</h2>
        <span className="text-xs text-zinc-500 font-mono">Total Records: {jobs.length}</span>
      </div>

      <div className="w-full bg-[#0a090e]/80 border border-zinc-800/80 rounded-xl overflow-hidden backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800/80 text-xs uppercase tracking-wider text-zinc-500 bg-zinc-900/20">
                <th className="py-4 px-6 font-semibold">Position Title</th>
                <th className="py-4 px-6 font-semibold">Category</th>
                <th className="py-4 px-6 font-semibold">Location Type</th>
                <th className="py-4 px-6 font-semibold">Compensation Range</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-zinc-500 text-xs">
                    No active records streams found in this database instance.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-zinc-900/20 transition-colors group">
                    {/* Position Title */}
                    <td className="py-4 px-6 font-semibold text-white whitespace-nowrap">
                      {job.jobTitle}
                    </td>
                    {/* Category */}
                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                      {job.jobCategory}
                    </td>
                    {/* Location type */}
                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-sm bg-zinc-900 text-zinc-300 text-xs border border-zinc-800">
                        {job.location}
                      </span>
                    </td>
                    {/* Compensation Range */}
                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap font-mono text-xs">
                      {job.salaryMin && job.salaryMax 
                        ? `${Number(job.salaryMin).toLocaleString()} - ${Number(job.salaryMax).toLocaleString()} ${job.currency || 'USD'}`
                        : 'Not Specified'}
                    </td>
                    {/* Status badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide ${getStatusStyles(job.status)}`}>
                        {job.status || 'active'}
                      </span>
                    </td>
                    {/* CRITICAL ACTIONS COLUMN */}
                    <td className="py-4 px-6 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button className="p-1.5 text-zinc-500 hover:text-indigo-400 rounded-sm bg-zinc-900/50 border border-zinc-800 transition-colors" title="View Details">
                          <FiEye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-zinc-500 hover:text-emerald-400 rounded-sm bg-zinc-900/50 border border-zinc-800 transition-colors" title="Edit Entry">
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* Dynamic Delete Trigger Block */}
                        <DeleteJobsModal jobId={job._id} jobTitle={job.jobTitle} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentApplications;