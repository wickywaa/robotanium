"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handlers_1 = require("../handlers");
const gameRouter = express_1.default.Router();
const cors = require("cors");
const gameAuth = (req, res, next) => {
    const passwordIsCorrect = () => {
        return true;
    };
    if (passwordIsCorrect()) {
        next();
    }
};
gameRouter.post("/creategame", gameAuth, handlers_1.createGameHandler);
gameRouter.post("/gameadduser", gameAuth, handlers_1.addUserHandler);
gameRouter.get("/games", gameAuth, handlers_1.loadGamesHandler);
module.exports = gameRouter;
//# sourceMappingURL=gameRouter.js.map