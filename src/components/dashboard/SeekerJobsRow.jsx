// src/components/dashboard/SeekerJobsRow.jsx
import React from 'react';

const SeekerJobsRow = ({ job }) => {
  // Simple helper to style badges based on status
  const getStatusStyle = (status) => {
    const base = "px-2.5 py-0.5 rounded-full text-[10px] font-medium border";
    switch (status?.toLowerCase()) {
      case 'applied': return `${base} bg-zinc-900 border-zinc-700 text-zinc-300`;
      case 'review': return `${base} bg-amber-500/10 border-amber-500/30 text-amber-500`;
      case 'shortlisted': return `${base} bg-emerald-500/10 border-emerald-500/30 text-emerald-500`;
      case 'rejected': return `${base} bg-rose-500/10 border-rose-500/30 text-rose-500`;
      case 'offered': return `${base} bg-blue-500/10 border-blue-500/30 text-blue-500`;
      default: return `${base} bg-zinc-900 border-zinc-700 text-zinc-400`;
    }
  };

  return (
    <tr className="hover:bg-zinc-900/30 transition-colors">
      <td className="px-6 py-5 flex items-center gap-4">
        <div className="size-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          {job.companyLogo ? (
            <img src={job.companyLogo} alt={job.companyName} className="size-6 object-contain" />
          ) : (
            <span className="text-zinc-600 font-bold text-sm">{job.companyName?.charAt(0)}</span>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{job.jobTitle}</div>
          <div className="text-[11px] text-zinc-500">Full-time • Remote</div>
        </div>
      </td>
      <td className="px-6 py-5 text-sm text-zinc-300">{job.companyName}</td>
      <td className="px-6 py-5 text-sm text-zinc-400">
        {new Date(job.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-5">
        <span className={getStatusStyle(job.status || 'Applied')}>
          {job.status || 'Applied'}
        </span>
      </td>
      <td className="px-6 py-5 text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer">
        Details
      </td>
    </tr>
  );
};

export default SeekerJobsRow;