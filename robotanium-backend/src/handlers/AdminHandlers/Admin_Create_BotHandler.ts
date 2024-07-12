import { Request, Response } from "express";
import { createTankBotRequest } from "../../interfaces";
import { fireStoreDB } from "../../firebase/firebase";
import { PasswordService } from "../../Services/password";

export const createBotHandler = async (req: createTankBotRequest, res: Response) => {
  const { botId, botName, mainPhotoUrl, otherPhotosUrls, password } = req.body;
  const passwordService = new PasswordService();
  const passwordsRef = fireStoreDB.collection("botPasswords");
  const botRef = fireStoreDB.collection("botz");
  const tankPassword = await passwordService.encryptPassword(password);
  return botRef
    .where("botId", "==", `${botId}`)
    .get()
    .then((item) => {
      if (!item.empty) {
        throw new Error("bot already exists");
      }
      botRef
        .add({
          botName,
          botId,
          status: false,
          mainPhotoUrl,
          otherPhotosUrls,
          sessionId: req.sessionId,
        })
        .then(() =>
          passwordsRef.add({
            botId,
            password: tankPassword,
          })
        )
        .then(() => res.status(200).json("bot saved"));
    })
    .catch((e: Error) => {
      return res.status(400).json({
        error: e.message,
      });
    });
};
