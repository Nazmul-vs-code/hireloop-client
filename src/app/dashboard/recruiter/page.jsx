'use client'
import { DasboardSidebar } from '@/components/dashboard/DashboardSidebar';
import HiringSummaryCards from '@/components/dashboard/HiringSummaryCards';
import { authClient } from '@/lib/auth-client';
import React from 'react';
import { FaUser } from 'react-icons/fa';

const RecruiterDashboard = () => {
    const { data: session, isPending } = authClient.useSession();
    const person = session?.user

    return (
        <div className='flex flex-col gap-8' >
            
            <h1 className='flex items-center'>I am { isPending ? <FaUser /> : person?.name }</h1>
            <HiringSummaryCards />
        </div>
    );
};

export default RecruiterDashboard;