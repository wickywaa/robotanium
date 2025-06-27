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

export const BotContainer: React.FC = () => {

  const dispatch = useAppDispatch();
  const bots = useAppSelector(selectBots)
  const botsLoading = useAppSelector(selectBotsLoading)
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [filter, setFilter] = useState<'all' | 'online'>('all');


  const handleCreateBot = (bot: ICreateBotDTo) => {
    dispatch(createBotAttempt(bot));
    setShowCreateDialog(false);
  };

  const handleConnectBot = (bot: IBot) => {
    console.log('Connecting to bot:', bot);
  };

  const handleDeleteBot = (botId: string) => {
    dispatch(deleteBotByIdAttempt(botId))
  };

  const renderBotCard = (bot: IBot) => {
    const header = (
      <div className="bot-card-header">
        <img src={bot.imageUrl} alt={bot.name} />
      </div>
    );

    const footer = (
      <div className="bot-card-footer">
        <Button
          icon="pi pi-play"
          className="p-button-success mr-2"
          onClick={() => handleConnectBot(bot)}
          tooltip="Connect"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => handleDeleteBot(bot.id)}
          tooltip="Delete"
        />
      </div>
    );

    return (
      <Card
        key={bot.id}
        title={bot.name}
        header={header}
        footer={footer}
        className="bot-card"
      >
        <div className="cockpits-list">
          {bot.cockpits.map(cockpit => (
            <span key={cockpit.id} className="cockpit-tag">
              {cockpit.name}
            </span>
          ))}
        </div>
      </Card>
    );
  };

  return (
    <div className="bot-container">
      <div className="bot-header">
        <h1>Bot Management</h1>
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
        {bots.map(bot => renderBotCard(bot))}
      </div>

      <Dialog visible={showCreateDialog} onHide={() => setShowCreateDialog(false)} style={{ width: '100%', height: '100%' }}>
        <CreateBotComponent onCreateBot={handleCreateBot} />
      </Dialog>
      {
        botsLoading ? <LoadingSpinner overLay={true} /> : null
      }

    </div>
  );
};