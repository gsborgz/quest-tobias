import { DataSource } from 'typeorm';
import { ResetPasswordDTO, PasswordResetRequestDTO, SigninDTO, SigninResultDTO, SignupDTO, UpdatePasswordDTO, UserLanguage, UserTheme, UpdateProfileDTO } from '@entities/user/user.type';
import { User } from '@entities/user/user.entity';
import { TokenService } from '@modules/auth/token/token.service';
import { BaseMessage } from '@core/type';
import { EmailService } from '@core/email/email.service';
export declare class AuthService {
    private readonly dataSource;
    private readonly tokenService;
    private readonly emailService;
    constructor(dataSource: DataSource, tokenService: TokenService, emailService: EmailService);
    getMe(): Promise<User>;
    signin(body: SigninDTO): Promise<SigninResultDTO>;
    signup(body: SignupDTO): Promise<SigninResultDTO>;
    requestPasswordReset({ email }: PasswordResetRequestDTO): Promise<BaseMessage>;
    updateProfile(body: UpdateProfileDTO): Promise<BaseMessage>;
    resetPassword(body: ResetPasswordDTO): Promise<BaseMessage>;
    updatePassword(body: UpdatePasswordDTO): Promise<BaseMessage>;
    setLanguage(language: UserLanguage): Promise<BaseMessage>;
    setTheme(theme: UserTheme): Promise<BaseMessage>;
    signout(): Promise<BaseMessage>;
    deleteAccount(): Promise<BaseMessage>;
    private encryptPassword;
    private comparePassword;
    private findUserByEmail;
    private checkIfPasswordsMatch;
    private checkIfUserDoesNotExist;
    private checkIfTokenExists;
}
