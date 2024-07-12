"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminLoginDtoMiddleware = void 0;
const interfaces_1 = require("../../../interfaces");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validateAdminLoginDtoMiddleware = async (req, res, next) => {
    const adminLoginDTOInstance = (0, class_transformer_1.plainToInstance)(interfaces_1.AdminLoginDTO, req.body);
    const errors = await (0, class_validator_1.validate)(adminLoginDTOInstance, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length > 0) {
        return res.status(400).json({ error: errors.toString() });
    }
    next();
};
exports.validateAdminLoginDtoMiddleware = validateAdminLoginDtoMiddleware;
//# sourceMappingURL=validateAdminLoginDTO.js.map