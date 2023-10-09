"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProtection = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../modules/auth/auth.guard");
function AuthProtection() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_guard_1.AuthGuard));
}
exports.AuthProtection = AuthProtection;
//# sourceMappingURL=auth-protection.decorator.js.map