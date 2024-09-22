import React, { useState } from "react";
import "./CreateUser.scss";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ILoggedInUser } from "../../../models";
import { Password } from "primereact/password";

interface props {
  isVisible: boolean;
  user: ILoggedInUser | null;
  userType : "player" | "admin";
  onCreateUser: (email:string, userName: string)=> void ;
  close: () => void;
}


export const CreateUserModal: React.FC<props> = ({ isVisible, close, userType, onCreateUser }) => {

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
     
  return isVisible ? (
    <Card className="create-user-from-container">
      <div className="close-button-container">
        <Button onClick={() => close()} style={{ margin: 0 }} icon="pi pi-times" />
      </div>
      <div className="create-user-form">
        <InputText onChange={(e)=>setEmail(e.target.value)} className="create-user-button" placeholder="email" />
        <InputText onChange={(e)=>setUserName(e.target.value)} className="create-user-button" placeholder="userName" />
      </div>
      <Button onClick={()=> onCreateUser(email,userName)} className="create-user-confirm-button" label="Invite User" />
    </Card>
  ) : null;
};
