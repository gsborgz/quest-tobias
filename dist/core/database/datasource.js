"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatasource = exports.mongoConfig = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../entities/user/user.entity");
const quest_entity_1 = require("../../entities/quest/quest.entity");
const reward_entity_1 = require("../../entities/reward/reward.entity");
const token_entity_1 = require("../../entities/token/token.entity");
const dotenv = require("dotenv");
dotenv.config();
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;
const isTest = process.env.NODE_ENV === 'test';
exports.mongoConfig = {
    type: 'mongodb',
    database: isTest ? process.env.MONGO_TEST_DB : process.env.MONGO_DB,
    url: `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}/?retryWrites=true&w=majority`,
    entities: [user_entity_1.User, quest_entity_1.Quest, reward_entity_1.Reward, token_entity_1.Token],
    synchronize: true,
};
exports.MongoDatasource = new typeorm_1.DataSource(exports.mongoConfig);
//# sourceMappingURL=datasource.js.map