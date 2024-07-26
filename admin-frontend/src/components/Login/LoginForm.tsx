import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
const handleLogin = () => {
  console.log("logging in")
}
  
  const footer = (
    <>
      <div className="w-full flex flex-column justify-center items-center">
        <Button onClick={()=> handleLogin()} className="bg-secondary text-white w-32 h-8 " label="login" title="login" />
      </div>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <a style={{color:'#4ddfc0'}} href="/register">Register account</a>
        <a style={{color:'#4ddfc0'}} href="/forgotpassword">Forgot password?</a>
      </div>
    </>
  );


 return  (
    <Card
      footer={footer}
      className="loginform  m-auto m-2 p-2 min-h-72 relative flex-column justify-center items-center border border-secondary md:w-4/5 lg:w-2/4 p-8 xl:w-1/5"
    >
      <InputText
        style={{color:'#4ddfc0'}}  
        placeholder="email"
        className={`w-full  border border-secondary  mb-5`}
        value={email}
      
      />

      <InputText
        style={{color:'#4ddfc0'}}  
        placeholder="password"
        className={`w-full  border border-secondary mb-5`}
        value={password}
      />
    </Card>
  )

}