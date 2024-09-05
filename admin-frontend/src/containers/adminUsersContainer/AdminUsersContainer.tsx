import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';

import  { AdminUsersTable, CreateUserModal } from '../../components/'

export const AdminUsersContainer: React.FC = () => {

  const [showCreateUser, setShowCreateUser] = useState<boolean>(false);

  useEffect(()=>{

  },[])


  return (
    <div> 
      <CreateUserModal isVisible={showCreateUser} close={()=>setShowCreateUser(false) }  />
      <Button onClick={()=>setShowCreateUser(true)} style={{margin:"10px", height:"50px", width:"50px"}} icon="pi pi-plus"  />
      <AdminUsersTable/>  
    </div>
);
};
