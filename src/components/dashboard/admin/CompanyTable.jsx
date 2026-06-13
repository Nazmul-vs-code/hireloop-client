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
        toast("Approved")
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
        toast.error("Rejected")
        setCompanies(prev => prev.map(c => 
          c._id === companyId ? { ...c, status: 'rejected' } : c
        ));
      }
    } catch (error) {
      console.error("Failed to reject:", error);
    }
  };

  return (
    <div className="w-full bg-[#121214] text-neutral-200 p-4 md:p-6 rounded-3xl border border-zinc-800/70 shadow-[0_8px_40px_rgba(0,0,0,0.25)] max-h-[800px] max-w-[70%] overflow-y-auto overflow-x-auto ">
      {/* Container with horizontal scroll for mobile responsiveness */}
      <div className="overflow-x-auto rounded-3xl border border-zinc-900 bg-[#0b0b12]">
        <table className="w-full min-w-[700px] border-collapse">
          <thead className="bg-[#0d0d14]">
            <tr className="text-zinc-400 text-[11px] uppercase tracking-[0.22em] border-b border-zinc-800/70">
              <th className="px-4 py-4 text-left md:px-6">Company</th>
              <th className="px-4 py-4 text-left md:px-6">Email</th>
              <th className="px-4 py-4 text-left md:px-6">Industry</th>
              <th className="px-4 py-4 text-left md:px-6">jobs</th>
              <th className="px-4 py-4 text-left md:px-6">Status</th>
              <th className="px-4 py-4 text-left md:px-6">Submitted</th>
              <th className="px-4 py-4 text-right md:px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {companies.map((company) => {
              const status = (company.status || 'pending').toLowerCase();
              return (
                <tr key={company._id} className="text-sm text-neutral-200 hover:bg-zinc-900/30 transition-colors">
                  <td className="px-4 py-4 md:px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {company.companyLogo ? (
                        <img
                          src={company.companyLogo}
                          alt={company.companyName}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-xl object-cover border border-zinc-800"
                        />
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-xs font-bold text-indigo-400 border border-zinc-800">
                          {company.companyName?.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span className="font-medium text-neutral-100">{company.companyName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 md:px-6 text-zinc-400">{company.recruiterEmail || 'N/A'}</td>
                  <td className="px-4 py-4 md:px-6">
                    <span className="px-3 py-1 rounded-full text-[11px] bg-zinc-900/70 text-zinc-300 border border-zinc-800">
                      {company.category || 'General'}
                    </span>
                  </td>
                  <td className="px-4 py-4 md:px-6">
                    <span className="px-3 py-1 rounded-full text-[11px] bg-zinc-900/70 text-zinc-300 border border-zinc-800">
                      {company.jobCount || 0 }
                    </span>
                  </td>
                  <td className="px-4 py-4 md:px-6">
                    <div className="inline-flex items-center gap-2 text-xs font-medium">
                      <CircleArrowDownFill className={`w-3 h-3 ${
                        status === 'approved' ? 'text-emerald-400' :
                        status === 'rejected' ? 'text-rose-400' : 'text-amber-400'
                      }`} />
                      <span className={status === 'approved' ? 'text-emerald-400' : status === 'rejected' ? 'text-rose-400' : 'text-amber-400'}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 md:px-6 text-zinc-400 text-xs">
                    {company.createdAt ? format(new Date(company.createdAt), 'MMM dd, yyyy') : 'N/A'}
                  </td>
                  <td className="px-4 py-4 md:px-6 text-right">
                    <div className="flex justify-end gap-2">
                      {status !== 'approved' && (
                        <Button
                          className="rounded-none
                           px-4 text-xs font-medium"
                          variant="primary"
                          onPress={() => handleApprove(company._id)}
                        >
                          Approve
                        </Button>
                      )}
                      {status !== 'rejected' && (
                        <Button
                          className="rounded-none px-4 text-xs font-medium"
                          variant="danger"
                          onPress={() => handleReject(company._id)}
                        >
                          Reject
                        </Button>
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