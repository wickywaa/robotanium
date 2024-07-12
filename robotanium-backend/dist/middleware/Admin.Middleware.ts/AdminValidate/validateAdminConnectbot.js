"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminConnectbot = void 0;
const validateAdminConnectbot = async (req, res, next) => {
    const missingFields = [];
    try {
        const { botId, email, idToken, uid, sessionId } = req.body;
        if (!sessionId?.length)
            return missingFields.push('sessionId');
        if (!botId?.length)
            return missingFields.push('botId');
        if (!email?.length)
            return missingFields.push('email');
        if (!idToken?.length)
            return missingFields.push('idToken');
        if (!uid?.length)
            return missingFields.push('uid');
        if (missingFields.length)
            throw new Error();
        next();
    }
    catch (e) {
        if (missingFields.length)
            res.status(400).json({ message: 'missing Fields', fields: missingFields });
    }
};
exports.validateAdminConnectbot = validateAdminConnectbot;
//# sourceMappingURL=validateAdminConnectbot.js.map