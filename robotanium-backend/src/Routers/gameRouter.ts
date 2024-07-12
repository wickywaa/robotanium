import express, { NextFunction, Request, Response } from "express";
import { createGameHandler, addUserHandler,loadGamesHandler } from "../handlers";
export const gameRouter = express.Router();
const cors = require("cors");


const gameAuth = (req: Request, res: Response, next: NextFunction) => {
  const passwordIsCorrect = () => {
    return true;
  };

  if (passwordIsCorrect()) {
    next();
  }
};

gameRouter.post("/creategame", gameAuth, createGameHandler);
gameRouter.post("/gameadduser", gameAuth, addUserHandler);
gameRouter.get("/games", gameAuth, loadGamesHandler)

