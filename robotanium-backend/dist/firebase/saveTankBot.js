"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTankBot = void 0;
const firebase_1 = require("./firebase");
const password_1 = require("../Services/password");
const saveTankBot = async (bot) => {
    const passwordservice = new password_1.PasswordService();
    const { botId, botName, mainPhotoUrl, otherPhotosUrls, password } = bot;
    const passwordsRef = firebase_1.fireStoreDB.collection("botPasswords");
    const botRef = firebase_1.fireStoreDB.collection("botz");
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
            .then(() => passwordsRef.add({
            botId,
            password: tankPassword,
        }))
            .then(() => true);
    })
        .catch((e) => {
        return new Error("bot could not be saved");
    });
};
exports.saveTankBot = saveTankBot;
//# sourceMappingURL=saveTankBot.js.map