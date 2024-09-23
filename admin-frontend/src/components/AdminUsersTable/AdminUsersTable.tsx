import React,{ useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUserManagement } from '../../store/selectors';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { addAdminUsersAttempt, deleteAdminUserAttempt } from '../../store';
import { ILoggedInUser } from '../../models';

interface IAdmiUsertable {
  onDeleteClick: ()=> void;
}

export const AdminUsersTable: React.FC = () => {

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUserManagement).adminUsers

  useEffect(()=>{
    dispatch(addAdminUsersAttempt())
  },[])

  const actionsComponent = (data: ILoggedInUser): JSX.Element => {
    return(<div>
      <Button onClick={()=> dispatch(deleteAdminUserAttempt({id:data._id, userName:data.userName}))} style={{color:'red', borderColor: 'red'}} icon="pi pi-trash"></Button>
    </div>)
  }

  return (
    <div>
      <DataTable value={users?? []} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="_id" header="Id" style={{ width: '25%' }}></Column>
        <Column field="email" header="Email" style={{ width: '25%' }}></Column>
        <Column field="userName" header="UserName" style={{ width: '25%' }}></Column>
        <Column field="isEmailVerified" header="Verified" style={{ width: '25%' }}></Column>
        <Column field="isActive" header="Active" style={{ width: '25%' }}></Column>
        <Column body={actionsComponent} header="Actions" style={{ width: '25%' }}>
        </Column>
      </DataTable>
    </div>
  )
}