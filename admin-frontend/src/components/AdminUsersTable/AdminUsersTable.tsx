import React,{ useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { selectUserManagement } from '../../store/selectors';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { addUsersAttempt, deleteUserAttempt } from '../../store';
import { ILoggedInUser } from '../../models';
import { FilterMatchMode } from 'primereact/api';
import { TriStateCheckbox, TriStateCheckboxChangeEvent } from 'primereact/tristatecheckbox';

interface IAdmiUsertable {
  onDeleteClick: ()=> void;
}

export const AdminUsersTable: React.FC = () => {

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUserManagement).users
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    _id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    isRobotaniumAdmin: { value: null, matchMode: FilterMatchMode.EQUALS },
    userName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    isEmailVerified: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    isActive: { value: null, matchMode: FilterMatchMode.EQUALS }
  })

  useEffect(()=>{
    dispatch(addUsersAttempt())
  },[])

  const actionsComponent = (data: ILoggedInUser): JSX.Element => {
    return(<div>
      <Button onClick={()=> dispatch(deleteUserAttempt({id:data._id, userName:data.userName}))} style={{color:'red', borderColor: 'red', margin:'5px'}} icon="pi pi-trash"></Button>
      <Button onClick={()=> dispatch(deleteUserAttempt({id:data._id, userName:data.userName}))} style={{margin:'5px'}} icon="pi pi-user-edit"></Button>
    </div>)
  }
  const isRobotaniumAdminFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return <TriStateCheckbox value={options.value} onChange={(e: TriStateCheckboxChangeEvent) => options.filterApplyCallback(e.value)} />;
};
  const isRobotaniumAdminTemplate = (rowData: ILoggedInUser) => {
    return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.isRobotaniumAdmin, 'false-icon pi-times-circle': !rowData.isRobotaniumAdmin })}></i>;
};

  return (
    <div>
      <DataTable 
      filters={filters} filterDisplay="row" value={users?? []} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} >
        <Column field="_id" filter header="Id" ></Column>
        <Column field="email" filter filterPlaceholder="Search by Email" header="Email"></Column>
        <Column field="userName" filter header="UserName" ></Column>
        <Column field="isEmailVerified" filter header="Verified" ></Column>
        <Column field="isActive" header="Active" filter ></Column>
        <Column body={isRobotaniumAdminTemplate} filterElement={isRobotaniumAdminFilterTemplate} field="isRobotaniumAdmin" dataType="boolean" filter header="Robotanium Admin"></Column>
        <Column body={actionsComponent} header="Actions" ></Column>
      </DataTable>
    </div>
  )
}