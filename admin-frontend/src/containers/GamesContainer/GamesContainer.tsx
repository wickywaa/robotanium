import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createGameAttempt, setBotsListAttempt, setShowCreateGameModal, updateCreateGame,  } from '../../store/slices';
import { Button } from 'primereact/button';
import { selectallUsers, selectBots, selectCreateGame, selectShowCreateGameModal, selectUserManagement } from "../../store/selectors";
import { CreateGameModal }  from '../../components/CreateGames';
import { IConnectedBot, IGame } from "../../models";

export const GamesContainer: React.FC = () => {

  const dispatch = useAppDispatch();
  const selectShowCreateGame = useAppSelector(selectShowCreateGameModal);
  const bots = useAppSelector(selectBots);
  const users = useAppSelector(selectallUsers);
  const createGame = useAppSelector(selectCreateGame).game

  useEffect(()=>{
    if(!bots.length ){
      dispatch(setBotsListAttempt())
    }
  },[bots])


  const handleChange = (game: IGame) => dispatch(updateCreateGame(game))

  const handleSave = (game: IGame) => dispatch(createGameAttempt(game))


  return (
  <div style={{height:'89%', width:'100%'}}>
    <Button label="Create Game" onClick={()=>dispatch(setShowCreateGameModal(!selectShowCreateGame))} />
    { selectShowCreateGame && <CreateGameModal availableBots={bots}  availableUsers={users} onSave={(game:IGame) => handleSave(game)} close={()=>dispatch(setShowCreateGameModal(false))}/>}
   </div>)
};


