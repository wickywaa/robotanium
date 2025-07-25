import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ICreateBotDTo } from '../../models/Bots/bots';
import validate from 'validator';

import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { PasswordInput } from '../PasswordInput/PasswordInput';

interface ICreateBotModule {
  close:() => void;
  onSubmit: (bot: ICreateBotDTo) => void;
  mode: 'edit' | 'create'
}

export const CreateEditBotForm: React.FC<ICreateBotModule> = ({close, onSubmit, mode})=> {

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl,setImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [botName, setBotName] = useState<string>('');
  const [ botPassword, setBotPassword ] = useState<string>('');
  const [ botRepeatPassword, setbotRepeatPassword ] = useState<string>('');
  const [cockpits, setCockpits] = useState<{ name: string }[]>([]);
  const [botImageUrl, setBotImageUrl] = useState<string>('');

  const handleImage = (event:React.ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files?.length) return;
    setImageUrl(URL.createObjectURL(event.target.files[0]));
    setImageFile(event.target.files[0]);
  }

  const validateBot = () => {
    //if(imageFile !== null || imageUrl !== null) setErrorMessage('');
    if(botName.length >55 ) setErrorMessage('');
    if(validate.isStrongPassword(botPassword)) setErrorMessage('');
  }

  const handleCockpitChange = (key: number, name:string) =>{

  const newCockpits = cockpits.map((cockpit,index) => {
    if (index === key ) return {
      name,
    }
    
    return cockpit
  })

  setCockpits(newCockpits)
  }

  const handleCreateBot = () => {
    if(botName.length < 5) return setErrorMessage('Bot name should be atleast 5 digits');
    if(botPassword.length <5 ) return setErrorMessage('Bot Password mus be stronger');
    if(!validate.isStrongPassword(botPassword)) return setErrorMessage('Bot Password Be 8 digits long, contain 1 lowercase 1 uppercase and 1 special character');
    if(botPassword  !==  botRepeatPassword) return setErrorMessage('Passwords do not match')

    

    return onSubmit({
      name: botName,
      password: botPassword,
      botImageUrl,
      cockpits: cockpits.map((cockpit) => cockpit.name),
    })
  } 

  const createTempImageUrl = () => {
    const file = imageFile;
    const reader = new FileReader();
    reader.onloadend = () => {
      setBotImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    return reader.result as string;
  } 

  return(
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
        <div style={{padding:'10px', height:'100%', position:'relative'}}>
          <div className='card-body-form-wrapper' style={{display:'flex', height:'100%'}}>
            <div className='form-inputs-wrapper'>
              <input type='file' onChange={e=>{handleImage(e); validateBot()}}/>
              <InputText placeholder='Bot Name' value={botName} onChange={(e)=>setBotName(e.target.value)} />
              <PasswordInput onChange={setBotPassword} value={botPassword}  placeHolder='bot Password'/>
              <PasswordInput onChange={setbotRepeatPassword} value={botRepeatPassword}  placeHolder='repeat bot Password'/>
              
              <div style={{display:'flex', height:'70%', overflow:'auto'}} >
                <div style={{display:'flex', flexDirection:'column'}}>
                  {cockpits.map((_,key)=> {
                    return (<div key={key} style={{display:'flex', flexDirection:'column'}}><InputText onChange={(event)=>handleCockpitChange(key,event.target.value)}  placeholder={`cockpit ${key+1}`}/></div>)
                  })  }
                </div>
                <Button style={{maxHeight:'30px'}}  disabled={cockpits.length<2} onClick={()=> setCockpits(cockpits.slice(0,-1))} icon='pi pi-minus'/>
                <Button style={{maxHeight:'30px'}} onClick={()=> setCockpits([...cockpits,{name:''  }])} icon='pi pi-plus'/>

              </div>
              <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>    
                {errorMessage}  
              </div>
              <Button style={{position:'absolute', bottom:'30px'}} onClick={handleCreateBot} className="create-user-confirm-button" label="Create Bot" />
            </div>
            {imageUrl ? <img style={{width:'80%',height:'100%'}} src={imageUrl} alt='bot'/>: 
              <div style={{display:'flex',justifyContent:'center',alignItems:'center', border:'1px solid blue',width:'100%', height:'100%'}}>Image Preview</div>
            }
          </div>
        </div>
      </Card>
  )
}