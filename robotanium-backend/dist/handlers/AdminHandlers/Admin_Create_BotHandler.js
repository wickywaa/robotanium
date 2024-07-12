"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBotHandler = void 0;
const firebase_1 = require("../../firebase/firebase");
const password_1 = require("../../Services/password");
const createBotHandler = async (req, res) => {
    const { botId, botName, mainPhotoUrl, otherPhotosUrls, password } = req.body;
    const passwordService = new password_1.PasswordService();
    const passwordsRef = firebase_1.fireStoreDB.collection("botPasswords");
    const botRef = firebase_1.fireStoreDB.collection("botz");
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
            .then(() => passwordsRef.add({
            botId,
            password: tankPassword,
        }))
            .then(() => res.status(200).json("bot saved"));
    })
        .catch((e) => {
        return res.status(400).json({
            error: e.message,
        });
    });
};
exports.createBotHandler = createBotHandler;
//# sourceMappingURL=Admin_Create_BotHandler.js.map