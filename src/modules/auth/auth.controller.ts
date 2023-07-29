import { Body, Controller, Get, Post, Delete, Headers } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { PasswordResetDTO, SigninDTO, SignupDTO } from '@entities/user/user.type';
import { AuthProtection } from '@core/decorators/auth-protection.decorator';
import { DeleteResult } from 'typeorm';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @AuthProtection()
  public me() {
    return this.authService.getMe();
  }

  @Post('/signin')
  public signin(@Body() body: SigninDTO) {
    return this.authService.signin(body);
  }

  @Post('/signup')
  public signup(@Body() body: SignupDTO) {
    return this.authService.signup(body);
  }

  // @Post('request-password-reset')
	// public async requestPasswordReset(@Body() body: PasswordResetDTO): Promise<BaseMessage> {
	// 	return this.authService.requestPasswordReset(body);
	// }

  @Delete('/logout')
	@AuthProtection()
	public async logout(@Headers('Authorization') token: string): Promise<DeleteResult> {
		return this.authService.logout(token);
	}

}
