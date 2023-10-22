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
exports.QuestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
const session_1 = require("../../core/session");
const quest_entity_1 = require("../../entities/quest/quest.entity");
const quest_type_1 = require("../../entities/quest/quest.type");
const user_entity_1 = require("../../entities/user/user.entity");
const type_1 = require("../../core/type");
let QuestService = exports.QuestService = class QuestService {
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
            value: true,
        };
        if (whereOptions.status) {
            where['status'] = whereOptions.status;
        }
        return this.dataSource.getRepository(quest_entity_1.Quest).find({ where, select });
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
            date: true,
            status: true
        };
        return this.dataSource.getRepository(quest_entity_1.Quest).findOne({ where, select });
    }
    async upsert(body) {
        if (body._id) {
            await this.validateId(body._id);
            body._id = new mongodb_1.ObjectId(body._id);
        }
        body.user_id = new mongodb_1.ObjectId(session_1.session.getUser()._id);
        body.date = new Date(body.date);
        return this.dataSource.getRepository(quest_entity_1.Quest).save(body);
    }
    async completeQuest(id) {
        await this.validateId(id);
        const [quest, user] = await Promise.all([
            this.dataSource.getRepository(quest_entity_1.Quest).findOneBy({ _id: new mongodb_1.ObjectId(id) }),
            this.dataSource.getRepository(user_entity_1.User).findOneBy({ _id: new mongodb_1.ObjectId(session_1.session.getUser()._id) })
        ]);
        await Promise.all([
            this.dataSource.getRepository(quest_entity_1.Quest).update({ _id: new mongodb_1.ObjectId(id) }, { status: quest_type_1.QuestStatus.COMPLETED }),
            this.dataSource.getRepository(user_entity_1.User).update({ _id: new mongodb_1.ObjectId(session_1.session.getUser()._id) }, { credits: user.credits + quest.value })
        ]);
        return this.dataSource.getRepository(quest_entity_1.Quest).findOneBy({ _id: new mongodb_1.ObjectId(id) });
    }
    async delete(id) {
        await this.validateId(id);
        await this.dataSource.getRepository(quest_entity_1.Quest).delete({ _id: new mongodb_1.ObjectId(id) });
        return new type_1.BaseMessage('text.quest_deleted');
    }
    async validateId(id) {
        const quest = await this.dataSource.getRepository(quest_entity_1.Quest).findOneByOrFail({ _id: new mongodb_1.ObjectId(id) });
        if (!quest.user_id.equals(session_1.session.getUser()._id)) {
            throw new common_1.UnauthorizedException('text.unauthorized');
        }
    }
};
exports.QuestService = QuestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], QuestService);
//# sourceMappingURL=quest.service.js.map