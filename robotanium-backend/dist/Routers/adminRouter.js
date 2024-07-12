"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const AdminHandlers_1 = require("../handlers/AdminHandlers");
const Admin_Middleware_ts_1 = require("../middleware/Admin.Middleware.ts");
exports.adminRouter = express_1.default.Router();
exports.adminRouter.post('/api/admin', Admin_Middleware_ts_1.validateAdminLoginDtoMiddleware);
exports.adminRouter.post('/api/botconnect', Admin_Middleware_ts_1.validateAdminConnectbot, Admin_Middleware_ts_1.validateAdminUser, Admin_Middleware_ts_1.attachAdminTankBotSessionToken, AdminHandlers_1.handleConnectToBot);
exports.adminRouter.post("/api/createtankbot", Admin_Middleware_ts_1.validateAdminUser, Admin_Middleware_ts_1.attachAdminTankBotSessionId, AdminHandlers_1.createBotHandler);
//# sourceMappingURL=adminRouter.js.map