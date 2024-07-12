import { InputText } from "primereact/inputtext";

import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { saveTankBot, setCreateTankBot, setErrorMessage } from "../../Store/Reducers";
import { selectCreateBot } from "../../Store/Selectors";
import React from "react";
import { Button } from "primereact/button";
import { Uploadimages } from "../";
import { createTankBotErrors } from "../../utils";

export const CreateBotzForm = () => {
  const dispatch = useAppDispatch();
  const handlePhotoSave = (url: string) => dispatch(setCreateTankBot({ ...createGameState, mainPhotoUrl: url }));

  const saveBot = () => {
    const errors = createTankBotErrors(createGameState);
    if (errors.length) {
      return dispatch(setErrorMessage(errors.join()));
    }
    dispatch(saveTankBot(createGameState));
  };

  const createGameState = useAppSelector(selectCreateBot);
  return (
    <div className="flex flex-row">
      <div className="surface-border border-1 max-w-max p-3">
        <span className="p-float-label mt-4 ">
          <InputText
            size={17}
            value={createGameState.botName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setCreateTankBot({ ...createGameState, botName: e.target.value }))
            }
            id="tank-bot-name"
            max={100}
            min={0}
            step={5}
          />
          <label htmlFor="tank-bot-name">Bot Name</label>
        </span>
        <span className="p-float-label mt-4 ">
          <InputText
            size={17}
            value={createGameState.botId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setCreateTankBot({ ...createGameState, botId: e.target.value }))
            }
            id="tank-bot-id"
            max={100}
            min={0}
            step={5}
          />
          <label htmlFor="tank-bot-name">Bot Id</label>
        </span>
        <span className="p-float-label mt-4 ">
          <InputText
            size={17}
            value={createGameState.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setCreateTankBot({ ...createGameState, password: e.target.value }))
            }
            id="driver-cockpit-id"
            max={100}
            min={0}
            step={5}
          />
          <label htmlFor="driver-cockpit-id">Password</label>
        </span>
      </div>
      <div className="flex flex-column">
        <Uploadimages buttonName="uplooad bot image" fileName={"botId" + createGameState.botId} OnUrlSave={handlePhotoSave} />
        <div>
          <Button onClick={saveBot} size="small">
            Create Bot
          </Button>
        </div>
      </div>
      <img height={300} src={createGameState.mainPhotoUrl} alt="uploaded bot preview" />
    </div>
  );
};
