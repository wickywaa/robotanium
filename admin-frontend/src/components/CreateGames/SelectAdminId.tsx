import React, { useEffect, useState } from 'react';
import { ILoggedInUser } from '../../models/User';
import { InputText } from 'primereact/inputtext';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { IConnectedCockpit } from '../../models';

interface IAvailableUser {
  id: string;
  name: string;
}

interface SelectAdminIdProps {
  availableUsers: {name:string, id:string}[];
  onChange: (adminId: string) => void;
}

export const SelectAdminId: React.FC<SelectAdminIdProps> = ({ availableUsers, onChange }) => {

  const [selectedUser, setSelectedUser] = useState<string>('');
  const [possibleUsers, setPossibleUsers] = useState<{name:string, id:string}[]>([]);

  const handleUserSearch = (event: AutoCompleteCompleteEvent) => {
    const filteredUsers = availableUsers.filter((user) => user.id.startsWith(event.query));
    setPossibleUsers(filteredUsers);
  }


  const handleChange = (e: { value: {name:string, id:string} }) => {
    setSelectedUser(`${e.value.name} (${e.value.id})`);
    onChange(e.value.id);
  }

  const gettNameAndId = (user: { id: string; name: string }):string => {
    return `${user.name} (${user.id})`
  }

  return availableUsers.length > 1 ? (
    <div>
      <AutoComplete field='id' value={selectedUser} placeholder={'select admin'} suggestions={possibleUsers} completeMethod={handleUserSearch} onChange={handleChange} dropdown />
    </div>
  ) : availableUsers.length === 1 ? (
    <div>
      <InputText value={gettNameAndId(availableUsers[0])} placeholder='Admin ID'  />
    </div>
  ) : (
    <div>
      <InputText placeholder='Admin ID'  />
    </div>
  );
};