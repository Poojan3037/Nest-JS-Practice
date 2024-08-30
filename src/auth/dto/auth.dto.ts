import { IsEmail, IsEmpty, IsNotEmpty, Length } from "class-validator";

export class RegisterUserDto {
    @IsEmail()
    email: string;

    @Length(6, 10)
    password: string;
}

export class LoginUserDto {
    @IsNotEmpty({ message: "Please send email." })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "Please send password." })
    @Length(6, 10)
    password: string;
}