import { serverFetch } from "../core/server";

const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const getRecruiterCompany = async (recruiterId) => {
    return serverFetch(`/api/my/companys?recruiterId=${recruiterId}`)
}