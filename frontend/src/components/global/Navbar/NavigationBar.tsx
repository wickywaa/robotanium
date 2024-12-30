import React from "react";
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { Button } from 'primereact/button';
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import robotaniumLogo from "../../../assets/images/icononly_transparent_nobuffer.png";
import { selectUser } from "../../../store/selectors";
import { logoutAttempt } from "../../../store/slices";

interface IMenuItemWithBadge extends MenuItem {
  label: string;
  badge?: string | number;
  shortcut?: string;
}

export const NavigationBar: React.FC = () => {

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const start = () => <img className="h-20" src={robotaniumLogo} />;
  const end = () => {
    return <Button onClick={(() => dispatch(logoutAttempt()))} style={{ color: '#4ddfc0', }} title="Logout">logout</Button>
  };
  const items: IMenuItemWithBadge[] = [
    {
      label: "Home",
      icon: "pi pi-home",
    },
    {
      label: "Features test",
      icon: "pi pi-star",
    },
    {
      label: "Projects",
      icon: "pi pi-search",
    },
  ] as IMenuItemWithBadge[];

  return (
    <div style={{ position: 'relative' }} className="border border-secondary bg-primaary  opacity-30" >
      <Menubar className="bg-primary color-primary" model={items} start={start} end={user?._id ? end : null} />
    </div>
  );
};
