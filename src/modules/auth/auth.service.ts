import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SigninDTO, SignupDTO } from '@entities/user/user.type';
import { User } from '@entities/user/user.entity';
import { session } from '@core/session';
import { Token } from '@entities/token/token.entity';
import { TokenService } from '@modules/auth/token/token.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly dataSource: DataSource,
    private readonly tokenService: TokenService
  ) {}

  public async getMe() {
    return session.getUser();
  }

  public async signin(body: SigninDTO): Promise<string> {
    const user = await this.findUserByEmail(body.email);

    await this.comparePassword(body, user);

		return this.tokenService.create(user, body.expires_in);
  }

  public async signup(body: SignupDTO) {
    await this.checkIfUserDoesNotExist(body.email);

    this.checkIfPasswordsMatch(body);

    await this.encryptPassword(body);

    return this.dataSource.getRepository(User).save(body);
  }

  // public async requestPasswordReset({ email }: PasswordResetDTO): Promise<void> {
	// 	const user = await this.mysqlRepository.findOneOrFail(User, { email });
	// 	const token = await this.tokenService.create(user, 600);
	// 	const base64Token = this.base64Helper.encode(token);
	// 	const base64Id = this.base64Helper.encode(user.id);

	// 	await this.emailService.sendEmail({
	// 		to: [email],
	// 		template: 'reset_password',
	// 		locals: {
	// 			name: user.name,
	// 			link: `http://localhost:8080/auth/change_password?token=${base64Token}&id=${base64Id}`
	// 		}
	// 	});

	// 	return {
	// 		message: Dictionary.auth.getMessage('reset_password_email_sent')
	// 	};
	// }

	public logout(token: string): Promise<DeleteResult> {
		return this.dataSource.getRepository(Token).delete(token);
	}

  private async encryptPassword(body: SignupDTO): Promise<void> {
    const hash = await bcrypt.hash(body.password, 10);

    body.password = hash;
  }

  private async comparePassword(body: SigninDTO, user: User): Promise<void> {
    const samePassword = await bcrypt.compare(body.password, user.password);

    if (!samePassword) {
      throw new BadRequestException('User not found');
    }
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.dataSource.getRepository(User).findOneBy({ email });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  private checkIfPasswordsMatch(body: SignupDTO): void {
    if (body.password !== body.password_confirmation) {
      throw new BadRequestException('Passwords do not match');
    }
  }

  private async checkIfUserDoesNotExist(email: string): Promise<void> {
    const user = await this.dataSource.getRepository(User).findOneBy({ email });

    if (user) {
      throw new BadRequestException('User already exists');
    }
  }

}
