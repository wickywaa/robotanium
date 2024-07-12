import React from "react";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Store/hooks";
import "./Navbar.component.scss";
import { signOutUser } from "../../Store/Reducers";
import { Auth } from "../../firebase/AdminFirebase";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    dispatch(signOutUser());
    Auth.signOut().then(() => {
      navigate("/login", { replace: false });
    });
  };

  const dispatch = useAppDispatch();
  const location = useLocation().pathname;
  const end = <Button label="Logout" onClick={handleSignout} />;
  const items = [
    {
      label: "home",
      icon: "pi pi-home",
    },
    {
      label: "Users",
      icon: " pi pi-users",

      items: [
        {
          label: "Admin Users",
          icon: " pi pi-user-edit",
        },
        {
          label: "Users",
          icon: " pi pi-user",
        },
      ],
    },
    {
      label: "Games",
      icon: " pi pi-video",
      items: [
        {
          label: "Games",
          icon: "pi pi-user",
          command: () => navigate("/games"),
        },
        {
          label: "Create Game",
          icon: "pi pi-user",
          command: () => navigate("/createGame"),
        },
      ],
    },
    {
      label: "Botz",
      icon: " pi pi-user",
      items: [
        {
          label: "Botz",
          icon: "pi pi-user",
          command: () => navigate("/botz"),
        },
        {
          label: "Create Botz",
          icon: "pi pi-user",
          command: () => navigate("/createbotz"),
        },
      ],
    },
    {
      label: "Analytics",
      icon: "pi pi-user",
    },
  ];

  return location !== "/login" ? <Menubar model={items} start={"logo"} end={end} className="navbar" /> : null;
};
