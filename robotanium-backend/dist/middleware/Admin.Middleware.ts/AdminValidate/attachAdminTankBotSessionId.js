"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachAdminTankBotSessionId = void 0;
const Services_1 = require("../../../Services");
const attachAdminTankBotSessionId = async (req, res, next) => {
    try {
        await (0, Services_1.createSessionId)((err, session) => {
            if (err)
                throw new Error();
            if (session)
                req.sessionId = session;
            next();
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'could not create session' });
    }
};
exports.attachAdminTankBotSessionId = attachAdminTankBotSessionId;
//# sourceMappingURL=attachAdminTankBotSessionId.js.map