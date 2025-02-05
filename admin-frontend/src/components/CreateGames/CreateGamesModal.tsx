import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, { useEffect, useState } from 'react';
import { emptyGame, IBot, IConnectedBot, IGame, ILoggedInUser } from '../../models';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { BotForm } from './Createbotfrom';

interface ICreateGameModal {
  close: () => void;
  onSave: (game: IGame) => void;
  availableUsers: ILoggedInUser[];
  availableBots: IBot[];
}

export const CreateGameModal: React.FC<ICreateGameModal> = ({ close, onSave, availableBots }) => {



  const [createGame, setCreateGame] = useState<IGame>({ ...emptyGame });
  const numbers = [
    { name: 'Text Chat', code: 'chatEnabled' },
    { name: 'Voice Chat', code: 'voiceChatEnabled' },
    { name: 'Cameras enabled', code: 'camerasEnabled' }
  ];
  const [value, setValue] = useState<number | null | undefined>(0);


  const handleNumberOBotsChange = (value: number = 0) => {
    if (value < 0) return setValue(0);
    if (value > 50) return;
    setValue(value)
  }

  const onChange = () => {

  }



  const handleChange = (key: keyof IGame, value: any) => {

    const newState = {
      ...createGame,
      [key]: value
    }

    setCreateGame(newState)

  }

  const handleSelectedoptions = (options: keyof IGame[]) => {

    console.log(' options', options)
  }

  const handleDeleteBot = (id: string) => {
    console.log(id)

    const filteredBots =  createGame.bots.filter((bot) => bot._id !== id)

    console.log('filteredbots', filteredBots)

  }

  const handleAddBot = (bot: IBot) => {

    const connnectedBot:IConnectedBot = {
      _id: bot._id,
      name: bot.name,
      cockpits: bot.cameras.map((cam)=>{
        return {
          _id: cam._id,
          name: cam.name,
          player: {
            name:'',
            id:''
          },
          status: 'offline',
          sessionId:''
        }
      }),
      socketId: '',
    }

    console.log('bot',bot)
    console.log('newbots',createGame.bots.concat(connnectedBot))

     setCreateGame(
      {
        ...createGame,
        bots:createGame.bots.concat(connnectedBot)
      }

    ) 
  }


  return (
    <Card style={{ overflow: 'auto', position: 'absolute', width: '100%', height: '80%', boxSizing: 'border-box' }} className="create-bot-from-container"
      pt={{
        body: () => ({
          style: { 'height': '100%' }
        }),
        content: () => ({
          style: { 'height': '100%' }
        }),
      }}>
      <div className="close-button-container">
        <Button onClick={() => close()} style={{ margin: 0 }} icon="pi pi-times" />
      </div>
      <div style={{ margin: 'auto', flexDirection: 'column', justifyContent: 'start', alignItems: 'left', display: 'flex' }}>
        <InputText placeholder='name' value={createGame.name} style={{ width: '20%' }} />
        <div style={{ display: 'flex', justifyContent: '', flexDirection: 'column', width: '20%' }}>
          <Button label={createGame.chatEnabled ? 'Text Chat Enabled' : 'Text Chat disabled'} style={{ backgroundColor: createGame.chatEnabled ? 'black' : 'red' }} onClick={(e) => handleChange('chatEnabled', !createGame.chatEnabled)} />
          <Button label={createGame.chatEnabled ? 'Voice Chat Enabled' : 'Voice Chat disabled'} style={{ backgroundColor: createGame.voiceChatEnabled ? 'black' : 'red' }} onClick={(e) => handleChange('voiceChatEnabled', !createGame.voiceChatEnabled)} />
          <Button label={createGame.chatEnabled ? 'Video Chat Enabled' : 'Video Chat disabled'} style={{ backgroundColor: createGame.camerasEnabled ? 'black' : 'red' }} onClick={(e) => handleChange('camerasEnabled', !createGame.camerasEnabled)} />
        </div>
        <SelectButton value={createGame.reason} onChange={(e) => handleChange('reason', e.value)} options={[{ label: 'game', value: 'game' }, { label: 'practise', value: 'practise' }, { label: 'test', value: 'test' }]} />
        <SelectButton value={createGame.gameType} onChange={(e) => handleChange('gameType', e.value)} options={[{ label: 'private', value: 'private' }, { label: 'public', value: ' public' }]} />
        <div className="card flex justify-content-center">
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', position: 'relative', alignItems: 'left', justifyContent: 'space-between' }}>
          {createGame.bots.map((bot) => {
            return (
              <BotForm createGame={createGame} availableBots={availableBots} deleteBot={handleDeleteBot} bot={bot}   onChange={(e) => console.log('hello')} />
            )
          })
          }
          <BotForm createGame={createGame} availableBots={availableBots} onChange={(e) => handleAddBot(e)} deleteBot={()=>console.log('delete')} />
        </div>
      </div>
      <div style={{ display: 'flex', height: '70%', overflow: 'auto' }} >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          </div>
        </div>
      </div>
    </Card>
  )
}
