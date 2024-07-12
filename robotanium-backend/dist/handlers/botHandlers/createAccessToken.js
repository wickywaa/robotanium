"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBotHandler = void 0;
const addBotHandler = (req, res, next) => {
    const date = new Date();
    const { startTime, endTime } = req.body;
    if (date.getTime() < endTime) {
        res.status(403).json({ error: {
                message: 'Game Expired sorry'
            } });
    }
};
exports.addBotHandler = addBotHandler;
//# sourceMappingURL=createAccessToken.js.map