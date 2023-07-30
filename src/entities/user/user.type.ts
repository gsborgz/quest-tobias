import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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

}

export class PasswordResetDTO {

  @IsNotEmpty()
  @IsString()
  public email: string;

}

export class SigninResultDTO {

  public token: string;

}

export class UpdatePasswordDTO {

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public password_confirmation: string;

}