import { Button } from "primereact/button";
import React from "react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCreateBot, selectShowCreateBot } from '../../store/selectors'
import { setShowCreateBot } from "../../store";
import { CreateBotModule } from "../../components";
import { ICreateBotDTo } from "../../models";

export const BotsContainer: React.FC = () => {

  const dispatch = useAppDispatch();
  const createBot = useAppSelector(selectCreateBot);
  const showCreateBot = useAppSelector(selectShowCreateBot);

  const handleBot = (bot: ICreateBotDTo) => {
    console.log(bot)
  }

  return <div>
    <Button label='createBot' onClick={()=> dispatch(setShowCreateBot(true))}/>
      { showCreateBot && <CreateBotModule createBot={handleBot} close={()=> dispatch(setShowCreateBot(false))}/>}

    </div>;
};
