import React from "react";
import { HomeContainer, LoginContainer, GamesContainer,CreateGameContainer, BotzContainer,CreateBotzContainer } from "../Containers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./";
import { NavBar,ToastComponent } from "../components";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../prime-react-theme/theme.css";
import { TankCockpitContainer } from "../Containers/TankCockpitContainer/TankCockpitContainer";

export const AppRouter: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <ToastComponent/>
        <Routes>
          <Route path="/" element={<PrivateRoute><HomeContainer /></PrivateRoute>}/>
          <Route path="/games" element={<PrivateRoute><GamesContainer/></PrivateRoute>}/>
          <Route path="/creategame" element={<PrivateRoute><CreateGameContainer/></PrivateRoute>}/>
          <Route path="/botz" element={<PrivateRoute><BotzContainer/></PrivateRoute>}/>
          <Route path="/createbotz" element={<PrivateRoute><CreateBotzContainer/></PrivateRoute>}/>
          <Route path="/tankcockpit/" element={<PrivateRoute><TankCockpitContainer/></PrivateRoute>}/>
          <Route path="/login" element={<LoginContainer />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
