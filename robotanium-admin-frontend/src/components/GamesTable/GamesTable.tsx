import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IDataBaseGame } from "../../Models";
import { Button } from "primereact/button";

export interface IGamesTable {
  games: IDataBaseGame[];
  showEditPage: (game: IDataBaseGame) => void;
}

export const GamesTable: React.FC<IGamesTable> = ({ games, showEditPage }) => {

  const dateFormatStartDate = (game: IDataBaseGame) => {
    const date = new Date(game.gameStartDate);
    return `${date.toDateString().substring(0, 10)}`;
  };
  const dateFormatEndDate = (game: IDataBaseGame) => {
    const date = new Date(game.gameStartDate);
    return `${date.toDateString().substring(0, 10)}`;
  };
  const startTimeFormat = (game: IDataBaseGame) => {
    return `${new Date(game.startTime).toTimeString()}`;
  };
  const EditButton = (game: IDataBaseGame) => {
    return <Button onClick={() => showEditPage(game)}>Edit</Button>;
  };

  return (
    <div className="card">
      <DataTable value={games} tableStyle={{ minWidth: "50rem" }}>
        <Column field="id" header="GameId"></Column>
        <Column field="gameType" header="Type"></Column>
        <Column field="map" header="map"></Column>
        <Column field="numberOfPlayers" header="No Of Players"></Column>
        <Column field="gameStartDate" header="Start Date" body={dateFormatStartDate}></Column>
        <Column field="gameEndDate" header=" End Date" body={dateFormatEndDate}></Column>
        <Column field="startTime" header="Start Time" body={startTimeFormat}></Column>
        <Column field="duration" header="Duration"></Column>
        <Column field="credits" header="Credits"></Column>
        <Column header="Edit" body={EditButton}>
          {" "}
        </Column>
      </DataTable>
    </div>
  );
};
