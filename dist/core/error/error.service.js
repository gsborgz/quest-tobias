"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorService = void 0;
const common_1 = require("@nestjs/common");
let ErrorService = exports.ErrorService = class ErrorService {
    throwInternalServerError() {
        throw new common_1.InternalServerErrorException('Internal server error');
    }
    throwDatabaseError(error) {
        throw new common_1.BadRequestException(error.sqlMessage || error.message);
    }
    throwNotFoundError() {
        throw new common_1.NotFoundException('Not found');
    }
};
exports.ErrorService = ErrorService = __decorate([
    (0, common_1.Injectable)()
], ErrorService);
//# sourceMappingURL=error.service.js.map