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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const user_type_1 = require("../../entities/user/user.type");
const user_entity_1 = require("../../entities/user/user.entity");
const session_1 = require("../../core/session");
const token_entity_1 = require("../../entities/token/token.entity");
const token_service_1 = require("./token/token.service");
const mongodb_1 = require("mongodb");
const type_1 = require("../../core/type");
const email_service_1 = require("../../core/email/email.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(dataSource, tokenService, emailService) {
        this.dataSource = dataSource;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }
    getMe() {
        return this.dataSource.getRepository(user_entity_1.User).findOneOrFail({
            select: {
                _id: true,
                name: true,
                email: true,
                language: true,
                theme: true,
                credits: true
            },
            where: { _id: new mongodb_1.ObjectId(session_1.session.getUser()._id) }
        });
    }
    async signin(body) {
        const user = await this.findUserByEmail(body.email);
        await this.comparePassword(body, user);
        await this.checkIfTokenExists(user);
        const token = await this.tokenService.create(user, body.expires_in || 64000);
        return new user_type_1.SigninResultDTO(token);
    }
    async signup(body) {
        const { name, email, password, expires_in, language, theme } = body;
        const signinBody = { email, password, expires_in };
        const user = new user_entity_1.User();
        await this.checkIfUserDoesNotExist(body.email);
        this.checkIfPasswordsMatch(body);
        user.name = name;
        user.email = email;
        user.password = await this.encryptPassword(password);
        user.language = language;
        user.theme = theme;
        user.credits = 0;
        await this.dataSource.getRepository(user_entity_1.User).save(user);
        return this.signin(signinBody);
    }
    async requestPasswordReset({ email }) {
        const user = await this.dataSource.getRepository(user_entity_1.User).findOneByOrFail({ email });
        const token = await this.tokenService.create(user, 600);
        const base64Token = Buffer.from(token).toString('base64');
        await this.emailService.sendEmail({
            to: [email],
            template: 'reset_password',
            locals: {
                name: user.name,
                link: `http://localhost:8080/auth/change_password?token=${base64Token}`
            }
        });
        return new type_1.BaseMessage('text.email_sent');
    }
    async updatePassword(id, body) {
        this.checkIfPasswordsMatch(body);
        const { password } = body;
        const user = await this.dataSource.getRepository(user_entity_1.User).findOneByOrFail({ _id: new mongodb_1.ObjectId(id) });
        user.password = await this.encryptPassword(password);
        await this.dataSource.getRepository(user_entity_1.User).save(user);
        return new type_1.BaseMessage('text.password_updated');
    }
    async setLanguage(language) {
        const user = session_1.session.getUser();
        if (!Object.values(user_type_1.UserLanguage).includes(language)) {
            throw new common_1.BadRequestException('text.invalid_language');
        }
        await this.dataSource.getRepository(user_entity_1.User).update(user._id, { language: language });
        return new type_1.BaseMessage('text.language_updated');
    }
    async setTheme(theme) {
        const user = session_1.session.getUser();
        if (!Object.values(user_type_1.UserTheme).includes(theme)) {
            throw new common_1.BadRequestException('text.invalid_theme');
        }
        await this.dataSource.getRepository(user_entity_1.User).update(user._id, { theme: theme });
        return new type_1.BaseMessage('text.theme_updated');
    }
    async signout() {
        await this.dataSource.getRepository(token_entity_1.Token).delete({
            user_id: new mongodb_1.ObjectId(session_1.session.getUser()._id)
        });
        return new type_1.BaseMessage('text.signed_out');
    }
    async deleteAccount() {
        const deleteUser = this.dataSource.getRepository(user_entity_1.User).delete({
            _id: new mongodb_1.ObjectId(session_1.session.getUser()._id)
        });
        const deleteSession = this.dataSource.getRepository(token_entity_1.Token).delete({
            user_id: new mongodb_1.ObjectId(session_1.session.getUser()._id)
        });
        await Promise.all([
            deleteUser,
            deleteSession
        ]);
        return new type_1.BaseMessage('text.account_deleted');
    }
    async encryptPassword(password) {
        return bcrypt.hash(password, 10);
    }
    async comparePassword(body, user) {
        const samePassword = await bcrypt.compare(body.password, user.password);
        if (!samePassword) {
            throw new common_1.BadRequestException('text.user_not_found');
        }
    }
    async findUserByEmail(email) {
        const user = await this.dataSource.getRepository(user_entity_1.User).findOneBy({ email });
        if (!user) {
            throw new common_1.BadRequestException('text.user_not_found');
        }
        return user;
    }
    checkIfPasswordsMatch(body) {
        if (body.password !== body.password_confirmation) {
            throw new common_1.BadRequestException('text.passwords_do_not_match');
        }
    }
    async checkIfUserDoesNotExist(email) {
        const user = await this.dataSource.getRepository(user_entity_1.User).findOneBy({ email });
        if (user) {
            throw new common_1.BadRequestException('text.user_already_exists');
        }
    }
    async checkIfTokenExists(user) {
        const userToken = await this.dataSource.getRepository(token_entity_1.Token).findOneBy({ user_id: new mongodb_1.ObjectId(user._id) });
        if (userToken) {
            await this.dataSource.getRepository(token_entity_1.Token).delete(userToken._id);
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        token_service_1.TokenService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map