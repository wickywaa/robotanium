import React, { useEffect } from "react";
import { Button } from 'primereact/button';

import { AdminUsersTable, CreateUserModal } from '../../components/';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectUser, selectUserManagement } from '../../store/selectors';
import {createAdminUserAttempt, setShowCreateAdminuser } from "../../store";

export const AdminUsersContainer: React.FC = () => {

  const user = useAppSelector(selectUser);
  const userManagement = useAppSelector(selectUserManagement)
  const dispatch = useAppDispatch()

  const createUser = (email: string, userName: string) => dispatch(createAdminUserAttempt({ email, userName }))
  
  return (
    <div>
      <CreateUserModal 
      onCreateUser={createUser} 
      user={user} userType={'admin'} 
      isVisible={userManagement.showCreateAdminUser} 
      close={() => dispatch(setShowCreateAdminuser(!userManagement.showCreateAdminUser))} />
      <Button 
      onClick={() => dispatch(setShowCreateAdminuser(!userManagement.showCreateAdminUser))} 
      style={{ margin: "10px", height: "50px", width: "50px" }} icon="pi pi-plus" />
      <AdminUsersTable />
    </div>
  );
};
