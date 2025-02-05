import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, { useEffect, useState } from 'react';
import { emptyGame, IBot, IGame, ILoggedInUser } from '../../models';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { AutoComplete } from 'primereact/autocomplete';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';


interface ICreateGameModal {
  close: () => void;
  onSave: (game:IGame) => void;
  availableUsers: ILoggedInUser[];
  availableBots: IBot[];
}

export const CreateGameModal: React.FC<ICreateGameModal> = ({ close, onSave }) => {

  const [createGame, setCreateGame] = useState<IGame>({...emptyGame});
  const [selectedCommsOptions, setSelectedCommsOptions] =  useState<string[] | null>(null);
  const numbers = [
    { name: 'Text Chat', code: 'chatEnabled' },
    { name: 'Voice Chat', code: 'voiceChatEnabled' },
    { name: 'Cameras enabled', code: 'camerasEnabled' }
];
const [value, setValue] = useState<number | null | undefined >(0);


const handleNumberOBotsChange = (value: number = 0) => {
  console.log('typeof',typeof value)
  console.log('value',value)

  if(value < 0 ) return setValue(0);
  if(value > 50) return;
  console.log('value2',value)
  setValue(value)
}


  const handleChange = (key: keyof IGame, value: any) => {

    console.log('key',key)
    console.log('value', value)

    const newState = {
      ...createGame,
      [key]:value
    }

   

    console.log('newstate',newState)
    setCreateGame(newState)

  }

  const handleSelectedoptions = (options: keyof IGame[]) => {

    console.log(' options',options)
  }

  useEffect(()=>{
      console.log('game',createGame)
  },[createGame])

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
      <div style={{margin:'auto', flexDirection:'column', justifyContent:'center', alignItems:'center', display:'flex'}}>
      <InputText placeholder='name' value={createGame.name} />
      <SelectButton value={createGame.gameType}  onChange={(e) => handleChange('gameType',e.value)} options={[{label:'private', value:'private'}, {label:'public', value:' public'}]} />
      <SelectButton value={createGame.reason}  onChange={(e) => handleChange('reason',e.value)} options={[{label:'game', value:'game'}, {label:'practise', value:'practise'}, {label:'test', value: 'test'}]} />
      <div className="card flex justify-content-center">
        <div style={{ display:'flex', justifyContent: '' }}>
          <Button label={createGame.chatEnabled ? 'Text Chat Enabled' : 'Text Chat disabled'} style={{backgroundColor: createGame.chatEnabled ? 'black': 'red'}} onClick={ (e)=> handleChange('chatEnabled', !createGame.chatEnabled)} />
          <Button label={createGame.chatEnabled ? 'Voice Chat Enabled' : 'Voice Chat disabled'} style={{backgroundColor: createGame.voiceChatEnabled ? 'black': 'red'}} onClick={ (e)=> handleChange('voiceChatEnabled', !createGame.voiceChatEnabled)} />
          <Button label={createGame.chatEnabled ? 'Video Chat Enabled' : 'Video Chat disabled'} style={{backgroundColor: createGame.camerasEnabled ? 'black': 'red'}} onClick={ (e)=> handleChange('camerasEnabled', !createGame.camerasEnabled)} />    
        </div>
      </div>
      <div style={{flexDirection:'column'}} className="card flex justify-content-center">
          <label>Number Of bots </label>
            <InputNumber min={1} max={50} value={0} onValueChange={(e: InputNumberValueChangeEvent) => handleNumberOBotsChange(e.value ?? 0)} showButtons buttonLayout="vertical" style={{ width: '4rem' }} 
              decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
        </div>

        <div style={{ display:'flex', flexDirection:'row', width:'100%', position:'relative', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{height:'100%'}} >
          <Card  >
            <InputText placeholder='availableUser' value='users available' />
          </Card>
          </div>

          <div style={{width:'100%'}} >
          <Card  >
            <InputText placeholder='availableBots' value='selected bots' />
          </Card>
          </div>
          
          <div style={{height:'100%'}} >
          <Card>
              <InputText placeholder='selectedBots' value= 'bots available' />
          </Card>
          </div>
          
          
          
        </div>
      {/*<input type='file' onChange={e=>{handleImage(e); validateBot()}}/>*/}
      {/*<InputText placeholder='Bot Name' value={botName} onChange={(e)=>setBotName(e.target.value)} />*/}
      {/*<InputText placeholder='Image Url' value={botImageUrl} onChange={(e)=>setBotImageUrl(e.target.value)}*/}
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
