import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { TokenService } from '@modules/auth/token/token.service';
import { TokenStrategy } from '@modules/auth/token/token.strategy';

dotenv.config();

@Module({
	imports: [JwtModule.register({ secret: process.env.JWT_KEY })],
	providers: [
		TokenService,
		TokenStrategy
	],
	exports: [
		TokenService
	]
})
export class TokenModule {}