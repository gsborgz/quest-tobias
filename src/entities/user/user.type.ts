export class SigninDTO {

  public email: string;
  public password: string;
  public expires_in: number;

}

export class SigninResultDTO {

  public token: string;

}

export class SignupDTO {

  public name: string;
  public email: string;
  public password: string;
  public password_confirmation: string;

}

export class PasswordResetDTO {

  public email: string;

}