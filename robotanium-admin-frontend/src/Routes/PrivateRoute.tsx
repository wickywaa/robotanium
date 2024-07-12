import React from "react";
import { Navigate } from "react-router-dom";

import { Auth } from "../firebase/AdminFirebase";

export const PrivateRoute: React.FC<any> = ({ children }) => {
  const user = Auth.currentUser;

  return user ? children : <Navigate replace to="/login" />;
};
