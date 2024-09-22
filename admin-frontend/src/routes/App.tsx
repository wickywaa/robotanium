import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeContainer,  LoginContainer, BotsContainer, AdminUsersContainer, UsersContainer, GamesContainer } from '../containers';
import { NavBar, ToastMessages } from '../../src/components/global';
import {PrivateRoute } from './ProtectedRoute';

export const AppRouter: React.FC = () => {
  console.log('hello')
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <ToastMessages/>
    <Routes>
          <Route path="/admin" element={<PrivateRoute><HomeContainer /></PrivateRoute>}/>
          <Route path="/admin/bots" element={<PrivateRoute><BotsContainer /></PrivateRoute>}/>
          <Route path="/admin/games" element={<PrivateRoute><GamesContainer /></PrivateRoute>}/>
          <Route path="/admin/users" element={<PrivateRoute><UsersContainer /></PrivateRoute>}/>
          <Route path="/admin/adminusers" element={<PrivateRoute><AdminUsersContainer /></PrivateRoute>}/>
          <Route path="/admin/login" element={<LoginContainer />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}