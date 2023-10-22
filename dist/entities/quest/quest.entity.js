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
exports.Quest = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base.entity");
const quest_type_1 = require("./quest.type");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
let Quest = exports.Quest = class Quest extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'string' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Quest.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Quest.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], Quest.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'number' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], Quest.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: quest_type_1.QuestStatus }),
    (0, typeorm_1.Index)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(quest_type_1.QuestStatus),
    __metadata("design:type", String)
], Quest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    (0, typeorm_1.Index)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsJSON)(),
    __metadata("design:type", mongodb_1.ObjectId)
], Quest.prototype, "user_id", void 0);
exports.Quest = Quest = __decorate([
    (0, typeorm_1.Entity)()
], Quest);
//# sourceMappingURL=quest.entity.js.map