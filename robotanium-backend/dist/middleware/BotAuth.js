"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botAuth = ((req, res, next) => {
    const passwordIsCorrect = () => {
        return true;
    };
    if (passwordIsCorrect()) {
        next();
    }
});
//# sourceMappingURL=BotAuth.js.map