import React, { useState } from "react";
import { CreateGameForm, BotSelection, TimeSelectionPopup, NewGamePreview } from "../../components/CreateGameForm";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { setCreateGame } from "../../Store/Reducers";
import { createGameState } from "../../Store/Selectors";
import { saveDuration } from "../../Models";

export const CreateGameContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const gamestate = useAppSelector(createGameState);
  const [showTimes, setShowTimes] = useState<boolean>(false);

  const handleShowTimes = () => setShowTimes(true);

  const closeTimes = () => setShowTimes(false);
  const handleSave = (gameSettings: saveDuration) => {
    dispatch(
      setCreateGame({
        ...gamestate,
        duration: gameSettings.duration,
        startTime: gameSettings.startDate.getTime(),
        endTime: gameSettings.gameEndDate.getTime(),
      })
    );
  };

  return (
    <div className="flex flex-column align-content-center w-screen min-h-full border-4-red surface-card md:flex-row lg:flex-row lg:h-full">
      <CreateGameForm showTimeAvailability={() => handleShowTimes()} />
      <BotSelection />
      <NewGamePreview />
      <TimeSelectionPopup
        startDate={new Date(gamestate.gameStartDate)}
        visible={showTimes}
        saveDuration={handleSave}
        closeDialog={() => closeTimes()}
      />
    </div>
  );
};
