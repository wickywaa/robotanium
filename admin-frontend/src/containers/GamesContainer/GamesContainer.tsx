import React from "react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setShowCreateGameModal } from '../../store/slices';
import { Button } from 'primereact/button';
import { selectCreateGame } from "../../store/selectors";
import { CreateGameModal }  from '../../components/CreateGames';
import { IGame } from "../../models";


export const GamesContainer: React.FC = () => {

  const dispatch = useAppDispatch();
  const selectShowCreateGame = useAppSelector(selectCreateGame);
  const createGame = useAppSelector(selectCreateGame).game
  console.log('select', selectShowCreateGame)


  const handleChange = (game: IGame) => {
    console.log('gmae changed', game)
  }

  return (
  <div style={{height:'89%', width:'100%'}}>
    <Button label="Create Game" onClick={()=>dispatch(setShowCreateGameModal(!selectShowCreateGame))} />
    { selectShowCreateGame && <CreateGameModal game={createGame} onChange={(game:IGame) => handleChange(game)} close={()=>dispatch(setShowCreateGameModal(false))}/>}
    hello here is the Games container
   </div>)
};


