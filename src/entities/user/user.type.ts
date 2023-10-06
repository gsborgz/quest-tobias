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

export class PasswordResetDTO {

  @IsNotEmpty()
  @IsString()
  public email: string;

}

export class SigninResultDTO {

  public token: string;

  constructor(token: string) {
    this.token = token;
  }

}

export class UpdatePasswordDTO {

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public password_confirmation: string;

}
