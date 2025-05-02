import { IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";
import { Transform } from "class-transformer";


export class RegisterDto {
    @IsString()
    @Length(11, 11, { message: "The mobile number must be 11 digits" })
    @IsNotEmpty({ message: "The mobile number is required" })
    @Transform(({ value }) => value?.replace(/\D/g, '').trim())
    mobile: string;

    @IsString()
    @MinLength(8, { message: "The password must be at least 8 characters long" })
    @MaxLength(20, { message: "The password must be less than 20 characters" })
    @IsNotEmpty({ message: "The password is required" })
    password: string;

    @IsString()
    @IsNotEmpty({ message: "The display name is required" })
    display_name: string;
}
