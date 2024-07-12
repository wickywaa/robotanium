import express from "express";
import { validateBotLogin, attachBotSessionId } from "../middleware/botClient.Middleware";
import { attachAdminTankBotSessionToken } from "../middleware/Admin.Middleware.ts";
import { getBotOpenTokCredentials } from "../handlers/botClientHandlers/getBotOpenTokCredentialsHandler";

export const botClientRouter = express.Router();

botClientRouter.post(
  "/api/botclient/credentials",
  validateBotLogin,
  attachBotSessionId,
  attachAdminTankBotSessionToken,
  getBotOpenTokCredentials
);
