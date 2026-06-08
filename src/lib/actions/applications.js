import { serverMutation } from "../core/server";

const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const submitApplications = async (application) => {
    return serverMutation('/api/applications' , application)
}