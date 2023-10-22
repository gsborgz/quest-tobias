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
exports.Token = void 0;
const mongodb_1 = require("mongodb");
const typeorm_1 = require("typeorm");
let Token = exports.Token = class Token {
    constructor(token, user_id) {
        this.token = token;
        this.user_id = new mongodb_1.ObjectId(user_id);
    }
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)({ type: 'json' }),
    __metadata("design:type", Object)
], Token.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'string' }),
    __metadata("design:type", String)
], Token.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", mongodb_1.ObjectId)
], Token.prototype, "user_id", void 0);
exports.Token = Token = __decorate([
    (0, typeorm_1.Entity)('tokens'),
    __metadata("design:paramtypes", [String, String])
], Token);
//# sourceMappingURL=token.entity.js.map