import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TokenHelper } from '@modules/auth/token/token.helper';
import { Token } from '@entities/token/token.entity';
import { User } from '@entities/user/user.entity';

@Injectable()
export class TokenService {

	constructor(
    private readonly dataSource: DataSource,
		private readonly tokenHelper: TokenHelper
	) {}

	public async create(user: User, expiresIn: number): Promise<string> {
		const tokenRepository = this.dataSource.getRepository(Token);

		await tokenRepository.delete({ user_id: user.id });

		const token = await this.tokenHelper.generateToken(user, expiresIn);
		const encryptedToken = await bcrypt.hash(token, 10);

		await tokenRepository.save(new Token(encryptedToken, user.id));

		return `Bearer ${token}`;
	}

	public async delete(token: string): Promise<DeleteResult> {
		token = token.replace('Bearer ', '');

		const { id } = await this.tokenHelper.getUserData(token);

		return this.dataSource.getRepository(Token).delete({ user_id: id });
	}

}