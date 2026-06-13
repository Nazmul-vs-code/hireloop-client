import { protectedFetch, serverFetch } from "../core/server"


export const getApplicationByApplicant = async (applicantId) => {
    console.log(applicantId , ' applicantid')
    return protectedFetch(`/api/applications?applicantId=${applicantId}`)
}