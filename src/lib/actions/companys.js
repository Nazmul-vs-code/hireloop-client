import { serverMutation } from "../core/server";

const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const createCompany = async (newCompanyData) => {
    return serverMutation('/api/companys', newCompanyData)
}

// export const createCompany = async (newCompanyData) => {
//     const res = await fetch(`${ServerUrl}/api/companys`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newCompanyData)
//     })

//     return res.json()
// }