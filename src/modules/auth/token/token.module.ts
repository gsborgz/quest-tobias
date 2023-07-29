import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { TokenService } from '@modules/auth/token/token.service';
import { TokenStrategy } from '@modules/auth/token/token.strategy';
import { TokenHelper } from '@modules/auth/token/token.helper';

dotenv.config();

@Module({
	imports: [JwtModule.register({ secret: process.env.JWT_KEY })],
	providers: [
		TokenService,
		TokenStrategy,
		TokenHelper
	],
	exports: [
		TokenService
	]
})
export class TokenModule {}