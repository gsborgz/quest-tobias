import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum UserLanguage {
  EN = 'en',
  PTBR = 'pt-br'
}

export enum UserTheme {
  LIGHT = 'light',
  DARK = 'dark'
}

export class SigninDTO {

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsNumber()
  public expires_in: number;

}

export class SignupDTO {

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public password_confirmation: string;

  @IsNotEmpty()
  @IsNumber()
  public expires_in: number;

  @IsNotEmpty()
  @IsEnum(UserLanguage)
  public language: UserLanguage;

  @IsNotEmpty()
  @IsEnum(UserTheme)
  public theme: UserTheme;

}

export class PasswordResetRequestDTO {

  @IsNotEmpty()
  @IsString()
  public email: string;

}

export class UpdateProfileDTO {

  @IsNotEmpty()
  @IsString()
  public avatar: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

}

export class ResetPasswordDTO {

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public password_confirmation: string;

}

export class UpdatePasswordDTO {

  @IsNotEmpty()
  @IsString()
  public current_password: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public password_confirmation: string;

}

export class SigninResultDTO {

  public token: string;

  constructor(token: string) {
    this.token = token;
  }

}
