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
exports.QuestController = void 0;
const common_1 = require("@nestjs/common");
const quest_service_1 = require("./quest.service");
const quest_entity_1 = require("../../entities/quest/quest.entity");
const auth_protection_decorator_1 = require("../../core/decorators/auth-protection.decorator");
const type_1 = require("../../core/type");
const query_pipe_1 = require("../../core/pipe/query.pipe");
let QuestController = exports.QuestController = class QuestController {
    constructor(questService) {
        this.questService = questService;
    }
    findAll(query) {
        return this.questService.findAll(query);
    }
    findOne(id) {
        return this.questService.findOne(id);
    }
    upsert(body) {
        return this.questService.upsert(body);
    }
    completeQuest(id) {
        return this.questService.completeQuest(id);
    }
    delete(id) {
        return this.questService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __param(0, (0, common_1.Query)(new query_pipe_1.QueryPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_1.QueryData]),
    __metadata("design:returntype", Promise)
], QuestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quest_entity_1.Quest]),
    __metadata("design:returntype", Promise)
], QuestController.prototype, "upsert", null);
__decorate([
    (0, common_1.Put)(':id/complete'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestController.prototype, "completeQuest", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_protection_decorator_1.AuthProtection)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestController.prototype, "delete", null);
exports.QuestController = QuestController = __decorate([
    (0, common_1.Controller)('quests'),
    __metadata("design:paramtypes", [quest_service_1.QuestService])
], QuestController);
//# sourceMappingURL=quest.controller.js.map