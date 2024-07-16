import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { ILoggedInUser } from "../models";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectErrors } from "../store/selectors";
import { addError, confirmEmailAttempt, registerUserAttempt, removeErrorByType } from '../store/slices/authSlice';
import "./RegisterForm.scss";

export const RegisterForm:React.FC<{emailSent:boolean, isLoading:boolean, user:ILoggedInUser | null}> = ({isLoading,emailSent, user}) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [userName, setUserName ] = useState<string>("");
  const [ showPassword, setShowPassword ] = useState<boolean>(false);
  const [ showPassword2, setShowPassword2 ] = useState<boolean>(false);
  const [ confirmationCode, setConfirmationCode] = useState<string>("");
  const errors = useAppSelector(selectErrors);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkforErrors = (field:ErrorType):boolean => {

    if(field === 'email') {
      if(!validator.isEmail(email))  {
        dispatch(addError({type:'email',message:'Invaild Email Address'}))
        return true;
      }
      dispatch(removeErrorByType('email'));
    }
    
    if(field === 'password') {

      if(!validator.isStrongPassword(password)) {
        dispatch(addError({type:'password',message:'Password must have atleast 1 upper and 1 lower case, 1 special character and a minimum length of 8 characters'}))
        return true;
      }
      dispatch(removeErrorByType('password'));
    }

    if(field === 'password2') {
      if(password !== password2) {
        dispatch(addError({type:'password2',message:'passwords do not match'}))
        return true;
      }
      dispatch(removeErrorByType('password2'));
    }
    

    return false;
  }

  const isUserNameTaken = () => {
  }

  const handleKeyPress = (event:React.KeyboardEvent<HTMLInputElement>) => {

    if(event.code === 'Enter')
      dispatch(confirmEmailAttempt({
        email,
        registrationToken:confirmationCode,
        username:userName
    }))
  }
  const handleregister = ()=> {

    if( checkforErrors('email') || checkforErrors('password')) {
      return
    }

    return dispatch(registerUserAttempt({email, password, userName}))
   }

  useEffect(()=>{

    if(user) {
      setConfirmationCode("")
      setEmail(""),
      setPassword("")
      setPassword2("")
      setUserName("")
        navigate("/")
    }

  },[user])

  useEffect(()=>{
    return () => {
      setPassword('');
      setPassword2('');
      setUserName('');
      setShowPassword(false);
      setShowPassword2(false);
    }
  },[])

  const renderEmailSentMessage = (
    <div >
      a confirmation code has been sent to the email  {email} <br/>
      Enter The code to confirm your email address  {email} <br/>
      <InputText onKeyUp={handleKeyPress} value={confirmationCode} onChange={(event)=>setConfirmationCode(event.target.value)}/>
    </div>
  )

  const footer = (
    <>
      <div className="w-full flex flex-column cursor-pointer justify-center items-center">
        <Button 
          disabled={errors.find((error)=>error.type === 'email' || error.type === 'password' || error.type === 'userName' )? true: false }
          onClick={()=> handleregister() } 
          className="bg-secondary  text-white w-32 h-8" 
          label="Register" title="Register" 
        />
      </div>
      <div className="mt-2 w-full  flex flex-row justify-center items-center">
        <a style={{color:'#4ddfc0', textDecoration:'underline'}} href="/login"> login here</a>
      </div>
    </>
  );

  {return !emailSent? (
    <Card
      footer={footer}
      className={`loginform ${ isLoading? "login-loading":''} m-auto m-2 p-2 min-h-72 relative rounded-2xl flex-column justify-center items-center border border-secondary md:w-4/5 lg:w-2/4 p-8 xl:w-1/5`}
    >
      <InputText
        placeholder="email"
        style={{color:'#4ddfc0'}}
        className="w-full color-red-500  h-8 border border-secondary mb-5"
        value={email}
        onBlur={()=>checkforErrors('email')}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputText
        color="red"
        style={{color:'#4ddfc0'}}
        placeholder="username (optional)"
        className="w-full text-red-100 h-8 border border-secondary mb-5"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

    <div className="w-full relative h-8  mb-5" >
      <InputText
        style={{color:'#4ddfc0'}}
        type={showPassword ? 'text' : 'password'}
        placeholder="password"
        className="w-full h-8 border color-red-500 border-secondary mb-5"
        value={password}
        onBlur={()=>checkforErrors('password')}
        onChange={(e) => setPassword(e.target.value)}
      />
      <i style={{color: '#4ddfc0'}} onClick={()=>setShowPassword(!showPassword)} className={`absolute  right-2 top-2 ${!showPassword ? 'pi pi-eye' : 'pi pi-eye-slash'}`}></i>
    </div>

    <div className="w-full relative h-8 mb-5" >
      <InputText
        style={{color:'#4ddfc0'}}  
        type={showPassword2 ? 'text' : 'password'}
        placeholder="repeat password"
        className="w-full h-8 border placeholder text-red-100 color-secondary border-secondary mb-5"
        value={password2}
        onBlur={()=>checkforErrors('password2')}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <i style={{color: '#4ddfc0'}} onClick={()=>setShowPassword2(!showPassword2)} className={`absolute right-2 top-2 ${!showPassword2 ? 'pi pi-eye' : 'pi pi-eye-slash'}`}></i>
    </div>
    </Card>
  
  ): renderEmailSentMessage
}
}