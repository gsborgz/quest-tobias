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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const EmailTemplate = require("email-templates");
const nodemailer = require("nodemailer");
const email_config_1 = require("./email.config");
let EmailService = exports.EmailService = class EmailService {
    constructor() { }
    sendEmail(email_config) {
        const { to, cc, template, locals } = email_config;
        const emailTransporter = this.getTransporterConfig();
        const emailOptions = {
            template,
            message: {
                to: to.join(',')
            }
        };
        if (locals) {
            emailOptions.locals = locals;
        }
        if (cc) {
            emailOptions.message.cc = cc.join(',');
        }
        return emailTransporter.send(emailOptions);
    }
    getTransporterConfig() {
        const { host, port, user, pass, from } = email_config_1.SMTP_CONFIG;
        const transport = nodemailer.createTransport({
            host,
            port: Number(port),
            auth: {
                user,
                pass
            }
        });
        return new EmailTemplate({
            message: {
                from: `Quest <${from}>`
            },
            views: {
                root: 'src/core/email/templates'
            },
            transport,
            send: true,
            preview: false
        });
    }
};
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map