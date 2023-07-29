import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Token } from '@entities/token/token.entity';
import { User } from '@entities/user/user.entity';
import { ObjectId } from 'mongodb';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@entities/token/token.type';

@Injectable()
export class TokenService {

	constructor(
    private readonly dataSource: DataSource,
		private readonly jwtService: JwtService
	) {}

	public async create(user: User, expiresIn: number): Promise<string> {
		const tokenRepository = this.dataSource.getRepository(Token);

		await tokenRepository.delete({ user_id: new ObjectId(user._id) });

		const token = await this.generateToken(user, expiresIn);
		const encryptedToken = await bcrypt.hash(token, 10);

		await tokenRepository.save(new Token(encryptedToken, user._id as string));

		return `Bearer ${token}`;
	}

	public async delete(token: string): Promise<DeleteResult> {
		token = token.replace('Bearer ', '');

		const { _id: id } = await this.getUserData(token);

		return this.dataSource.getRepository(Token).delete({ user_id: new ObjectId(id) });
	}

	private generateToken(user: User, expiresIn: number): Promise<string> {
		const { _id: id, name, email, credits, created_at, updated_at } = user;
    const secret = process.env.JWT_KEY;
		const payload = { id, name, email, credits, created_at, updated_at };

		return this.jwtService.signAsync(payload, { secret, expiresIn });
	}

	private async getUserData(token: string): Promise<User> {
		const data: TokenPayload = await this.jwtService.verifyAsync(token);
    const user = new User();

    user._id = data.id;
    user.name = data.name;
    user.email = data.email;
    user.created_at = data.created_at;
    user.updated_at = data.updated_at;

    return user;
	}

}