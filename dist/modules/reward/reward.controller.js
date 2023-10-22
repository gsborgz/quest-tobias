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
exports.RewardController = void 0;
const common_1 = require("@nestjs/common");
const reward_service_1 = require("./reward.service");
const auth_protection_decorator_1 = require("../../core/decorators/auth-protection.decorator");
const query_pipe_1 = require("../../core/pipe/query.pipe");
const type_1 = require("../../core/type");
const reward_entity_1 = require("../../entities/reward/reward.entity");
let RewardController = exports.RewardController = class RewardController {
    constructor(rewardService) {
        this.rewardService = rewardService;
    }
    findAll(query) {
        return this.rewardService.findAll(query);
    }
    findOne(id) {
        return this.rewardService.findOne(id);
    }
    upsert(body) {
        return this.rewardService.upsert(body);
    }
    claimReward(id) {
        return this.rewardService.claimReward(id);
    }
    delete(id) {
        return this.rewardService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __param(0, (0, common_1.Query)(new query_pipe_1.QueryPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_1.QueryData]),
    __metadata("design:returntype", Promise)
], RewardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RewardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reward_entity_1.Reward]),
    __metadata("design:returntype", Promise)
], RewardController.prototype, "upsert", null);
__decorate([
    (0, common_1.Put)(':id/claim'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RewardController.prototype, "claimReward", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RewardController.prototype, "delete", null);
exports.RewardController = RewardController = __decorate([
    (0, common_1.Controller)('rewards'),
    __metadata("design:paramtypes", [reward_service_1.RewardService])
], RewardController);
//# sourceMappingURL=reward.controller.js.map