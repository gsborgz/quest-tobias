import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PasswordResetDTO, SigninDTO, SigninResultDTO, SignupDTO, UpdatePasswordDTO } from '@entities/user/user.type';
import { User } from '@entities/user/user.entity';
import { session } from '@core/session';
import { Token } from '@entities/token/token.entity';
import { TokenService } from '@modules/auth/token/token.service';
import { ObjectId } from 'mongodb';
import { BaseMessage } from '@core/type';
import { EmailService } from '@core/email/email.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly dataSource: DataSource,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService
  ) {}

  public getMe(): Promise<User> {
    return this.dataSource.getRepository(User).findOneOrFail({
      select: ['_id', 'name', 'email', 'credits'],
      where: { _id: new ObjectId(session.getUser()._id) }
    });
  }

  public async signin(body: SigninDTO): Promise<SigninResultDTO> {
    const user = await this.findUserByEmail(body.email);
    const result = new SigninResultDTO();

    await this.comparePassword(body, user);

    const token = await this.tokenService.create(user, body.expires_in);

    result.token = token;

    return result;
  }

  public async signup(body: SignupDTO): Promise<SigninResultDTO> {
    const signinBody = { email: body.email, password: body.password, expires_in: body.expires_in };
    const user = new User();

    await this.checkIfUserDoesNotExist(body.email);

    this.checkIfPasswordsMatch(body);

    body.password = await this.encryptPassword(body.password);

    user.name = body.name;
    user.email = body.email;
    user.password = body.password;
    user.credits = 0;

    await this.dataSource.getRepository(User).save(user);

    return this.signin(signinBody);
  }

  public async requestPasswordReset({ email }: PasswordResetDTO): Promise<BaseMessage> {
		const user = await this.dataSource.getRepository(User).findOneByOrFail({ email });
		const token = await this.tokenService.create(user, 600);
		const base64Token = Buffer.from(token).toString('base64');

		await this.emailService.sendEmail({
			to: [email],
			template: 'reset_password',
			locals: {
				name: user.name,
				link: `http://localhost:8080/auth/change_password?token=${base64Token}`
			}
		});

		return {
			message: 'Email sent'
		};
	}

  public async updatePassword(id: string, body: UpdatePasswordDTO): Promise<BaseMessage> {
		this.checkIfPasswordsMatch(body);

    const { password } = body;
		const user = await this.dataSource.getRepository(User).findOneByOrFail({ _id: new ObjectId(id) });

		user.password = await this.encryptPassword(password);

		await this.dataSource.getRepository(User).save(user);

		return { message: 'Password updated' };
	}

	public signout(token: string): Promise<DeleteResult> {
		return this.dataSource.getRepository(Token).delete(token);
	}

  private async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async comparePassword(body: SigninDTO, user: User): Promise<void> {
    const samePassword = await bcrypt.compare(body.password, user.password);

    if (!samePassword) {
      throw new BadRequestException('User not found');
    }
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.dataSource.getRepository(User).findOneByOrFail({ email });

    return user;
  }

  private checkIfPasswordsMatch(body: SignupDTO | UpdatePasswordDTO): void {
    if (body.password !== body.password_confirmation) {
      throw new BadRequestException('Passwords do not match');
    }
  }

  private async checkIfUserDoesNotExist(email: string): Promise<void> {
    const user = await this.dataSource.getRepository(User).findOneBy({ email } );

    if (user) {
      throw new BadRequestException('User already exists');
    }
  }

}
