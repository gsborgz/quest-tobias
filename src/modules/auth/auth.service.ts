import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PasswordResetDTO, SigninDTO, SigninResultDTO, SignupDTO, UpdatePasswordDTO, UserLanguage, UserTheme } from '@entities/user/user.type';
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
      select: {
        _id: true,
        name: true,
        email: true,
        language: true,
        theme: true,
        credits: true
      },
      where: { _id: new ObjectId(session.getUser()._id) }
    });
  }

  public async signin(body: SigninDTO): Promise<SigninResultDTO> {
    const user = await this.findUserByEmail(body.email);

    await this.comparePassword(body, user);
    await this.checkIfTokenExists(user);
    
    const token = await this.tokenService.create(user, body.expires_in || 64000);

    return new SigninResultDTO(token);
  }

  public async signup(body: SignupDTO): Promise<SigninResultDTO> {
    const { name, email, password, expires_in, language, theme } = body;
    const signinBody = { email, password, expires_in };
    const user = new User();

    await this.checkIfUserDoesNotExist(body.email);

    this.checkIfPasswordsMatch(body);

    user.name = name;
    user.email = email;
    user.password = await this.encryptPassword(password);
    user.language = language;
    user.theme = theme;
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

		return new BaseMessage('text.email_sent');
	}

  public async updatePassword(id: string, body: UpdatePasswordDTO): Promise<BaseMessage> {
		this.checkIfPasswordsMatch(body);

    const { password } = body;
		const user = await this.dataSource.getRepository(User).findOneByOrFail({ _id: new ObjectId(id) });

		user.password = await this.encryptPassword(password);

		await this.dataSource.getRepository(User).save(user);

		return new BaseMessage('text.password_updated');
	}

  public async setLanguage(language: UserLanguage): Promise<BaseMessage> {
    const user = session.getUser();

    if (!Object.values(UserLanguage).includes(language)) {
      throw new BadRequestException('text.invalid_language');
    }

    await this.dataSource.getRepository(User).update(user._id, { language: language });

    return new BaseMessage('text.language_updated');
  }

  public async setTheme(theme: UserTheme): Promise<BaseMessage> {
    const user = session.getUser();

    if (!Object.values(UserTheme).includes(theme)) {
      throw new BadRequestException('text.invalid_theme');
    }

    await this.dataSource.getRepository(User).update(user._id, { theme: theme });

    return new BaseMessage('text.theme_updated');
  }

	public async signout(): Promise<BaseMessage> {
		await this.dataSource.getRepository(Token).delete({
      user_id: new ObjectId(session.getUser()._id)
    });

    return new BaseMessage('text.signed_out');
	}

  public async deleteAccount(): Promise<BaseMessage> {
		const deleteUser = this.dataSource.getRepository(User).delete({
      _id: new ObjectId(session.getUser()._id)
    });
    const deleteSession = this.dataSource.getRepository(Token).delete({
      user_id: new ObjectId(session.getUser()._id)
    });

    await Promise.all([
      deleteUser,
      deleteSession
    ]);

    return new BaseMessage('text.account_deleted');
	}

  private async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async comparePassword(body: SigninDTO, user: User): Promise<void> {
    const samePassword = await bcrypt.compare(body.password, user.password);

    if (!samePassword) {
      throw new BadRequestException('text.user_not_found');
    }
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.dataSource.getRepository(User).findOneBy({ email });

    if (!user) {
      throw new BadRequestException('text.user_not_found');
    }

    return user;
  }

  private checkIfPasswordsMatch(body: SignupDTO | UpdatePasswordDTO): void {
    if (body.password !== body.password_confirmation) {
      throw new BadRequestException('text.passwords_do_not_match');
    }
  }

  private async checkIfUserDoesNotExist(email: string): Promise<void> {
    const user = await this.dataSource.getRepository(User).findOneBy({ email } );

    if (user) {
      throw new BadRequestException('text.user_already_exists');
    }
  }

  private async checkIfTokenExists(user: User): Promise<void> {
    const userToken = await this.dataSource.getRepository(Token).findOneBy({ user_id: new ObjectId(user._id) });
    
    if (userToken) {
      await this.dataSource.getRepository(Token).delete(userToken._id);
    }
  }

}
