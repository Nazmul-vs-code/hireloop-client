'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@heroui/react';
import { CircleArrowDownFill } from '@gravity-ui/icons';
import { updateCompanyForApproval } from '@/lib/actions/companys';
import { toast } from 'react-toastify';

const CompanyTable = ({ companies: initialCompanies }) => {
  const [companies, setCompanies] = useState(initialCompanies);

  const handleApprove = async (companyId) => {
    try {
      const result = await updateCompanyForApproval(companyId, { status: 'Approved' });
      if (result) {
        toast("Approved");
        setCompanies(prev => prev.map(c => 
          c._id === companyId ? { ...c, status: 'Approved' } : c
        ));
      }
    } catch (error) {
      console.error("Failed to approve:", error);
    }
  };

  const handleReject = async (companyId) => {
    try {
      const result = await updateCompanyForApproval(companyId, { status: 'rejected' });
      if (result) {
        toast.error("Rejected");
        setCompanies(prev => prev.map(c => 
          c._id === companyId ? { ...c, status: 'rejected' } : c
        ));
      }
    } catch (error) {
      console.error("Failed to reject:", error);
    }
  };

  return (
    // 1. Fixed max-width/height so it doesn't break layout
    // 2. overflow-auto allows the scrollbar to appear only when needed
    <div className="w-full bg-[#121214] text-neutral-200 p-3 rounded-2xl border border-zinc-800/70 shadow-lg overflow-hidden">
      
      {/* Scrollable area starts here */}
      <div className="w-full overflow-x-auto overflow-y-hidden rounded-xl border border-zinc-900 bg-[#0b0b12]">
        
        {/* Added min-w-[700px] ensures it doesn't try to shrink too much on mobile */}
        <table className="w-full min-w-[700px] text-left border-collapse">
          <thead className="bg-[#0d0d14]">
            <tr className="text-zinc-500 text-[9px] uppercase tracking-wider border-b border-zinc-800/70">
              <th className="px-3 py-2 w-[180px]">Company</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2 w-[80px]">Industry</th>
              <th className="px-3 py-2 w-[60px]">Jobs</th>
              <th className="px-3 py-2 w-[100px]">Status</th>
              <th className="px-3 py-2 w-[90px]">Submitted</th>
              <th className="px-3 py-2 text-right w-[120px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {companies.map((company) => {
              const status = (company.status || 'pending').toLowerCase();
              return (
                <tr key={company._id} className="text-[11px] text-neutral-300 hover:bg-zinc-900/40">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      {company.companyLogo ? (
                        <img src={company.companyLogo} className="w-5 h-5 rounded object-cover border border-zinc-800" />
                      ) : (
                        <div className="w-5 h-5 rounded bg-indigo-500/10 flex items-center justify-center text-[8px] font-bold text-indigo-400 border border-zinc-800">
                          {company.companyName?.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span className="font-medium truncate">{company.companyName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-zinc-500">{company.recruiterEmail || 'N/A'}</td>
                  <td className="px-3 py-2 text-[10px] text-zinc-500">{company.category || 'General'}</td>
                  <td className="px-3 py-2 text-zinc-500">{company.jobCount || 0}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <CircleArrowDownFill className={`w-2.5 h-2.5 ${status === 'approved' ? 'text-emerald-500' : status === 'rejected' ? 'text-rose-500' : 'text-amber-500'}`} />
                      <span className="capitalize">{status}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-zinc-600">
                    {company.createdAt ? format(new Date(company.createdAt), 'MMM dd') : 'N/A'}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex justify-end gap-1">
                      {status !== 'approved' && (
                        <Button size="sm" className="h-6 px-2 text-[10px] rounded-none" color="primary" onPress={() => handleApprove(company._id)}>Approve</Button>
                      )}
                      {status !== 'rejected' && (
                        <Button variant='danger' className="h-6 px-2 text-[10px] rounded-none" color="danger" onPress={() => handleReject(company._id)}>Reject</Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyTable;