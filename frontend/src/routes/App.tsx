import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavigationBar } from '../components/global';
import { ConfirmEmailContainer, HomeContainer, LoginContainer, RegisterContainer } from '../containers';
import { PrivateRoute } from './index';

export const AppRouter: React.FC = () => {
  return (
    <>
    <BrowserRouter>
    <NavigationBar/>
    <Routes>
          <Route path="/" element={<PrivateRoute><HomeContainer /></PrivateRoute>}/>
          <Route path="/register" element={<RegisterContainer/>}/>
          <Route path="/login" element={<LoginContainer/>}/>
          <Route path="/confirmemail" element={<ConfirmEmailContainer/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}