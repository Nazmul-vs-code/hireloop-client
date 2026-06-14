'use server'
import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserList = async () => {
    const users = await auth.api.listUsers({
        query: {
            sortBy: "createdAt",
            sortDirection: "desc",
            filterField: "email",
            // filterValue: "hello@example.com",
            filterOperator: "eq",
        },
        // This endpoint requires session cookies.
        headers: await headers(),
    });

    return users;
}