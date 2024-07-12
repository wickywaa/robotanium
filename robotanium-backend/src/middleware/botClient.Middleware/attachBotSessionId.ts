import { NextFunction, Request, Response } from "express";
import { getBotCredentials } from "../../interfaces";
import { getBotById } from "../../firebase/firebase";

export const attachBotSessionId = async (req: getBotCredentials, res: Response, next: NextFunction) => {
  try {
    const { password, botId } = req.body;
    const bot = await getBotById(botId);
    if (!bot.sessionId.length) throw new Error();
    req.sessionId = bot.sessionId;
  } catch (e) {
    return res.status(500).json("could not attach id token");
  }

  next();
};
