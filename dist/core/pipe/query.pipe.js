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
exports.QueryPipe = void 0;
const common_1 = require("@nestjs/common");
const type_1 = require("../type");
const typeorm_1 = require("typeorm");
let QueryPipe = exports.QueryPipe = class QueryPipe {
    constructor() { }
    transform(value) {
        const result = new type_1.QueryData();
        result.where = {};
        Object.keys(value).forEach(key => {
            if (key === 'skip') {
                result.skip = parseInt(value.skip);
            }
            else if (key === 'take') {
                result.take = parseInt(value.take);
            }
            else if (key === 'order') {
                result.order = JSON.parse(value.order);
            }
            else {
                if (Array.isArray(value[key])) {
                    result.where[key] = (0, typeorm_1.In)(value[key]);
                }
                else {
                    result.where[key] = value[key];
                }
            }
        });
        return result;
    }
};
exports.QueryPipe = QueryPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], QueryPipe);
//# sourceMappingURL=query.pipe.js.map