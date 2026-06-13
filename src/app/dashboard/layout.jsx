import { DasboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const DashboardLayout = async ({children}) => {

    const user = await getUserSession()
    // console.log('user in dashboard : ' , user)
    return (
        <div className='flex min-h-screen'>
            <DasboardSidebar role={user?.role}  />
            <div className="flex-1 min-w-0">{children}</div>
        </div>
    );
};

export default DashboardLayout;