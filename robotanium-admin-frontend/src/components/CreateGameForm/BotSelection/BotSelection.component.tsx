import React from "react";
import { Card } from "primereact/card";

import { useAppSelector, useAppDispatch } from "../../../Store/hooks";
import { createGameState } from "../../../Store/Selectors/";
import { assignBotToPlayer } from "../../../Store/Reducers";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Player, testBotArray } from "../../../Models";
import { fullBot } from "../../../Models/Bots";

export const BotSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const gamestate = useAppSelector(createGameState);

  const handleDropDownChange = (e: DropdownChangeEvent, player: Player) => {
    const botName = testBotArray.find((bot) => bot.id === e.value)?.name ?? "";
    dispatch(assignBotToPlayer({ botId: e.value, botName, player }));
  };

  const filteredOptions = (key: number): fullBot[] => {
    const botsIds = gamestate.playersArray.map((player) => {
      return player.botId;
    });

    return testBotArray.filter((bot) => !botsIds.includes(bot.id) || bot.id === gamestate.playersArray[key].botId);
  };

  return (
    <div className=" flex flex-column align-items-center border-1 w-full p-2 lg:w-30rem overflow-x-hidden ">
      {gamestate.playersArray.map((player, key) => {
        return (
          <Card key={key} className="w-full surface-ground m-2">
            <label htmlFor="player-list-dropdown">{player.playerId}</label>
            <span className="p-float-label mt-1">
              <Dropdown
                value={gamestate.playersArray[key].botId}
                onChange={(e) => handleDropDownChange(e, player)}
                placeholder="Assign Bot"
                id="player-list-dropdown"
                options={filteredOptions(key)}
                optionLabel="name"
                optionValue="id"
                name={gamestate.playersArray[key].botName}
              />
            </span>
          </Card>
        );
      })}
    </div>
  );
};
