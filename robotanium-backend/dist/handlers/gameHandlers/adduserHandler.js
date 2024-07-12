"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserHandler = void 0;
const firebase_1 = require("../../firebase/firebase");
const addUserHandler = (req, res, next) => {
    const { gameId, userId } = req.body;
    const gameRef = firebase_1.fireStoreDB.collection(`games/${gameId}`);
    res.send(200);
};
exports.addUserHandler = addUserHandler;
//# sourceMappingURL=adduserHandler.js.map