'use server'
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";


export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()

    })

    // console.log('session : ' , session)
    return session?.user || null;

}

export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()

    })

    return session?.session?.token || null;
}


export const requireRole = async (role) => {
    const user = await getUserSession()
    if (!user) {
        redirect('/sign-in')
    }
    if (user?.role !== role) {
        return redirect('/unauthorized')
    }

    return user;
}