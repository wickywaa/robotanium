"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnectToBot = void 0;
const handleConnectToBot = async (req, res) => {
    res.status(200).json({ accessToken: req.accesstoken, sessionId: req.body.sessionId });
};
exports.handleConnectToBot = handleConnectToBot;
//# sourceMappingURL=Admin_Connect_Bot.js.map