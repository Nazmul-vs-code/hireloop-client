import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companys';

const CompanyProfilePage = async () => {

    const user = await getUserSession();
    // console.log("user in company = " , user)
    const company = await getRecruiterCompany(user?.id)
    console.log(company , ' companys ')

    return (
        <div>
            <CompanyProfile recruiter= {user} recruiterCompany={company} />
        </div>
    );
};

export default CompanyProfilePage;