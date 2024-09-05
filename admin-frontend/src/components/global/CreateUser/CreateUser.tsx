import React from "react";
import './CreateUser.scss';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface props {
  isVisible: boolean;
  close: ()=>void;
}

export const CreateUserModal: React.FC<props> = ({ isVisible, close  }) => {


  return isVisible ? (
  <Card className="create-user-from-container">
    <div className="close-button-container">
      <Button onClick={()=> close()} style={{margin:0}} icon="pi pi-times"/>
    </div>
    <div className="create-user-form">
      <InputText className="create-user-button" placeholder="email"/>
      <InputText className="create-user-button" placeholder="userName"/>
    </div>
  <Button className="create-user-confirm-button" label="Invite User"/>
     
  </Card>)
   : null;
};
