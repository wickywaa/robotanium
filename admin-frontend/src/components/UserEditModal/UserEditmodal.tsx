import React, { useState } from 'react';
import { ILoggedInUser } from '../../models';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './UserEditModal.scss'
import { setEditUser } from '../../store';
        

interface EditUserModal {
  user: ILoggedInUser;
}


export const EditUserModal:React.FC<EditUserModal> = ({user}) => {

  const [tempUser, setTempUser] =  useState<ILoggedInUser>(user)
  const dispatch = useAppDispatch();

  const footer  = () => {
    return (
      <div>
         <Button label="Save" icon="pi pi-check" />
         <Button onClick={()=> dispatch(setEditUser(null))} label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
      </div>
    )
  }

  return (
    <div className='user-edit-modal-container'>
      <Card  footer={footer}>

      </Card>
    </div>
  )
}