import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCreateBot, selectShowCreateBot, selectBots } from '../../store/selectors'
import { createBotAttempt, deleteBotAttempt, setBotsListAttempt, setShowCreateBot  } from "../../store";
import { BotsTable, CreateBotModule } from "../../components";
import { ICreateBotDTo } from "../../models";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";

export const BotsContainer: React.FC = () => {

  const dispatch = useAppDispatch();
  const createBot = useAppSelector(selectCreateBot);
  const showCreateBot = useAppSelector(selectShowCreateBot);
  const bots = useAppSelector(selectBots);
  const [showDeleteBotModal, setShowDeleteBotModal] = useState<string>('');

  const handleBot = (bot: ICreateBotDTo) => dispatch(createBotAttempt(bot))

  const handleDeleteBot = (id:string)=>{
    dispatch(deleteBotAttempt(id))
    setShowDeleteBotModal('')
  } 

  useEffect(()=>{
    dispatch(setBotsListAttempt())
  },[])

  const deleteModalFooter = ():React.ReactNode => {
    return(
      <div>
        <Button label='confirm' onClick={()=> handleDeleteBot(showDeleteBotModal)} />
        <Button label='cancel'  onClick={()=> setShowDeleteBotModal('')}/>
      </div>
    )
  }

  const deleteBotModal = () => {
    return showDeleteBotModal.length ? (
      <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)'}}>
        <Card footer={deleteModalFooter}>

          <p>Press Confirm to delete bot {`${showDeleteBotModal}`}</p>
        </Card>
      </div>
    ) : <></>
  }

  return <div style={{height:'89%', overflow:'auto'}}>
    <Button label='createBot' onClick={()=> dispatch(setShowCreateBot(true))}/>
      { showCreateBot && <CreateBotModule createBot={handleBot} close={()=> dispatch(setShowCreateBot(false))}/>}
      <BotsTable bots={bots} botsOnline={[]} onDeleteBot={(id)=>setShowDeleteBotModal(id)} />
        {showDeleteBotModal.length ? deleteBotModal(): null}
    </div>;
};
