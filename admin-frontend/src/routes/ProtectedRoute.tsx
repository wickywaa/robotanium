import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectUser } from '../store/selectors';

import { setBotsListAttempt, getGamesAttempt, addUsersAttempt } from '../store/slices';
//import { Auth } from "../firebase/AdminFirebase";

export const PrivateRoute: React.FC<any> = ({ children }) => {

  const dispatch = useAppDispatch();

  const Auth = {
    currentUser: useAppSelector(selectUser)
  }

  const user = Auth.currentUser;

  useEffect(()=>{
    if(user){
      dispatch(setBotsListAttempt())
      dispatch(getGamesAttempt())
      dispatch(addUsersAttempt())
    }
  },[])

  return user ? <Outlet /> : <Navigate replace to="/admin/login" />;
};
