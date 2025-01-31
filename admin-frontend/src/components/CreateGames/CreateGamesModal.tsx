import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, { useState } from 'react';
import { emptyGame, IGame } from '../../models';
import { InputText } from 'primereact/inputtext';

interface ICreateGameModal {
  close: () => void;
  onChange: (game:IGame) => void;
  game: IGame
}

export const CreateGameModal: React.FC<ICreateGameModal> = ({ close, onChange, game }) => {

  const [create, setCreateGame] = useState<IGame>({...emptyGame});


  const handleChange = (key: keyof IGame, value: any) => {

    const newState = {
      ...game,
      key:value
    }
    onChange(newState)

  }

  return (
    <Card style={{ overflow: 'auto', position: 'absolute', width: '100%', height: '80%', boxSizing: 'border-box', zIndex: '20000' }} className="create-bot-from-container"
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
      <div className='card-body-form-wrapper' style={{ display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%' }} >
        <div>
      <InputText placeholder='name' value={game.name} />
        <div style={{width:'100%'}}>
        <Button 
          onClick={(e)=> handleChange('gameType', 'private')} 
          label='private'
          className='selecteButton' 
          style={{background: game.gameType === 'private' ? 'blue':'black', width:'48%',boxSizing:'border-box'}} 
      />
      <Button 
          onClick={(e)=> handleChange('gameType', 'public')} 
          label='public'
          className='selecteButton' 
          style={{background: game.gameType === 'public' ? 'blue':'black',width:'48%',justifyContent:'space-between', boxSizing:'border-box'}} 
      />
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
