import { NextFunction, Response } from "express";
import { CreateGameRequest } from "../../interfaces";
import { fireStoreDB } from "../../firebase/firebase";

export const createGameHandler = (req: CreateGameRequest, res: Response) => {
  const gameRef = fireStoreDB.collection(`games/`);

  return res.status(200).send("");
};
