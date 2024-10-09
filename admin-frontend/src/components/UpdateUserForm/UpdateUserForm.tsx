import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { IEditUser, ILoggedInUser } from '../../models';

import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
        
interface IUpdateUserForm {
  user:  ILoggedInUser;
  isCurrentUser: boolean;
  onSave: (user: ILoggedInUser)=> void;
}

export const UpateUserForm:React.FC<IUpdateUserForm>  = ({user, isCurrentUser, onSave}) => {

  const [tempUser, setTempUser] = useState<ILoggedInUser| null >(null);

  useEffect(()=>{
    if(user) {
      setTempUser(user);
    }
  },[])

  const handleSave = () => {
    if(!tempUser) return;
    onSave(tempUser);
  }

  return tempUser !== null ? (
    <div>
      <div className="flex align-items-center ">
      <label htmlFor="userName" className="ml-2">User Name </label>
      <InputText className='ml-5' placeholder='userName' onChange={(event)=> setTempUser({...tempUser, userName: event.target.value})} value={tempUser?.userName}/>
      </div>

      <div className="flex align-items-center">
      <label htmlFor="isActive" className="ml-2">Is Active</label>
        <Checkbox className='ml-10'  inputId="isActive" name="pizza" value="isActive" onChange={(value)=>setTempUser({...tempUser, isActive: !tempUser.isActive}) } checked={tempUser.isActive} />
      </div>

      <div className="flex align-items-center">
      <label htmlFor="verified" className="ml-2">Is Verified</label>
        <Checkbox className='ml-7'  inputId="verified" name="verified" value="isVerified" onChange={(value)=>setTempUser({...tempUser, isEmailVerified: !tempUser.isEmailVerified}) } checked={tempUser.isEmailVerified} />
      </div>
      
      <div className="flex align-items-center">
      <label htmlFor="isRobotaniumAdmin" className="ml-2">Robotanium Admin</label>
        <Checkbox className='ml-5'  inputId="robotaniumAdmin"  onChange={(value)=>setTempUser({...tempUser, isRobotaniumAdmin: !tempUser.isRobotaniumAdmin}) } checked={tempUser.isRobotaniumAdmin} />
      </div>
      
      <div className="flex align-items-center">
      <label htmlFor="isPlayerAdmin" className="ml-2">Player Admin</label>
        <Checkbox className='ml-5'  inputId="playeradmin"  onChange={(value)=>setTempUser({...tempUser, isPlayerAdmin: !tempUser.isPlayerAdmin}) } checked={tempUser.isPlayerAdmin} />
      </div>

      <Button label='save' title='save' onClick={()=>handleSave()}/>
    </div>


  ) : null
}

/* _id: string,
  email: string,
  isRobotaniumAdmin: boolean,
  isPlayerAdmin: boolean,
  userName: string,
  imgsrc: string,
  isActive: boolean,
  isEmailVerified: boolean,
  changePassword: boolean,
  rememberme: false,
  theme: string, */