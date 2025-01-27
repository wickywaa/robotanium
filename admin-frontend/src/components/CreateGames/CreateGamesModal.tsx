import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import React from 'react';

interface ICreateGameModal {
  close: () =>void;
}

export const CreateGameModal:React.FC<ICreateGameModal> = ({close}) => {

  return (
    <Card style={{overflow:'auto', position:'absolute', width:'100%', height:'80%', boxSizing:'border-box', zIndex:'20000'}} className="create-bot-from-container" 
          pt={{
            body:()=>({
              style:{'height':'100%'}
            }),
            content: ()=>({
              style:{'height':'100%'}
            }),
          }}>
            <div className="close-button-container">
              <Button onClick={() => close()} style={{ margin: 0 }} icon="pi pi-times" />
            </div>

            <div className='card-body-form-wrapper' style={{display:'flex', height:'100%'}}/>
            {/*<input type='file' onChange={e=>{handleImage(e); validateBot()}}/>*/}
            {/*<InputText placeholder='Bot Name' value={botName} onChange={(e)=>setBotName(e.target.value)} />*/}
            {/*<InputText placeholder='Image Url' value={botImageUrl} onChange={(e)=>setBotImageUrl(e.target.value)}*/ }
            
            <div style={{display:'flex', height:'70%', overflow:'auto'}} >
            <div style={{display:'flex', flexDirection:'column'}}>
            
          
        
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>    
            </div>
            

            </div>
            </div>
          </Card>
  )
}