export declare enum UserLanguage {
    EN = "en",
    PTBR = "pt-br"
}
export declare enum UserTheme {
    LIGHT = "light",
    DARK = "dark"
}
export declare class SigninDTO {
    email: string;
    password: string;
    expires_in: number;
}
export declare class SignupDTO {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    expires_in: number;
    language: UserLanguage;
    theme: UserTheme;
}
export declare class PasswordResetDTO {
    email: string;
}
export declare class SigninResultDTO {
    token: string;
    constructor(token: string);
}
export declare class UpdatePasswordDTO {
    password: string;
    password_confirmation: string;
}
