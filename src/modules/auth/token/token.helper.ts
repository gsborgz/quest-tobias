import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@entities/user/user.entity';
import { TokenPayload } from '@entities/token/token.type';

@Injectable()
export class TokenHelper {

	constructor(private readonly jwtService: JwtService) {}

	public generateToken(user: User, expiresIn: number): Promise<string> {
		const { id, name, email, created_at } = user;
    const secret = process.env.JWT_KEY;
		const payload = { id, name, email, created_at };

		return this.jwtService.signAsync(payload, { secret, expiresIn });
	}

	public async getUserData(token: string): Promise<User> {
		const data: TokenPayload = await this.jwtService.verifyAsync(token);
    const user = new User();

    user.id = data.id;
    user.name = data.name;
    user.email = data.email;
    user.created_at = data.created_at;
    user.updated_at = data.updated_at;

    return user;
	}

}