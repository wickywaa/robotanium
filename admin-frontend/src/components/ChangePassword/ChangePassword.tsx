import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';

export interface IChangePassword {
  onChange: (event:{password:string, newPassword: string})=> void
;}

export const ChangePassword: React.FC<any> = ({onChange}) => {

  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  
  const handleOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
  }

  return (
    <div>
      <InputText onChange={(e)=> setPassword(e.target.value)} placeholder='enter old password' value={password}/>
      <InputText onKeyUp={handleOnEnter} onChange={(e)=> setNewPassword(e.target.value)} placeholder='enter new password' value={newPassword}/>
    </div>
  )
}
