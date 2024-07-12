"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { sign, verify } = jsonwebtoken_1.default;
class JWTService {
    constructor() {
        this.createJWT = async (id) => {
            const token = jsonwebtoken_1.default.sign({ id }, this.secretToken, { expiresIn: '1day' });
            return token;
        };
        this.verifyJWT = async (token) => {
            return true;
        };
        this.secretToken = process.env.AUTH_SECRET;
    }
}
exports.JWTService = JWTService;
//# sourceMappingURL=jwt.js.map