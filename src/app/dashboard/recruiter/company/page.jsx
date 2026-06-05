import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';

const CompanyProfilePage = async () => {

    const user = await getUserSession();
    console.log("user in company = " , user)
    return (
        <div>
            <CompanyProfile recruiter= {user} />
        </div>
    );
};

export default CompanyProfilePage;