import { NextFunction, Response } from "express";
import { AddUserRequest } from "../../interfaces/userInterfaces";

import { fireStoreDB } from "../../firebase/firebase";

export const addUserHandler = (
  req: AddUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { gameId, userId } = req.body;
  const gameRef = fireStoreDB.collection(`games/${gameId}`);
  res.send(200)

}