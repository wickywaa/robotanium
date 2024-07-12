import firebaseAdmin from "firebase-admin";
import { ICreateTankBot } from "../interfaces/botinterfaces";
const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS ?? "");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export const fireStoreDB = firebaseAdmin.firestore();
export const auth = firebaseAdmin.auth();

export const getBotById = async (botId: string): Promise<ICreateTankBot> => {
  return fireStoreDB
    .collection("botz")
    .where("botId", "==", botId)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 1) {
        return querySnapshot.docs[0].data() as ICreateTankBot;
      }
      return undefined;
    })
    .catch(() => {
      throw new Error("could not find bot");
    });
};

export const getBotPasswordById = async (botId: string): Promise<string | undefined> => {
  console.log(botId)
  return fireStoreDB
    .collection("botPasswords")
    .where("botId", "==", botId)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 1) {
        console.log(querySnapshot.size)
        return querySnapshot.docs[0].data().password as unknown as string;
      }
      if(querySnapshot.size <1) {
        throw new Error("no Id found");
      }
      throw new Error("Should only return one botId");
    })
    .catch((e) => {
      return undefined
    });
};

export const setBotStatus = (botId: string, status: boolean) => {
  console.log(botId);
  const query = fireStoreDB
    .collection("botz")
    .where("botId", "==", botId)
    .get()
    .then((querySnapshot) => {
      console.log("snapshot", querySnapshot);
      if (querySnapshot.size === 1) {
        console.log("here");
        querySnapshot.docs[0].ref.update({ status }).then((response) => {
          console.log("should be updated", response);
        });
      }
    });
};
