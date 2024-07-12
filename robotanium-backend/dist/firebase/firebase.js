"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBotStatus = exports.getBotPasswordById = exports.getBotById = exports.auth = exports.fireStoreDB = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS ?? "");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
exports.fireStoreDB = firebase_admin_1.default.firestore();
exports.auth = firebase_admin_1.default.auth();
const getBotById = async (botId) => {
    return exports.fireStoreDB
        .collection("botz")
        .where("botId", "==", botId)
        .get()
        .then((querySnapshot) => {
        if (querySnapshot.size === 1) {
            return querySnapshot.docs[0].data();
        }
        return undefined;
    })
        .catch(() => {
        throw new Error("could not find bot");
    });
};
exports.getBotById = getBotById;
const getBotPasswordById = async (botId) => {
    return exports.fireStoreDB
        .collection("botPasswords")
        .where("botId", "==", botId)
        .get()
        .then((querySnapshot) => {
        if (querySnapshot.size === 1) {
            return querySnapshot.docs[0].data().password;
        }
        throw new Error("Should only return one botId");
    })
        .catch((e) => {
        throw new Error(e);
    });
};
exports.getBotPasswordById = getBotPasswordById;
const setBotStatus = (botId, status) => {
    console.log(botId);
    const query = exports.fireStoreDB
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
exports.setBotStatus = setBotStatus;
//# sourceMappingURL=firebase.js.map