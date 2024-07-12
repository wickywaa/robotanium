import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectUser } from "../store/selectors";
import { confirmEmailAttempt, requestLogin } from "../store/slices";
import { ConfirmEmailModal } from "./Auth";

export const LoginForm = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const footer = (
    <>
      <div className="w-full flex flex-column justify-center items-center">
        <Button className="bg-secondary text-white w-32 h-8 " label="login" title="login" />
      </div>
      <div className="mt-2 w-full  flex flex-row justify-center items-center">
        <a style={{color:'#4ddfc0'}} href="/register">Register account</a>
      </div>
    </>
  );

  const handleConfirmEmail = (code:string) => {
    return dispatch(confirmEmailAttempt({
      email,
      registrationToken:code,
  }))
  } 

  const handleLogin = () => {
    dispatch(requestLogin({email, password}))
  }

  const onFormEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event)
    if(event.code === 'Enter' && email.length >1 && password.length > 1){
      console.log('should sign ing ')
      return handleLogin()
    }
  }

  useEffect(()=>{
    if(user?.isEmailVerified) {
      setEmail(""),
      setPassword("")
      navigate("/")
    }
  },[user])
  

 {return !user?  (
    <Card
      footer={footer}
      className="loginform  m-auto m-2 p-2 min-h-72 relative flex-column justify-center items-center border border-secondary md:w-4/5 lg:w-2/4 p-8 xl:w-1/5"
    >
      <InputText
        placeholder="user name / email"
        className="w-full  border border-secondary mb-5"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyUp={onFormEnter}
      />

      <InputText
        placeholder="password"
        className="w-full  border border-secondary mb-5"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyUp={onFormEnter}
      />
    </Card>
  ): !user.isEmailVerified?  <ConfirmEmailModal email={email} onEnter={handleConfirmEmail}/> : null};
};
