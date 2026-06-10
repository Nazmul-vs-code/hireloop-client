import { serverFetch } from "../core/server"


export const getApplicationByApplicant = async (applicantId) => {
    console.log(applicantId , ' applicantid')
    return serverFetch(`/api/applications?applicantId=${applicantId}`)
}