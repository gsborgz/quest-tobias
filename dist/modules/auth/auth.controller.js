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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_type_1 = require("../../entities/user/user.type");
const auth_protection_decorator_1 = require("../../core/decorators/auth-protection.decorator");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    me() {
        return this.authService.getMe();
    }
    signin(body) {
        return this.authService.signin(body);
    }
    signup(body) {
        return this.authService.signup(body);
    }
    async requestPasswordReset(body) {
        return this.authService.requestPasswordReset(body);
    }
    updateProfile(body) {
        return this.authService.updateProfile(body);
    }
    resetPassword(body) {
        return this.authService.resetPassword(body);
    }
    updatePassword(body) {
        return this.authService.updatePassword(body);
    }
    setLanguage(language) {
        return this.authService.setLanguage(language);
    }
    setTheme(theme) {
        return this.authService.setTheme(theme);
    }
    async signout() {
        return this.authService.signout();
    }
    async deleteAccount() {
        return this.authService.deleteAccount();
    }
};
__decorate([
    (0, common_1.Get)('me'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ skipMissingProperties: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_type_1.SigninDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ skipMissingProperties: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_type_1.SignupDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('request-password-reset'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ skipMissingProperties: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_type_1.PasswordResetRequestDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    (0, common_1.Put)('update-profile'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ skipMissingProperties: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_type_1.UpdateProfileDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)('reset-password'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ skipMissingProperties: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_type_1.ResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Put)('update-password'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ skipMissingProperties: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_type_1.UpdatePasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Put)('set-language/:language'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __param(0, (0, common_1.Param)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setLanguage", null);
__decorate([
    (0, common_1.Put)('set-theme/:theme'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __param(0, (0, common_1.Param)('theme')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setTheme", null);
__decorate([
    (0, common_1.Delete)('signout'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signout", null);
__decorate([
    (0, common_1.Delete)('delete-account'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteAccount", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map