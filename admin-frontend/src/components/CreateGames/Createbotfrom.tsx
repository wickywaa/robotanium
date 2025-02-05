import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, { useEffect, useState } from 'react';
import { IBot, IConnectedBot, IGame, ILoggedInUser } from '../../models';

interface IBotForm {
    bot?: IConnectedBot;
    onChange: (e: IBot) => void;
    deleteBot: (id:string) => void;
    availableBots: IBot[];
    availableUsers: ILoggedInUser[]
    createGame: IGame 
  }


 export const BotForm: React.FC<IBotForm> = ({ bot, onChange, deleteBot, availableBots, createGame, availableUsers }): React.ReactElement => {

    const [emptyBot, setBot] = useState<IBot[]>([]);
    const [possibleBots, setPossibleBots] = useState<IBot[]>([]);
    const [possibleUsers, setPossibleUser] = useState<ILoggedInUser[]> ([])
    const [value, setValue] = useState<string>('');

    const [selectedUser, setSelectedUser] =  useState<ILoggedInUser | null>(null)

    useEffect(() => {
      setPossibleBots(availableBots)
      console.log('possible bots', possibleBots)
    }, [availableBots])

    const search = (event: AutoCompleteCompleteEvent) => {
      const filteredbots = availableBots.filter((bot) => {
        return bot.name.startsWith(event.query) || bot._id.toString().startsWith(event.query)
      })
      const allBots = [...filteredbots].filter((bot) => {
        return !createGame.bots.map((bot) => bot._id).includes(bot._id)
      })
      .map((bot) => {
        return {
          _id: bot._id,
          name: `${bot.name} (${bot._id})`,
          img: bot.img,
          imageUrl: bot.imageUrl,
          cameras: bot.cameras
        }
      })
      setPossibleBots(allBots)
    }

    const handleChange = (e:{value:IBot} ) => {

      const bot =  e.value 
      const selectedBot =  availableBots.find((bot)=>bot._id === e.value._id) ?? null
      console.log('selected bot', selectedBot)

      onChange(e.value)
    }


    const handleUserSearch = (event:AutoCompleteCompleteEvent) => {
      console.log('search user ',event)
    }


    return bot ? (
      <Card style={{position:'relative', display:'flex', flexDirection:'column'}}>
        <Button onClick={() => deleteBot(bot._id)} style={{ margin: 0, position:'absolute', right:'10px', top:'5px' }} icon="pi pi-times" />
          <AutoComplete field="name" value={bot} suggestions={possibleBots} completeMethod={search} onChange={handleChange} dropdown />
          {bot.cockpits.map((cockpit)=>{
            return (
              <AutoComplete field="name" value={cockpit.} suggestions={possibleUsers} completeMethod={handleUserSearch} onChange={handleChange} dropdown />
            )
          })}
      </Card>
    ) : (
      <Card>
        <div className="card flex justify-content-center">
          <AutoComplete field="name" value={value} suggestions={possibleBots} completeMethod={search} onChange={handleChange} dropdown />
        </div>
      </Card>
    )

  }