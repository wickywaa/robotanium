import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';
import { IBot, ICreateBotDTo } from '../models/Bots/bots';
import './BotContainer.scss';

import { LoadingSpinner } from '../components';
import { CreateBotComponent } from '../components/CreatebotComponent/CreateBotComponent';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectBots, selectBotsLoading } from '../store/selectors';
import { createBotAttempt, deleteBotByIdAttempt } from '../store/slices/botSlice';
import { BotCard } from '../components/BotCard/BotCard';
import { ConfirmDialog } from '../components/ConfirmDialog/ConfirmDialog';

export const BotContainer: React.FC = () => {

  const dispatch = useAppDispatch();
  const bots = useAppSelector(selectBots)
  const botsLoading = useAppSelector(selectBotsLoading)
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [filter, setFilter] = useState<'all' | 'online'>('all');
  const [showConfirm, setShowConfirm] = useState<{open:boolean, botId:string}>({
    open: false,
    botId: ''
  });


  const handleCreateBot = (bot: ICreateBotDTo) => {
    dispatch(createBotAttempt(bot));
    setShowCreateDialog(false);
  };

  const handleConnectBot = (bot: IBot) => {
    console.log('Connecting to bot:', bot);
  };

  const handleDeleteBot = (botId:string) => {
    dispatch(deleteBotByIdAttempt(botId));
    setShowConfirm({
      open:false,
      botId:'',
    })
  } 



  return (
    <div className="bot-container">
      <div className="bot-header">
        <div style={{ height: "6rem", width: "50%", display: "flex", justifyContent: "end" }} className="bot-controls">
          <Dropdown
            value={filter}
            options={[
              { label: 'All Bots', value: 'all' },
              { label: 'Online Bots', value: 'online' }
            ]}
            onChange={(e) => setFilter(e.value)}
            className="mr-3"
          />

          <Button
            label="Create New Bot"
            icon="pi pi-plus"
            onClick={() => setShowCreateDialog(true)}
          />
        </div>
      </div>

      <div className="bot-grid">
        {bots.map((bot)=>{
          console.log('bot',bot)
          return <BotCard bot={bot} onConnect={handleConnectBot} onDelete={()=>setShowConfirm({botId:bot.id.toString(),open:true})} />
        })}
        </div>

      <Dialog visible={showCreateDialog} onHide={() => setShowCreateDialog(false)} style={{ width: '100%', height: '100%' }}>
        <CreateBotComponent onCreateBot={handleCreateBot} />
      </Dialog>
      {
        botsLoading ? <LoadingSpinner overLay={true} /> : null
      }
      {
        showConfirm.open === true && showConfirm?.botId?.length ? <ConfirmDialog onHide={()=> setShowConfirm({open:false,botId:''})} Message='Are you sure you want to delete this bot' onConfirm={()=>handleDeleteBot(showConfirm.botId)} />:null
      }

    </div>
  );
};