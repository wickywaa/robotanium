import React from 'react';
import { DataTable  } from 'primereact/datatable';
import { IBot } from '../../models';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';


interface BotsExpansion {
  data: IBot
}

export const BotsExpansionTemplate:React.FC<BotsExpansion> = ({data}) => {

  const editSessionId = () => {
    <div>
      <InputText/>
    </div>
  }

  const cameraList = ():React.ReactElement => {
    return data.cameras.length ? ( <div> 
      <DataTable value={data.cameras}>
        <Column field='name' header='camera name'/>
        <Column field='_id' header='id'/>
        <Column field='sessionId' header='Sesion Id'/>
      </DataTable>
    </div>) : (<div>no camera selected for this bot yet</div>)
  }

  const footer = ():React.ReactElement => {
   return( <>
      <Button label='delete'/>
      <Button label='connect'/>
      <Button label='save changes'/>
    </>
   )
  }

  return(
    <Card footer={footer} >
      {cameraList()}
    </Card>
  )
}