import React from "react";
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { Button } from 'primereact/button';
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import robotaniumLogo from "../../../assets/images/icononly_transparent_nobuffer.png";
import { selectUser } from "../../../store/selectors";
import { logoutAttempt } from "../../../store/slices";
import { useNavigate } from 'react-router-dom'
import './Navbar.scss';

interface IMenuItemWithBadge extends MenuItem {
  label: string;
  badge?: string | number;
  shortcut?: string;
}

export const NavBar: React.FC = () => {

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const start = () => <img className="h-20" src={robotaniumLogo} />;
  const end = () => {
    return <Button onClick={(() => dispatch(logoutAttempt()))} style={{ color: '#00fefc' }} title="Logout">logout</Button>
  };
  const items: IMenuItemWithBadge[] = [
    {
      label: "Home",
      command: () => navigate('/admin')
    },
    {
      label: "Bots",
      command: () => navigate('/admin/bots')
    },
    {
      label: "Games",
      command: () => navigate('/admin/games')
    },
    {
      label: "Users",
      command: () => navigate('/admin/users')
    },
    {
      label: "Admin users",
      command: () => navigate('/admin/adminusers')
    },
  ] as IMenuItemWithBadge[];

  return user ? (
    <div style={{ position: 'relative' }} className="nav-bar" >
      <Menubar style={{ color: 'red' }} className="bg-primary" model={items} start={start} end={user?._id ? end : null} />
    </div>
  ) : null;
};
