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
  
        <Route path="/admin" element={<PrivateRoute/>}>
          <Route path="/admin" element={<HomeContainer/>}/>
          <Route path="/admin/bots" element={<BotsContainer/>}/>
          <Route path="/admin/games" element={<GamesContainer/>}/>
          <Route path="/admin/adminusers" element={<AdminUsersContainer/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}