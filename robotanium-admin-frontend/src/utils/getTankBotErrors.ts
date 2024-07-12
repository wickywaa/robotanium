import { ICreateTankBot } from "../Models/Bots";

export const createTankBotErrors = (tankBot: ICreateTankBot) => {
  let errors: string[] = [];

  if (!tankBot.botName.length) errors = errors.concat("botName");
  if (!tankBot.botId.length) errors = errors.concat("botId");
  if (tankBot.password.length < 1) errors = errors.concat("password");
  if (!tankBot.mainPhotoUrl.length) errors = errors.concat("mainPhotoUrl");

  return errors;
};
