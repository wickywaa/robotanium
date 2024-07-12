import { NextFunction, Request, Response } from "express";
import { getBotCredentials } from "../../interfaces";
import { getBotPasswordById } from "../../firebase/firebase";
import { PasswordService } from "../../Services";

export const validateBotLogin = async (req: getBotCredentials, res: Response, next: NextFunction): Promise<Response> => {
  const message = "access denied";
  try {
    const passwordService = new PasswordService();
    const { password, botId } = req.body;

    if (typeof password !== "string" || typeof botId !== "string" || typeof parseInt(botId) !== "number") {
      throw new Error();
    }

    const botPassword = await getBotPasswordById(botId);
    const passwordsMatch = await passwordService.comparePasswords(password, botPassword);
    if (!passwordsMatch) {
      throw new Error();
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json(message);
  }

  next();
};
