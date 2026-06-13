import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';


export const authHeader = async () => {
    const token = await getUserToken()

    const header = {
        authorization: `Bearer ${token}`
    }

    return token ? header : {};
}

export const serverFetch = async (path) => {
    const res = await fetch(`${ServerUrl}${path}`)
    return res.json()
}

export const protectedFetch = async (path) => {

    const res = await fetch(`${ServerUrl}${path}`, {
        headers: await authHeader()
    })
    return handleStatusCode(res)
}


export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${ServerUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            // ... await authHeader()
        },
        body: JSON.stringify(data)
    })
    console.log('Sever Status : ', res.status)

    return handleStatusCode(res)
}

const handleStatusCode = (res) => {
    if (res.status === 401) {
        redirect('/unauthorized')
    }
    if (res.status === 403) {
        redirect('/sign-in')
    }

    return res.json()

}