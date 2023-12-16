import { Body, Controller, Get, Post, Delete, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { ResetPasswordDTO, PasswordResetRequestDTO, SigninDTO, SigninResultDTO, SignupDTO, UpdatePasswordDTO, UserLanguage, UserTheme, UpdateProfileDTO } from '@entities/user/user.type';
import { AuthProtection } from '@core/decorators/auth-protection.decorator';
import { BaseMessage } from '@core/type';
import { User } from '@entities/user/user.entity';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Get('me')
  @AuthProtection()
  public me(): Promise<User> {
    return this.authService.getMe();
  }

  @Post('signin')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  public signin(@Body() body: SigninDTO): Promise<SigninResultDTO> {
    return this.authService.signin(body);
  }

  @Post('signup')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  public signup(@Body() body: SignupDTO): Promise<SigninResultDTO> {
    return this.authService.signup(body);
  }

  @Post('request-password-reset')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  public async requestPasswordReset(@Body() body: PasswordResetRequestDTO): Promise<BaseMessage> {
    return this.authService.requestPasswordReset(body);
  }

  @Put('update-profile')
  @AuthProtection()
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  public updateProfile(@Body() body: UpdateProfileDTO): Promise<BaseMessage> {
    return this.authService.updateProfile(body);
  }

  @Put('reset-password')
  @AuthProtection()
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  public resetPassword(@Body() body: ResetPasswordDTO): Promise<BaseMessage> {
    return this.authService.resetPassword(body);
  }

  @Put('update-password')
  @AuthProtection()
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  public updatePassword(@Body() body: UpdatePasswordDTO): Promise<BaseMessage> {
    return this.authService.updatePassword(body);
  }

  @Put('set-language/:language')
  @AuthProtection()
  public setLanguage(@Param('language') language: UserLanguage): Promise<BaseMessage> {
    return this.authService.setLanguage(language);
  }

  @Put('set-theme/:theme')
  @AuthProtection()
  public setTheme(@Param('theme') theme: UserTheme): Promise<BaseMessage> {
    return this.authService.setTheme(theme);
  }

  @Delete('signout')
  @AuthProtection()
  public async signout(): Promise<BaseMessage> {
    return this.authService.signout();
  }

  @Delete('delete-account')
  @AuthProtection()
  public async deleteAccount(): Promise<BaseMessage> {
    return this.authService.deleteAccount();
  }

}
