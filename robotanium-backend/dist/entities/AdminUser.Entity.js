"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserEntity = void 0;
const typeorm_1 = require("typeorm");
const interfaces_1 = require("../interfaces");
let AdminUserEntity = class AdminUserEntity {
    constructor() {
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "varchar",
        length: 36,
        unique: true,
    }),
    __metadata("design:type", String)
], AdminUserEntity.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 64,
        unique: true,
    }),
    __metadata("design:type", String)
], AdminUserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: interfaces_1.IAdminUserRoles,
        default: interfaces_1.IAdminUserRoles.Admin,
    }),
    __metadata("design:type", String)
], AdminUserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 64,
    }),
    __metadata("design:type", String)
], AdminUserEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 64,
    }),
    __metadata("design:type", String)
], AdminUserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 64,
    }),
    __metadata("design:type", String)
], AdminUserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: true,
    }),
    __metadata("design:type", Boolean)
], AdminUserEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", {
        array: true,
    }),
    __metadata("design:type", Array)
], AdminUserEntity.prototype, "tokens", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", String)
], AdminUserEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", String)
], AdminUserEntity.prototype, "updated_at", void 0);
AdminUserEntity = __decorate([
    (0, typeorm_1.Entity)()
], AdminUserEntity);
exports.AdminUserEntity = AdminUserEntity;
//# sourceMappingURL=AdminUser.Entity.js.map