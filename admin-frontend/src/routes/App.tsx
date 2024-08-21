import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeContainer,  LoginContainer } from '../containers';
import { NavBar } from '../../src/components/global/Navbar/Navbar';

export const AppRouter: React.FC = () => {
  console.log('hello')
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
          <Route path="/admin" element={<HomeContainer />}/>
          <Route path="/admin/login" element={<LoginContainer />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}