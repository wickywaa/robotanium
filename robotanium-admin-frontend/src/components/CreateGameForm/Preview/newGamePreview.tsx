import React from "react";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { createGameState, isGameLoading, gameErrorsSelector } from "../../../Store/Selectors";
import { mapImagesArray } from "../../../Models";
import { Button } from "primereact/button";
import { saveNewGame } from "../../../Store/Reducers";

export const NewGamePreview: React.FC = () => {
  const dispatch = useAppDispatch();
  const newGame = useAppSelector(createGameState);
  const isLoading = useAppSelector(isGameLoading);
  const errors = useAppSelector(gameErrorsSelector);
  const mapImage = mapImagesArray.find((image) => image.mapName === newGame.map)?.mapUrl;

  const handleSave = () => {
    dispatch(saveNewGame(newGame));
  };

  return (
    <div className="flex flex-column p-2 h-full w-full border-1 align-items-center">
      <div className="">
        <img src={`${mapImage ?? ""}`} alt="mapimage"></img>
        <table>
          <tbody>
            <tr>
              <td>No Of Players:</td>
              <td>{`${newGame.numberOfPlayers}`}</td>
            </tr>
            <tr>
              <td>Game Type</td>
              <td> {`${newGame.gameType}`}</td>
            </tr>
            <tr>
              <td>Start Date</td>
              <td> {`${new Date(newGame.gameStartDate).toUTCString()}`}</td>
            </tr>
            <tr>
              <td>End Date</td>
              <td> {`${new Date(newGame.gameEndDate).toUTCString()}`}</td>
            </tr>
            <tr>
              <td>Start Time</td>
              <td> {`${new Date(newGame.startTime).getUTCHours()}:${new Date(newGame.startTime).getUTCMinutes()}`}</td>
            </tr>
            <tr>
              <td>End Time</td>
              <td> {`${new Date(newGame.endTime).getUTCHours()}:${new Date(newGame.endTime).getUTCMinutes()}`}</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td> {`${newGame.duration} Minutes`}</td>
            </tr>
            <tr>
              <td>Credits</td>
              <td>{`${newGame.credits}`}</td>
            </tr>
          </tbody>
        </table>
        <Button label="Save Game to Databsase" onClick={handleSave} loading={isLoading} disabled={errors.length > 0}></Button>
      </div>
    </div>
  );
};
