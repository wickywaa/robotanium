"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameHandler = void 0;
const firebase_1 = require("../../firebase/firebase");
const createGameHandler = (req, res) => {
    const gameRef = firebase_1.fireStoreDB.collection(`games/`);
    return res.status(200).send("");
};
exports.createGameHandler = createGameHandler;
//# sourceMappingURL=createGameHandler.js.map