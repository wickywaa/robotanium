import express, { Express, NextFunction, Request, Response } from "express";
import { createBotHandler } from "../../src/handlers/botHandlers";
export const botRouter = express.Router();
const cors = require("cors");
const { createSessionId, createAccessToken } = require("../Services/vonage.service");
const auth = (req: Request, res: Response, next: NextFunction) => {
  const passwordIsCorrect = () => {
    return true;
  };

  if (passwordIsCorrect()) {
    next();
  }
};
botRouter.post("/createtankbot", auth, createBotHandler);

botRouter.post("/createAccessToken", auth, (req: Request, res: Response) => {
  const { id, endTime, botId } = req.body;

  createAccessToken("subscriber", id, endTime, (token: string) => {
    res.send(token);
  });
});

botRouter.get("/createsession", auth, (req: Request, res: Response) => {
  const botId = req.body.botId;

  createSessionId((session: { sessionId: string }) => {
    res.send(session);
  });
});
