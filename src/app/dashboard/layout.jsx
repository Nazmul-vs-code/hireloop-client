import { DasboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className='flex min-h-screen flex-1'>
            <DasboardSidebar />
            <div>{children}</div>
        </div>
    );
};

export default DashboardLayout;