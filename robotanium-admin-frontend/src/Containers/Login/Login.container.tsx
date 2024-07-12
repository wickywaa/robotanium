import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginComponent } from "../../components";
import { useAppSelector } from "../../Store/hooks";
import { Navigate } from "react-router-dom";
import { userState } from "../../Store/Selectors/userSelectors";

export const LoginContainer: React.FC = () => {
  const user = useAppSelector(userState);
  const navigate = useNavigate();

  const auth =  () => {
    const auth = false


    return false
  };

  const loginPage = () => {
    return (
      <div className="flex flex-column align-items-center justify-content-center w-screen h-screen">
        <LoginComponent />
      </div>
    );
  };

  return !auth() ? loginPage() : <Navigate to="/admin" />;
};
