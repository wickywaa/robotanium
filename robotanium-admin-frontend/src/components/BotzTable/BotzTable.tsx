import React from "react";
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { Column } from "primereact/column";
import { BotzListener } from "../../firebase/AdminFirebaseListeners/botzListeners";
import { useAppSelector } from "../../Store/hooks";
import { botzList } from "../../Store/Selectors";
import { ITankBot } from "../../Models/Bots";
import "./BotzTable.scss";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
const botsListener = new BotzListener();

export const BotzTable = () => {
  const botz = useAppSelector(botzList);
  const navigate = useNavigate();

  const imageBody = (bot: ITankBot) => {
    return <img style={{ maxHeight: "200px", padding: "0px", maxWidth:"300px" }} src={bot.mainPhotoUrl} alt="tankbot"></img>;
  };

  const getStatus = (bot: ITankBot) => {
    return (
      <div style={{ maxWidth: "40%" }} className="flex flex-column">
        <Tag
          className="mb-1"
          severity={bot.status === true ? "success" : "danger"}
          value={bot.status === true ? "online" : "offline"}
        ></Tag>
      </div>
    );
  };

  const buttonGroup = (bot: ITankBot) => {
    //disabled={!bot.status.driver || !bot.status.turret}
    return (
      <span className="p-buttonset">
        <Button label="Edit" icon="pi pi-check" />
        <Button label="Delete" icon="pi pi-trash" />
        <Button
          onClick={() => navigate(`/tankcockpit/?botId=${bot.botId}&sessionId=${bot.sessionId}`)}
          label="Connect"
          icon="pi pi-video"
        />
      </span>
    );
  };

  return (
    <>
      
        {botz.map((bot, key) => {
          return (
            <div className="bot-grid-body-container">
              <Card title="Id">{bot.botId}</Card>
              <Card title="Name">{bot.botName}</Card>
              <Card title="Player">{bot.players}</Card>
              <Card title="Session">{bot.sessionId}</Card>
              <Card>{imageBody(bot)}</Card>
              <Card title="Status">{getStatus(bot)}</Card>
              <Card title="Action">{buttonGroup(bot)} </Card>
            </div>
          );
        })}
    </>
  );
};
