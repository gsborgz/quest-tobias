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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const token_entity_1 = require("../../../entities/token/token.entity");
const user_entity_1 = require("../../../entities/user/user.entity");
const mongodb_1 = require("mongodb");
const jwt_1 = require("@nestjs/jwt");
let TokenService = exports.TokenService = class TokenService {
    constructor(dataSource, jwtService) {
        this.dataSource = dataSource;
        this.jwtService = jwtService;
    }
    async create(user, expiresIn) {
        const tokenRepository = this.dataSource.getRepository(token_entity_1.Token);
        await tokenRepository.delete({ user_id: new mongodb_1.ObjectId(user._id) });
        const token = await this.generateToken(user, expiresIn);
        const encryptedToken = await bcrypt.hash(token, 10);
        await tokenRepository.save(new token_entity_1.Token(encryptedToken, user._id));
        return `Bearer ${token}`;
    }
    async delete(token) {
        token = token.replace('Bearer ', '');
        const { _id: id } = await this.getUserData(token);
        return this.dataSource.getRepository(token_entity_1.Token).delete({ user_id: new mongodb_1.ObjectId(id) });
    }
    generateToken(user, expiresIn) {
        const { _id: id, name, email, credits, created_at, updated_at } = user;
        const secret = process.env.JWT_KEY;
        const payload = { id, name, email, credits, created_at, updated_at };
        return this.jwtService.signAsync(payload, { secret, expiresIn });
    }
    async getUserData(token) {
        const data = await this.jwtService.verifyAsync(token);
        const user = new user_entity_1.User();
        user._id = data.id;
        user.name = data.name;
        user.email = data.email;
        user.created_at = data.created_at;
        user.updated_at = data.updated_at;
        return user;
    }
};
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        jwt_1.JwtService])
], TokenService);
//# sourceMappingURL=token.service.js.map