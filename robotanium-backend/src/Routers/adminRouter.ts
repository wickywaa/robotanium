import express from "express";

import { handleConnectToBot, createBotHandler } from "../handlers/AdminHandlers";
import {
  validateAdminLoginDtoMiddleware,
  validateAdminConnectbot,
  attachAdminTankBotSessionId,
  attachAdminTankBotSessionToken,
  validateAdminUser,
} from "../middleware/Admin.Middleware.ts";

export const adminRouter = express.Router();

adminRouter.post("/api/admin", validateAdminLoginDtoMiddleware);
adminRouter.post(
  "/api/botconnect",
  validateAdminConnectbot,
  validateAdminUser,
  attachAdminTankBotSessionToken,
  handleConnectToBot
);
adminRouter.post("/api/createtankbot", validateAdminUser, attachAdminTankBotSessionId, createBotHandler);
