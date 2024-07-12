import { Response } from "express";
import { IconnectBot } from "../../interfaces";

export const handleConnectToBot = async (req: IconnectBot, res: Response): Promise<void> => {
  res.status(200).json({ accessToken: req.accesstoken, sessionId: req.body.sessionId });
};
