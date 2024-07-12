import React, { useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useAppSelector, useAppDispatch } from "../../../Store/hooks";
import { setCreateGame, changeNumOfPlayers, setErrors } from "../../../Store/Reducers";
import { createGameState } from "../../../Store/Selectors/gameSelectors";
import { mapArray, gameTypeArray, numberOfplayersArray, IGame, gameFields } from "../../../Models";

export interface createGameform {
  showTimeAvailability: () => void;
}

export const CreateGameForm: React.FC<createGameform> = ({ showTimeAvailability }) => {
  const dispatch = useAppDispatch();
  const newGameState = useAppSelector(createGameState);
  const { numberOfPlayers, map, gameType, startTime, duration, credits, endTime, gameStartDate, gameEndDate, playersArray } =
    newGameState;

  const validateFields = () => {
    let tempErrors: gameFields[] = [];
    const players = playersArray
      .map((player) => {
        if (player.botId.length > 1 && player.botName.length > 1) {
          return player;
        }
        return;
      })
      .filter(Boolean);
    if (numberOfPlayers < 1) tempErrors = tempErrors.concat("NumberOfPlayers");
    if (map.length < 1) tempErrors = tempErrors.concat("Map");
    if (gameType.length < 1) tempErrors = tempErrors.concat("GameType");
    if (gameEndDate < 1) tempErrors = tempErrors.concat("StartDate");
    if (gameStartDate < 1) tempErrors = tempErrors.concat("EndDate");
    if (duration < 1) tempErrors = tempErrors.concat("Duration");
    if (credits < 1) tempErrors = tempErrors.concat("Credits");
    if (players.length < numberOfPlayers) tempErrors = tempErrors.concat("playersArray");

    dispatch(setErrors(tempErrors));
  };

  useEffect(() => {
    validateFields();
  }, [numberOfPlayers, map, gameType, startTime, duration, credits, endTime, gameStartDate, gameEndDate, playersArray]);

  const setNewStringValue = (key: keyof IGame, value: string) => {
    dispatch(
      setCreateGame({
        ...newGameState,
        [key]: value,
      })
    );
  };

  const setNewNumberValue = (key: keyof IGame, value: number) => {
    dispatch(
      setCreateGame({
        ...newGameState,
        [key]: value,
      })
    );
  };

  const setDate = (date: string) => {
    const newUTCDate = new Date(date);
    newUTCDate.setUTCDate(newUTCDate.getDate());
    newUTCDate.setUTCHours(0);
    newUTCDate.setUTCMinutes(0);
    newUTCDate.setFullYear(newUTCDate.getFullYear());

    dispatch(
      setCreateGame({
        ...newGameState,
        gameStartDate: new Date(newUTCDate).getTime(),
        gameEndDate: new Date(newUTCDate).getTime(),
      })
    );
  };

  return (
    <div className="flex flex-column p-2 h-full md:max-w-max border-1">
      <span className="p-float-label mt-4">
        <Dropdown
          value={newGameState.map}
          onChange={(e) => setNewStringValue("map", e.value)}
          options={mapArray}
          placeholder="Select a Map"
          className="w-full md:w-14rem"
          id="game-map"
        />
        <label htmlFor="game-map">Map</label>
      </span>
      <span className="p-float-label mt-4">
        <Dropdown
          value={newGameState.numberOfPlayers.toString()}
          onChange={(e) => dispatch(changeNumOfPlayers(parseInt(e.value)))}
          options={numberOfplayersArray}
          className="w-full md:w-14rem"
          id="number-of-players"
          defaultValue={1}
        />
        <label htmlFor="number-of-players">Number Of Players</label>
      </span>

      <span className="p-float-label mt-4">
        <Dropdown
          value={newGameState.gameType}
          onChange={(e) => setNewStringValue("gameType", e.value)}
          options={gameTypeArray}
          className="w-full md:w-14rem"
          id="game-type"
        />
        <label htmlFor="game-type">Game Type</label>
      </span>

      <span className="p-float-label mt-4">
        <Calendar
          dateFormat="dd/mm/y"
          showIcon
          inputId="game-date-calendar"
          value={new Date(newGameState.gameStartDate)}
          onChange={(e) => setDate(e.value?.toString() ?? "")}
          className="w-14rem"
        />
        <label htmlFor="game-date-calendar">Start TIme and Date</label>
      </span>
      <span className="p-float-label mt-4 ">
        <InputNumber
          readOnly
          size={17}
          value={newGameState.duration}
          onValueChange={(e) => setNewNumberValue("credits", e.value ?? 0)}
          id="game-duration"
          max={100}
          min={0}
          step={5}
        />
        <Button icon="pi pi-calendar-times" onClick={() => showTimeAvailability()}></Button>

        <label htmlFor="game-duration">Duration</label>
      </span>

      <span className="p-float-label mt-4 ">
        <InputNumber
          size={17}
          value={newGameState.credits}
          onValueChange={(e) => setNewNumberValue("credits", e.value ?? 0)}
          showButtons
          id="game-credits"
          max={100}
          min={0}
          step={5}
        />
        <label htmlFor="game-credits">Credits</label>
      </span>
    </div>
  );
};
