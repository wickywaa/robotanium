"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const botHandlers_1 = require("../../src/handlers/botHandlers");
const botRouter = express_1.default.Router();
const cors = require("cors");
const { createSessionId, createAccessToken, } = require("../Services/vonage.service");
const auth = (req, res, next) => {
    const passwordIsCorrect = () => {
        return true;
    };
    if (passwordIsCorrect()) {
        next();
    }
};
botRouter.post("/createtankbot", auth, botHandlers_1.createBotHandler);
botRouter.post("/createAccessToken", auth, (req, res) => {
    const { id, endTime, botId } = req.body;
    createAccessToken("subscriber", id, endTime, (token) => {
        res.send(token);
    });
});
botRouter.get("/createsession", auth, (req, res) => {
    const botId = req.body.botId;
    createSessionId((session) => {
        res.send(session);
    });
});
module.exports = botRouter;
//# sourceMappingURL=botsRouter.js.map