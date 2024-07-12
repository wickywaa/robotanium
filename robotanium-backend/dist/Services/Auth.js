"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const firebase_1 = require("../firebase");
class AuthService {
    constructor() {
        this.finduser = (uid) => {
            firebase_1.auth
                .getUser(uid)
                .then((user) => true)
                .catch((err) => {
                throw new Error(err);
            });
            return false;
        };
        this.isFirebaseUser = (token, callback) => {
            firebase_1.auth
                .verifyIdToken(token)
                .then((decodedToken) => {
                firebase_1.auth.getUser(decodedToken.uid).then((user) => {
                    callback({ verified: true, uid: user.uid });
                });
            })
                .catch((err) => {
                callback({ verified: false, uid: '' });
            });
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=Auth.js.map