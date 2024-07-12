"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const bcrypt_1 = require("bcrypt");
class PasswordService {
    constructor() {
        this.encryptPassword = async (password) => {
            return await (0, bcrypt_1.hash)(password, 16);
        };
        this.comparePasswords = async (password, encryptedPassword) => {
            return await (0, bcrypt_1.compare)(password, encryptedPassword);
        };
    }
}
exports.PasswordService = PasswordService;
//# sourceMappingURL=password.js.map