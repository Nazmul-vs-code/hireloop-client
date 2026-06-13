import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const getAllCompanies = async () => {
    return serverFetch('/api/companies')
}

export const getRecruiterCompany = async (recruiterId) => {
    return serverFetch(`/api/my/companys?recruiterId=${recruiterId}`)
}


export const GetLoggedinRecruiterCompany = async () => {
    const user = await getUserSession();
    return getRecruiterCompany(user?.id)
}