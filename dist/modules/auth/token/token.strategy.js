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
exports.TokenStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../entities/user/user.entity");
const token_entity_1 = require("../../../entities/token/token.entity");
const session_1 = require("../../../core/session");
const mongodb_1 = require("mongodb");
let TokenStrategy = exports.TokenStrategy = class TokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(dataSource) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_KEY
        });
        this.dataSource = dataSource;
    }
    async validate(payload) {
        const databaseToken = await this.dataSource.getRepository(token_entity_1.Token).findOneByOrFail({ user_id: new mongodb_1.ObjectId(payload.id) });
        const user = new user_entity_1.User();
        if (!databaseToken) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        user._id = payload.id;
        user.name = payload.name;
        user.email = payload.email;
        user.credits = payload.credits;
        user.created_at = payload.created_at;
        user.updated_at = payload.updated_at;
        session_1.session.setUser(user);
        return { id: payload.id };
    }
};
exports.TokenStrategy = TokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TokenStrategy);
//# sourceMappingURL=token.strategy.js.map