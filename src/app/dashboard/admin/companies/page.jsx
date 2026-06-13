import CompanyTable from '@/components/dashboard/admin/CompanyTable';
import { getAllCompanies } from '@/lib/api/companys';
import React from 'react';
import { FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

const AdminCompaniesPage = async () => {
    const companies = await getAllCompanies();
    
    const pendingCount = companies.filter(c => c.status === 'pending').length;
    const approvedCount = companies.filter(c => c.status === 'Approved').length;
    const rejectedCount = companies.filter(c => c.status === 'rejected').length;

    const stats = [
        { label: "Pending", count: pendingCount, icon: FiClock, color: "text-amber-400" },
        { label: "Approved", count: approvedCount, icon: FiCheckCircle, color: "text-emerald-400" },
        { label: "Rejected", count: rejectedCount, icon: FiXCircle, color: "text-rose-400" },
    ];

    return (
        <div className="min-h-screen bg-[#020105] text-zinc-100 p-4 md:p-8">
            <h1 className="text-2xl font-bold mb-6">
                Corporate Registered: <span className='text-yellow-400'>{companies.length}</span>
            </h1>

            {/* Summary Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
                {stats.map((stat) => (
                    <button 
                        key={stat.label}
                        className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#0a090e] border border-zinc-800 hover:border-zinc-600 transition-all active:scale-95"
                    >
                        <stat.icon className={`size-5 ${stat.color}`} />
                        <span className="text-sm font-medium text-zinc-300">{stat.label}</span>
                        <span className="text-sm font-bold bg-zinc-800 px-2 py-0.5 rounded-md">
                            {stat.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Table Section */}
            <CompanyTable companies={companies} />
        </div>
    );
};

export default AdminCompaniesPage;