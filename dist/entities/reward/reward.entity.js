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
exports.Reward = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base.entity");
const reward_type_1 = require("./reward.type");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
let Reward = exports.Reward = class Reward extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'string' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Reward.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Reward.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'number' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Reward.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: reward_type_1.RewardStatus }),
    (0, typeorm_1.Index)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(reward_type_1.RewardStatus),
    __metadata("design:type", String)
], Reward.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    (0, typeorm_1.Index)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsJSON)(),
    __metadata("design:type", mongodb_1.ObjectId)
], Reward.prototype, "user_id", void 0);
exports.Reward = Reward = __decorate([
    (0, typeorm_1.Entity)()
], Reward);
//# sourceMappingURL=reward.entity.js.map