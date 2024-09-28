import React,{ useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUserManagement } from '../../store/selectors';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { addUsersAttempt, deleteUserAttempt } from '../../store';
import { ILoggedInUser } from '../../models';

interface IAdmiUsertable {
  onDeleteClick: ()=> void;
}

export const AdminUsersTable: React.FC = () => {

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUserManagement).users

  useEffect(()=>{
    dispatch(addUsersAttempt())
  },[])

  const actionsComponent = (data: ILoggedInUser): JSX.Element => {
    return(<div>
      <Button onClick={()=> dispatch(deleteUserAttempt({id:data._id, userName:data.userName}))} style={{color:'red', borderColor: 'red'}} icon="pi pi-trash"></Button>
    </div>)
  }

  return (
    <div>
      <DataTable value={users?? []} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="_id" header="Id" ></Column>
        <Column field="email" header="Email"></Column>
        <Column field="userName" header="UserName" ></Column>
        <Column field="isEmailVerified" header="Verified" ></Column>
        <Column field="isActive" header="Active" ></Column>
        <Column field="isRobotaniumAdmin" header="Robotanium Admin"></Column>
        <Column body={actionsComponent} header="Actions" ></Column>
      </DataTable>
    </div>
  )
}