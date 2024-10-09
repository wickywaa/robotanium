import React, { useEffect, useState } from 'react';
import { IEditUser, ILoggedInUser } from '../../models';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './UserEditModal.scss'
import { setEditUser, updateUserAttempt } from '../../store';
import { InputText } from 'primereact/inputtext';
import { UpateUserForm } from '../UpdateUserForm/UpdateUserForm';
        

interface EditUserModal {
  user: ILoggedInUser;
}


export const EditUserModal:React.FC<EditUserModal> = ({user}) => {

  const [tempUser, setTempUser] =  useState<IEditUser | null>(null)
  const dispatch = useAppDispatch();

  useEffect(()=>{
    setTempUser({...user,password:''})
  },[])

  const handleOnSave = (user: ILoggedInUser) => {

    console.log('should save')
    dispatch(updateUserAttempt(user));
  } 

  const footer  = () => {
    return (
      <div className='user-edit-modal-footer'>
         <Button label="Close" icon="pi pi-check" />
         <Button onClick={()=> dispatch(setEditUser(null))} label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
      </div>
    )
  }

  return tempUser !== null ? (
    <div className='user-edit-modal-container'>
      <Card className='user-edit-modal-card'  footer={footer}>
        <UpateUserForm onSave={(user)=> handleOnSave(user)} user={tempUser} isCurrentUser={false}/>
      </Card>
    </div>
  ): null
}