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
exports.SigninResultDTO = exports.UpdatePasswordDTO = exports.ResetPasswordDTO = exports.UpdateProfileDTO = exports.PasswordResetRequestDTO = exports.SignupDTO = exports.SigninDTO = exports.UserTheme = exports.UserLanguage = void 0;
const class_validator_1 = require("class-validator");
var UserLanguage;
(function (UserLanguage) {
    UserLanguage["EN"] = "en";
    UserLanguage["PTBR"] = "pt-br";
})(UserLanguage || (exports.UserLanguage = UserLanguage = {}));
var UserTheme;
(function (UserTheme) {
    UserTheme["LIGHT"] = "light";
    UserTheme["DARK"] = "dark";
})(UserTheme || (exports.UserTheme = UserTheme = {}));
class SigninDTO {
}
exports.SigninDTO = SigninDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SigninDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SigninDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SigninDTO.prototype, "expires_in", void 0);
class SignupDTO {
}
exports.SignupDTO = SignupDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDTO.prototype, "password_confirmation", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SignupDTO.prototype, "expires_in", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(UserLanguage),
    __metadata("design:type", String)
], SignupDTO.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(UserTheme),
    __metadata("design:type", String)
], SignupDTO.prototype, "theme", void 0);
class PasswordResetRequestDTO {
}
exports.PasswordResetRequestDTO = PasswordResetRequestDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PasswordResetRequestDTO.prototype, "email", void 0);
class UpdateProfileDTO {
}
exports.UpdateProfileDTO = UpdateProfileDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDTO.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDTO.prototype, "name", void 0);
class ResetPasswordDTO {
}
exports.ResetPasswordDTO = ResetPasswordDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDTO.prototype, "password_confirmation", void 0);
class UpdatePasswordDTO {
}
exports.UpdatePasswordDTO = UpdatePasswordDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePasswordDTO.prototype, "current_password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePasswordDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePasswordDTO.prototype, "password_confirmation", void 0);
class SigninResultDTO {
    constructor(token) {
        this.token = token;
    }
}
exports.SigninResultDTO = SigninResultDTO;
//# sourceMappingURL=user.type.js.map