import { AuthService } from '@modules/auth/auth.service';
import { ResetPasswordDTO, PasswordResetRequestDTO, SigninDTO, SigninResultDTO, SignupDTO, UpdatePasswordDTO, UserLanguage, UserTheme, UpdateProfileDTO } from '@entities/user/user.type';
import { BaseMessage } from '@core/type';
import { User } from '@entities/user/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    me(): Promise<User>;
    signin(body: SigninDTO): Promise<SigninResultDTO>;
    signup(body: SignupDTO): Promise<SigninResultDTO>;
    requestPasswordReset(body: PasswordResetRequestDTO): Promise<BaseMessage>;
    updateProfile(body: UpdateProfileDTO): Promise<BaseMessage>;
    resetPassword(body: ResetPasswordDTO): Promise<BaseMessage>;
    updatePassword(body: UpdatePasswordDTO): Promise<BaseMessage>;
    setLanguage(language: UserLanguage): Promise<BaseMessage>;
    setTheme(theme: UserTheme): Promise<BaseMessage>;
    signout(): Promise<BaseMessage>;
    deleteAccount(): Promise<BaseMessage>;
}
