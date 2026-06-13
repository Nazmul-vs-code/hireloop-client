'use client';
import React from 'react';
import { Table, Button } from "@heroui/react";
import { FaUserTie, FaUser, FaUserShield } from 'react-icons/fa';
import { updateUserRole } from '@/lib/actions/users';

const UsersTable = ({ users = [] }) => {
  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return <FaUserShield size={10} />;
      case 'recruiter': return <FaUserTie size={10} />;
      default: return <FaUser size={10} />;
    }
  };

  const getRoleStyle = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return 'text-yellow-500';
      case 'recruiter': return 'text-indigo-400';
      default: return 'text-emerald-500';
    }
  };

  const handleChangeRole = async (userId , role) => {
      const res = await updateUserRole(userId , role)
      console.log(res , ' response ')
    //   if(res.success) {

    //       console.log()
    //   }
    }

  
  const handleStatusChangeActions = (userId , action) => {
    console.log("Changed the Action with user id : ", userId , " to : " , action )
  }



  return (
    <div className="w-full bg-[#121214] border border-zinc-800 rounded-lg overflow-hidden">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="User management" className="min-w-[700px] text-[10px]">
            <Table.Header>
              <Table.Column>User Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Joined</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Actions To Make</Table.Column>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id} className="h-8">
                  <Table.Cell>
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] text-zinc-400">
                        {user.name?.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-zinc-100 truncate text-[80%]">{user.name}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-zinc-300 text-[90%]">{user.email}</Table.Cell>
                  <Table.Cell>
                    <div className={`flex items-center gap-1 text-[80%] ${getRoleStyle(user.role)}`}>
                      {getRoleIcon(user.role)}
                      <span className="capitalize">{user.role || 'Seeker'}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-zinc-500 text-[70%]">{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <span className={`text-[9px] ${user.banned ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {user.banned ? "● Suspended" : "● Active"}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-0.5">
                      {/* Conditional Buttons for Non-Admins */}
                      {user.role !== 'admin' && (
                        <>
                          <Button 
                          onClick={()=> handleChangeRole(user?.id,'admin')}
                          className="h-5 text-[8px] px-1" variant="danger-soft">Admin</Button>
                          <Button 
                          onClick={() => handleChangeRole(user.id, user.role === 'recruiter' ? 'seeker' : 'recruiter')}
                          className="h-5 text-[8px] px-1" variant="secondary">
                            {user.role === 'recruiter' ? 'Seeker' : 'Recruiter'}
                          </Button>
                        </>
                      )}
                      
                      {/* Suspend/Activate Button (Always visible) */}
                      <Button 
                        className="h-5 text-[8px] px-1" 
                        variant={user.banned ? "danger" : "ghost"} 
                        // color={user.banned ? "success" : "danger"}
                        onClick={() => handleStatusChangeActions(user.id , user.banned ? "Activate" : "Suspend")}
                      >
                        {user.banned ? "Activate" : "Suspend"}
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default UsersTable;