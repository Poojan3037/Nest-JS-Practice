import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class AddProfileDto {
    @IsNotEmpty({ message: "Please send first name." })
    firstName: string;

    @IsNotEmpty({ message: "Please send last name." })
    lastName: string;

    @IsNotEmpty({ message: "Please send phone number." })
    @IsPhoneNumber("IN", { message: "Please send valid phone number." })
    phoneNumber: string
}


export class UpdateProfileDto {
    @IsNotEmpty({ message: "Please send first name." })
    firstName: string;

    @IsNotEmpty({ message: "Please send last name." })
    lastName: string;

    @IsNotEmpty({ message: "Please send phone number." })
    @IsPhoneNumber("IN", { message: "Please send valid phone number." })
    phoneNumber: string

    @IsNotEmpty({ message: "Please send email." })
    @IsEmail()
    email: string;
}