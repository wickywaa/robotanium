import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { getGames, setFromDate, setToDate } from "../../Store/Reducers";
import { Calendar } from "primereact/calendar";
import { firebaseuserService } from "../../services";
import { gameStateSelector } from "./../../Store/Selectors";
import { GamesTable, EditGameDialog } from "../../components";
import { IDataBaseGame } from "../../Models";
import { listenForGames } from "../../firebase/AdminFirebaseListeners/gamesListeners";
import { gameslistener } from "../..";

export const GamesContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector(gameStateSelector);
  const [showGame, setshowGame] = useState<{ showEditPage: boolean; game: IDataBaseGame | null }>({
    showEditPage: false,
    game: null,
  });

  const getmonths = () => firebaseuserService.getGames("2022", "2045", "January", "February");

  useEffect(() => {
    dispatch(getGames({ fromDate: new Date(gameState.fromDate), toDate: new Date(gameState.toDate)  }));
  }, []);

  useEffect(()=>{
    return gameslistener.unsubscribe();
},[])

useEffect(()=>{
    gameslistener.resetlistener()
},[gameState.creatGame.gameStartDate])

  const showEditPage = (game: IDataBaseGame) => {
    setshowGame({ showEditPage: true, game });
  };
  const setfromDatefilter = (date: string | undefined) => {
    const newUTCDate = new Date(date ?? "");
    newUTCDate.setUTCDate(newUTCDate.getDate());
    newUTCDate.setUTCHours(0);
    newUTCDate.setUTCMinutes(0);
    newUTCDate.setFullYear(newUTCDate.getFullYear());

    dispatch(setFromDate({ fromDate: newUTCDate }));
  };
  const setToDateFilter = (date: string | undefined) => {
    const newUTCDate = new Date(date ?? "");
    newUTCDate.setUTCDate(newUTCDate.getDate());
    newUTCDate.setUTCHours(0);
    newUTCDate.setUTCMinutes(0);
    newUTCDate.setFullYear(newUTCDate.getFullYear());
    dispatch(setToDate({ toDate: newUTCDate }));
  };

  return (
    <Card className="h-full">
      <Calendar value={new Date(gameState.fromDate)} onChange={(e) => setfromDatefilter(e.value?.toString())} />
      <Calendar value={new Date(gameState.toDate)} onChange={(e) => setToDateFilter(e.value?.toString())} />
      <GamesTable games={gameState.games} showEditPage={showEditPage} />
      {showGame.showEditPage && showGame.game !== null && (
        <EditGameDialog
          game={showGame.game}
          visible={showGame.showEditPage}
          onHide={() => setshowGame({ showEditPage: false, game: null })}
        />
      )}
    </Card>
  );
};
