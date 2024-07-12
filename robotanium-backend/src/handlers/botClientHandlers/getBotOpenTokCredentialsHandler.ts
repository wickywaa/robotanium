import { Response } from "express";
import { getBotCredentials } from "../../interfaces";

export const getBotOpenTokCredentials = async (req: getBotCredentials, res: Response): Promise<void> => {
  res.status(200).json({ accessToken: req.accesstoken, sessionId: req.sessionId });
};
