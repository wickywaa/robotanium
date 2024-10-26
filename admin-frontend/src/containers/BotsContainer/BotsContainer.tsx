import { Button } from "primereact/button";
import React from "react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCreateBot, selectShowCreateBot } from '../../store/selectors'
import { createBotAttempt, setShowCreateBot } from "../../store";
import { CreateBotModule } from "../../components";
import { ICreateBotDTo } from "../../models";

export const BotsContainer: React.FC = () => {

  const dispatch = useAppDispatch();
  const createBot = useAppSelector(selectCreateBot);
  const showCreateBot = useAppSelector(selectShowCreateBot);

  const handleBot = (bot: ICreateBotDTo) => {
    dispatch(createBotAttempt(bot))
  }

  return <div>
    <Button label='createBot' onClick={()=> dispatch(setShowCreateBot(true))}/>
      { showCreateBot && <CreateBotModule createBot={handleBot} close={()=> dispatch(setShowCreateBot(false))}/>}
    </div>;
};
