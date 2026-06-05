import React from 'react';
import PostJobForm from './PostJobForm';
import { GetLoggedinRecruiterCompany } from '@/lib/api/companys';

const PostJobPage = async() => {


    const company = await GetLoggedinRecruiterCompany()
    console.log(company , ' company in job post page ')
    return (
        <div>
            <PostJobForm company={company} />
        </div>
    );
};

export default PostJobPage;