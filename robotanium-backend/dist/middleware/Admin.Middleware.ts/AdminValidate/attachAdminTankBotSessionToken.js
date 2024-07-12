"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachAdminTankBotSessionToken = void 0;
const Services_1 = require("../../../Services");
const attachAdminTankBotSessionToken = async (req, res, next) => {
    try {
        const sessionArgs = {
            role: 'publisher',
            sessionId: req.body.sessionId,
            expireTime: new Date().getTime() + 300000,
        };
        await (0, Services_1.createSessionToken)(sessionArgs)
            .then((token) => req.accesstoken = token)
            .catch((e) => {
            throw new Error();
        });
        next();
    }
    catch (e) {
        res.status(500).json({ message: 'could not create session token' });
    }
};
exports.attachAdminTankBotSessionToken = attachAdminTankBotSessionToken;
//# sourceMappingURL=attachAdminTankBotSessionToken.js.map