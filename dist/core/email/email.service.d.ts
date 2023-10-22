import * as EmailTemplate from 'email-templates';
import { SendEmailConfig, SentEmailInfo } from '@core/email/email.type';
export declare class EmailService {
    constructor();
    sendEmail(email_config?: SendEmailConfig): Promise<SentEmailInfo>;
    getTransporterConfig(): EmailTemplate;
}
