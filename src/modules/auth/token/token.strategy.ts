import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DataSource } from 'typeorm';
import { User } from '@entities/user/user.entity';
import { Token } from '@entities/token/token.entity';
import { TokenPayload } from '@entities/token/token.type';
import { session } from '@core/session';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {

	constructor(private readonly dataSource: DataSource) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_KEY
		});
	} 

	public async validate(payload: TokenPayload) {
		const databaseToken = await this.dataSource.getRepository(Token).findOneByOrFail({ user_id: payload.id });

		if (!databaseToken) {
			throw new UnauthorizedException('Invalid token');
		}

		session.setUser(payload as User);

		return { id: payload.id };
	}

}