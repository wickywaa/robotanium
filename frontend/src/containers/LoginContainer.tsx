import React from "react";
import { LoginForm } from '../components';

export  const LoginContainer: React.FC = () => {
 
  return (
    <div className="maincontainer margin-5  h-2/5 flex justify-center items-center flex-1 bg-primary border border-secondary">
      <div className="w-screen w-2/4 h-full bg-center bg-no-repeat flex justify-center items-center">
        <LoginForm/>
      </div>
    </div>
  )
};