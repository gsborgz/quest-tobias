import { Injectable } from '@nestjs/common';
import { EmailOptions } from 'email-templates';
import * as EmailTemplate from 'email-templates';
import * as nodemailer from 'nodemailer';
import { SMTP_CONFIG } from '@core/email/email.config';
import { SendEmailConfig, SentEmailInfo } from '@core/email/email.type';

@Injectable()
export class EmailService {

	constructor() {}

	public sendEmail(email_config?: SendEmailConfig): Promise<SentEmailInfo> {
		const { to, cc, template, locals } = email_config;
		const emailTransporter = this.getTransporterConfig();
		const emailOptions: EmailOptions = {
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

  public getTransporterConfig(): EmailTemplate {
		const { host, port, user, pass, from } = SMTP_CONFIG;
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
				from: `My Quest <${from}>`
			},
			views: {
				root: 'src/core/email/templates'
			},
			transport,
			send: true,
			preview: false
		});
	}

}
