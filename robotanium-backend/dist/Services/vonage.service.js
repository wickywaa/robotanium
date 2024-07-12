"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionToken = exports.createSessionId = void 0;
const OpenTok = require("opentok");
const opentok = new OpenTok("47758991", "389edc986b187938f0e2b7f55dde9fdd205bdc86");
const createSessionId = async (callback) => {
    return await opentok.createSession({ mediaMode: 'relayed' }, (err, session) => {
        if (err)
            return callback(err, undefined);
        return callback(undefined, session.sessionId);
    });
};
exports.createSessionId = createSessionId;
const createSessionToken = async (options) => {
    const { role, sessionId, expireTime } = options;
    return await opentok.generateToken(sessionId, {
        role,
        expireTime,
    });
};
exports.createSessionToken = createSessionToken;
module.exports = {
    createSessionId: exports.createSessionId,
    createSessionToken: exports.createSessionToken
};
//# sourceMappingURL=vonage.service.js.map