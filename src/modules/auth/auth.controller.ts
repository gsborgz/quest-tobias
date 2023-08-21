import { Body, Controller, Get, Post, Delete, Headers, Req } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { PasswordResetDTO, SigninDTO, SigninResultDTO, SignupDTO } from '@entities/user/user.type';
import { AuthProtection } from '@core/decorators/auth-protection.decorator';
import { DeleteResult } from 'typeorm';
import { BaseMessage } from '@core/type';
import { User } from '@entities/user/user.entity';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @AuthProtection()
  public me(@Req() req): Promise<User> {
    console.log(req.headers);
    
    return this.authService.getMe();
  }

  @Post('signin')
  public signin(@Body() body: SigninDTO): Promise<SigninResultDTO> {
    return this.authService.signin(body);
  }

  @Post('signup')
  public signup(@Body() body: SignupDTO): Promise<SigninResultDTO> {
    return this.authService.signup(body);
  }

  @Post('request-password-reset')
	public async requestPasswordReset(@Body() body: PasswordResetDTO): Promise<BaseMessage> {
		return this.authService.requestPasswordReset(body);
	}

  @Delete('signout')
	@AuthProtection()
	public async signout(@Headers('Authorization') token: string): Promise<DeleteResult> {
		return this.authService.signout(token);
	}

}
