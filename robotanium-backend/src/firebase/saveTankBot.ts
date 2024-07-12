import { ICreateTankBot } from "../interfaces/botinterfaces";
import { fireStoreDB } from "./firebase";
import { PasswordService } from "../Services/password";

export const saveTankBot = async (bot: ICreateTankBot): Promise<boolean | void | Error> => {
  const passwordservice = new PasswordService();

  const { botId, botName, mainPhotoUrl, otherPhotosUrls, password } = bot;
  const passwordsRef = fireStoreDB.collection("botPasswords");
  const botRef = fireStoreDB.collection("botz");
  const tankPassword = await passwordservice.encryptPassword(password);

  return await botRef
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
          mainPhotoUrl,
          otherPhotosUrls,
          status: false,
        })
        .then(() =>
          passwordsRef.add({
            botId,
            password: tankPassword,
          })
        )
        .then(() => true);
    })
    .catch((e) => {
      return new Error("bot could not be saved");
    });
};
