"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP_CONFIG = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.SMTP_CONFIG = {
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM
};
//# sourceMappingURL=email.config.js.map