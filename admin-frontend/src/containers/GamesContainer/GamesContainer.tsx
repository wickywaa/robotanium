import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createGameAttempt, deleteGameAttempt, getGamesAttempt, setBotsListAttempt, setShowCreateGameModal, updateCreateGame,  } from '../../store/slices';
import { Button } from 'primereact/button';
import { selectallUsers, selectBots, selectCreateGame, selectGames, selectShowCreateGameModal, selectUserManagement } from "../../store/selectors";
import { CreateGameModal }  from '../../components/CreateGames';
import { IConnectedBot, IGame } from "../../models";
import { GamesTable } from "../../components/GamesTable/GamesTable";

export const GamesContainer: React.FC = () => {

  const dispatch = useAppDispatch();
  const selectShowCreateGame = useAppSelector(selectShowCreateGameModal);
  const bots = useAppSelector(selectBots);
  const users = useAppSelector(selectallUsers);
  const games = useAppSelector(selectGames);
  const createGame = useAppSelector(selectCreateGame).game;

  useEffect(() => {
    if(!bots.length) {
      dispatch(setBotsListAttempt());
    }
  }, [bots]);

  const handleChange = (game: IGame) => dispatch(updateCreateGame(game));
  const handleSave = (game: IGame) => dispatch(createGameAttempt(game));
  
  const handleGameSelect = (game: IGame) => {
    // Handle view game details
    console.log('View game:', game);
  };

  const handleGameEdit = (game: IGame) => {
    dispatch(updateCreateGame(game));
    dispatch(setShowCreateGameModal(true));
  };

  const handleGameDelete = async (gameId: string) => dispatch(deleteGameAttempt(gameId))
    
 

  useEffect(()=>{
    dispatch(getGamesAttempt())
  },[])

  return (
    <div style={{height:'89%', width:'100%', padding: '1rem', position: 'relative'}}>
      
      <div style={{marginBottom: '1rem'}}>
        <Button 
          label="Create Game" 
          onClick={() => dispatch(setShowCreateGameModal(!selectShowCreateGame))}
          icon="pi pi-plus"
        />
      </div>
      
      <GamesTable 
        games={games} 
        onGameSelect={handleGameSelect}
        onGameEdit={handleGameEdit}
        onGameDelete={handleGameDelete}
      />

      {selectShowCreateGame && (
        <CreateGameModal 
          availableBots={bots}  
          availableUsers={users} 
          onSave={handleSave} 
          close={() => dispatch(setShowCreateGameModal(false))}
        />
      )}
    </div>
  );
};


