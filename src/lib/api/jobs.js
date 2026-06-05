const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';


export const getJobs = async (comnpnyId , status='active') => {
    const res = await fetch(`${ServerUrl}/api/jobs?companyId=${comnpnyId}&${status}`)
    return res.json();
}