import React, { useState } from 'react'
import { IConnectedCockpit, ILoggedInUser } from '../../models'
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete'


interface ICockpitAutoComplete {
  cockpit: IConnectedCockpit
  availableUsers: ILoggedInUser[]
}

export const CockpitAutoComplete:React.FC<ICockpitAutoComplete> = ({cockpit, availableUsers}) => {

  const [newCockpit,setNEwCockpit] = useState<IConnectedCockpit>({
    _id:'',
    player: {
      id: null,
      name: null,
    },
    status: 'offline', 
    name:'',
    sessionId:''
  })

  const [selectedUser,setSelectedUser]  = useState<ILoggedInUser| null >(null)
  const [possibleUsers, setPossibleUsers] = useState<ILoggedInUser[]>(availableUsers);

  const handleChange = (e:{value:ILoggedInUser} ) => {
      console.log('changedvalue',e)
        setSelectedUser(e.value)
  
        
      }
  

   const handleUserSearch = (event:AutoCompleteCompleteEvent) => {

    console.log('query',event)
        const filteredUSers = availableUsers.filter((user) => {
          return user.userName.startsWith(event.query) || user.email.startsWith(event.query)
        }).map((user)=>{
          return {
            ...user,
            userName: `${user.userName} | ${user.email} | ${user._id} isRobotaniumAdmin: ${user.isRobotaniumAdmin}`
          }
        })

       setPossibleUsers(filteredUSers)
  
        return filteredUSers
      }
  return (
    <AutoComplete field='userName'  value={selectedUser} placeholder={cockpit.name} suggestions={possibleUsers} completeMethod={handleUserSearch} onChange={handleChange} dropdown />
  )

}