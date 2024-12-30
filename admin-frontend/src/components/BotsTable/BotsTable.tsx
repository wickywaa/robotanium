import { Column } from 'primereact/column';
import { DataTable, DataTableExpandedRows } from 'primereact/datatable';
import React, { useState } from  'react';
import { IBot } from '../../models';
import { Button } from 'primereact/button';
import { BotsExpansionTemplate } from '../'

interface BotsTable {
  bots: IBot[]
  botsOnline : string[]
  onDeleteBot: (id:string)=>void;
}


export const BotsTable: React.FC<BotsTable> = ({bots, onDeleteBot}) => {

  const [expandedRows, setExpandedRows] = useState< any[] | DataTableExpandedRows>([])
  const [botsOnline, setBotsonline] = useState< string []>(['671d6a376573dc6f3a99c4d2','671d6af4bdf24cac121b383a'])
  const [renderDeleteModal, setRenderDeleteModal] = useState<boolean>(false);

  const getLengthOfCamera = (value:IBot) =>value.cameras.length
  
  const getStatus = (value:any) => {
    if(botsOnline.includes(value._id)) {
      return 'online'
    }

    return 'offline'
  }


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
      rowExpansionTemplate={(value)=><BotsExpansionTemplate data={value}/>}
      onRowToggle={(e)=>setExpandedRows(e.data)} 
      expandedRows={expandedRows} value={bots}
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