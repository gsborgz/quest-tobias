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
exports.RewardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
const reward_entity_1 = require("../../entities/reward/reward.entity");
const type_1 = require("../../core/type");
const session_1 = require("../../core/session");
const reward_type_1 = require("../../entities/reward/reward.type");
const user_entity_1 = require("../../entities/user/user.entity");
let RewardService = exports.RewardService = class RewardService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    findAll(query) {
        const { where: whereOptions } = query;
        const where = {
            user_id: new mongodb_1.ObjectId(session_1.session.getUser()._id)
        };
        const select = {
            _id: true,
            name: true,
            description: true,
            value: true
        };
        if (whereOptions.status) {
            where['status'] = whereOptions.status;
        }
        return this.dataSource.getRepository(reward_entity_1.Reward).find({ where, select });
    }
    findOne(id) {
        const where = {
            _id: new mongodb_1.ObjectId(id),
            user_id: new mongodb_1.ObjectId(session_1.session.getUser()._id)
        };
        const select = {
            _id: true,
            name: true,
            description: true,
            value: true,
            status: true
        };
        return this.dataSource.getRepository(reward_entity_1.Reward).findOne({ where, select });
    }
    async upsert(body) {
        if (body._id) {
            await this.validateId(body._id);
            body._id = new mongodb_1.ObjectId(body._id);
        }
        body.user_id = new mongodb_1.ObjectId(session_1.session.getUser()._id);
        return this.dataSource.getRepository(reward_entity_1.Reward).save(body);
    }
    async claimReward(id) {
        await this.validateId(id);
        const [reward, user] = await Promise.all([
            this.dataSource.getRepository(reward_entity_1.Reward).findOneBy({ _id: new mongodb_1.ObjectId(id) }),
            this.dataSource.getRepository(user_entity_1.User).findOneBy({ _id: new mongodb_1.ObjectId(session_1.session.getUser()._id) })
        ]);
        this.checkIfUserHasEnoughCredits(reward, user);
        await Promise.all([
            this.dataSource.getRepository(reward_entity_1.Reward).update({ _id: new mongodb_1.ObjectId(id) }, { status: reward_type_1.RewardStatus.CLAIMED }),
            this.dataSource.getRepository(user_entity_1.User).update({ _id: new mongodb_1.ObjectId(session_1.session.getUser()._id) }, { credits: user.credits - reward.value })
        ]);
        return this.dataSource.getRepository(reward_entity_1.Reward).findOneBy({ _id: new mongodb_1.ObjectId(id) });
    }
    async delete(id) {
        await this.validateId(id);
        await this.dataSource.getRepository(reward_entity_1.Reward).delete({ _id: new mongodb_1.ObjectId(id) });
        return new type_1.BaseMessage('text.reward_deleted');
    }
    async validateId(id) {
        const reward = await this.dataSource.getRepository(reward_entity_1.Reward).findOneByOrFail({ _id: new mongodb_1.ObjectId(id) });
        if (!reward.user_id.equals(session_1.session.getUser()._id)) {
            throw new common_1.UnauthorizedException('text.unauthorized');
        }
    }
    checkIfUserHasEnoughCredits(reward, user) {
        if (reward.value > user.credits) {
            throw new common_1.BadRequestException('text.not_enough_credits');
        }
    }
};
exports.RewardService = RewardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], RewardService);
//# sourceMappingURL=reward.service.js.map