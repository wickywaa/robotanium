import React from 'react';

import {useAppDispatch, useAppSelector} from '../store/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeContainer,  LoginContainer, BotsContainer, AdminUsersContainer, UsersContainer, GamesContainer } from '../containers';
import { NavBar, ToastMessages } from '../../src/components/global';
import {PrivateRoute } from './ProtectedRoute';
import { EditUserModal } from '../components';
import { selectUserManagement } from '../store/selectors';


export const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const userManagement  = useAppSelector(selectUserManagement);
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <ToastMessages/>
    {userManagement.editUser !== null && <EditUserModal editUser={userManagement.editUser}/>}
    <Routes>
          <Route path="/admin" element={<PrivateRoute><HomeContainer /></PrivateRoute>}/>
          <Route path="/admin/bots" element={<PrivateRoute><BotsContainer /></PrivateRoute>}/>
          <Route path="/admin/games" element={<PrivateRoute><GamesContainer /></PrivateRoute>}/>
          <Route path="/admin/adminusers" element={<PrivateRoute><AdminUsersContainer /></PrivateRoute>}/>
          <Route path="/admin/login" element={<LoginContainer />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}