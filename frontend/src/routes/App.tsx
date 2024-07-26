import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavigationBar } from '../components/global';
import { ToastComponent } from '../components/global/Toast.Component';
import { ConfirmEmailContainer, HomeContainer, LoginContainer, RegisterContainer } from '../containers';
import { ForgotPasswordContainer } from '../containers/ForgotPassword';
import { PrivateRoute } from './index';

export const AppRouter: React.FC = () => {
  return (
    <>
    <BrowserRouter>
    <NavigationBar/>
    <ToastComponent/>
    <Routes>
          <Route path="/" element={<PrivateRoute><HomeContainer /></PrivateRoute>}/>
          <Route path="/register" element={<RegisterContainer/>}/>
          <Route path="/login" element={<LoginContainer/>}/>
          <Route path="/confirmemail" element={<ConfirmEmailContainer/>}/>
          <Route path="/forgotpassword" element={<ForgotPasswordContainer/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}