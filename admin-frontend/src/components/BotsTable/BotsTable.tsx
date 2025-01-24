import { Column } from 'primereact/column';
import { DataTable, DataTableExpandedRows } from 'primereact/datatable';
import React, { useState } from  'react';
import { IBot, IConnectedBot,   } from '../../models';
import { Button } from 'primereact/button';
import { BotsExpansionTemplate } from '../'

interface BotsTable {
  bots: IBot[]
  onlineBots : IConnectedBot[]
  onDeleteBot: (id:string)=>void;
}


export const BotsTable: React.FC<BotsTable> = ({bots, onDeleteBot, onlineBots}) => {

  const [expandedRows, setExpandedRows] = useState< any[] | DataTableExpandedRows>([])
  const [botsOnline, setBotsonline] = useState< string []>(['671d6a376573dc6f3a99c4d2','671d6af4bdf24cac121b383a'])
  const [renderDeleteModal, setRenderDeleteModal] = useState<boolean>(false);

  const getLengthOfCamera = (value:IBot) =>value.cameras.length
  
  const getStatus = (bot:IBot) => {

    if(onlineBots.find((onlineBot)=> onlineBot.id ===  bot._id)) return <p style={{background:'green', textAlign:'center'}}>online</p>

    console.log('onein bots', onlineBots)
    //if(onlineBots.find((bot)=>bot.id === bot.id)) return 'online';

    return <p style={{background:'red', textAlign:'center'}}>offline</p>
  }

  const completeBots:IBot[] =  bots.map((bot)=>{

    const onlineBot:IConnectedBot | undefined = onlineBots.find((onlineBot)=> onlineBot?.id === bot._id);

    return {
      _id: bot._id,
      name: bot.name,
      img: bot.img,
      imageUrl: bot.imageUrl,
      cameras: bot.cameras.map((cm)=>{
        return {
          _id:cm._id,
          name: cm.name,
          sessionId: onlineBot?.cockpits.find((cam)=> cam._id.toString() === cm._id.toString() )?.sessionId ?? '',
      
        }
      })

    }
  })

  const renderActionButtons = (bot: IBot):React.ReactElement => {
    return (
      <div>
        <Button  label='delete' onClick={()=>onDeleteBot(bot._id)} />
      </div>
    )
  }

  return (
    <div>
    <DataTable 
      rowExpansionTemplate={(value)=><BotsExpansionTemplate data={value} />}
      onRowToggle={(e)=>setExpandedRows(e.data)} 
      expandedRows={expandedRows} value={completeBots}
    >
      <Column expander={true} style={{ width: '5rem' }} />
      <Column field={'_id'} header='id'/>
      <Column field={'name'} header='name'/>
      <Column body={(value)=>getLengthOfCamera(value)} header='numberOfCameras'/>
      <Column header='Status' body={(e)=>getStatus(e)}></Column>
      <Column header='Actions' body={(e)=>renderActionButtons(e)} ></Column>
    
    </DataTable>
  </div>
  )
}