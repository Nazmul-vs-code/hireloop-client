import UsersTable from '@/components/dashboard/admin/UsersTable';
import { getUserList } from '@/lib/api/users';
import React from 'react';

const AdminUsersPage = async () => {
    const data = await getUserList()
    console.log(data , ' users ')
    const users = data?.users
    return (
        <div className="p-8 bg-[#020105] min-h-screen text-zinc-100">
            <h1 className="text-2xl font-bold mb-6">Users</h1>
            <UsersTable users={users} />
        </div>
    );
};

export default AdminUsersPage;