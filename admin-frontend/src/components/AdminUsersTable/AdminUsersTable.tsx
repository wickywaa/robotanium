import React,{ useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { selectUserManagement } from '../../store/selectors';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { addUsersAttempt, deleteUserAttempt, setEditUser } from '../../store';
import { ILoggedInUser } from '../../models';
import { FilterMatchMode } from 'primereact/api';
import { TriStateCheckbox, TriStateCheckboxChangeEvent } from 'primereact/tristatecheckbox';

export const AdminUsersTable: React.FC = () => {

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUserManagement).users
  const userManagement = useAppSelector(selectUserManagement)
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    _id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    isRobotaniumAdmin: { value: null, matchMode: FilterMatchMode.EQUALS },
    userName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    isEmailVerified: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    isActive: { value: null, matchMode: FilterMatchMode.EQUALS },
    isPlayerAdmin: {value: null, matchMode: FilterMatchMode.EQUALS}
  })

  useEffect(()=>{
    dispatch(addUsersAttempt())
  },[])

  const accept = (data: ILoggedInUser) => dispatch(deleteUserAttempt({id:data._id, userName:data.userName}))


  const confirm1 = (data: ILoggedInUser) => {
    confirmDialog({
        message: 'Are you sure you want to delete this user?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        accept: ()=> accept(data),
    });
};

  const actionsComponent = (data: ILoggedInUser): JSX.Element => {
    return(<div>
      <Button onClick={()=> confirm1(data)} style={{color:'red', borderColor: 'red', margin:'5px'}} icon="pi pi-trash"></Button>
      <Button onClick={()=> dispatch(setEditUser(data))} style={{margin:'5px'}} icon="pi pi-user-edit"></Button>
    </div>)
  }
  const isRobotaniumAdminFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return <TriStateCheckbox value={options.value} onChange={(e: TriStateCheckboxChangeEvent) => options.filterApplyCallback(e.value)} />;
};
  const isRobotaniumAdminTemplate = (rowData: ILoggedInUser) => {
    return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.isRobotaniumAdmin, 'false-icon pi-times-circle': !rowData.isRobotaniumAdmin })}></i>;
};

const isPlayerAdminTemplate = (rowData: ILoggedInUser) => {
  return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.isPlayerAdmin, 'false-icon pi-times-circle': !rowData.isPlayerAdmin })}></i>;
};

const isPlayerFilterAdminTemplate = (options: ColumnFilterElementTemplateOptions) => {
  console.log(options)
  return <TriStateCheckbox value={options.value} onChange={(e: TriStateCheckboxChangeEvent) => options.filterApplyCallback(e.value)} />;
};

  return (
    <div>
      <ConfirmDialog/>
      <DataTable 
        filters={filters} filterDisplay="row" value={users?? []} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} >
        <Column field="_id" filter filterPlaceholder="Search by id" header="Id" ></Column>
        <Column field="email" filter filterPlaceholder="Search by email" header="Email"></Column>
        <Column field="userName" filter filterPlaceholder="Search by userName" header="UserName" ></Column>
        <Column field="isEmailVerified" filterPlaceholder="Search by verified" filter header="Verified" ></Column>
        <Column field="isActive" header="Active" filter filterPlaceholder="Search by is active" ></Column>
        <Column body={isRobotaniumAdminTemplate} filterElement={isRobotaniumAdminFilterTemplate} field="isRobotaniumAdmin" dataType="boolean" filter header="Robotanium Admin"></Column>
        <Column body={isPlayerAdminTemplate} filterElement={isPlayerFilterAdminTemplate} field="isPlayerAdmin" dataType="boolean" filter header="Player Admin"></Column>
        <Column body={actionsComponent} header="Actions" ></Column>
      </DataTable>
    </div>
  )
}