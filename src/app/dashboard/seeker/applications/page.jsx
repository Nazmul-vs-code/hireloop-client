// src/app/dashboard/seeker/jobs/page.jsx
import React from 'react';
import { getApplicationByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import SeekerJobsRow from '@/components/dashboard/SeekerJobsRow';

const SeekerApplicationsPage = async () => {
  const user = await getUserSession();
  const jobs = await getApplicationByApplicant(user?.id);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">My Applications</h1>
        <p className="text-zinc-500 text-sm">Track your job application status here.</p>
      </div>

      <div className="border border-zinc-800 bg-[#0a090e]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Job Title</th>
              <th className="px-6 py-4 font-medium">Company</th>
              <th className="px-6 py-4 font-medium">Applied</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {!jobs || jobs.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-zinc-500">No applications found.</td>
              </tr>
            ) : (
              jobs.map((job) => <SeekerJobsRow key={job._id} job={job} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeekerApplicationsPage;