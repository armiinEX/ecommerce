import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import userRoleEnum from "../enums/userRoleEnum";

export class CreateUserDto {
    @IsString()
    // @Length(11, 11, { message: "The mobile number must be 11 digits" })
    @IsNotEmpty({ message: "The mobile number is required" })
    @Matches(/^\d{11}$/, { message: "The mobile number must be exactly 11 digits" })
    // @Transform(({value}) => value.replace(/[^0-9]/g, "")) // Remove non-numeric characters
    @Transform(({ value }) => value?.replace(/\D/g, '').trim())
    mobile: string;

    @IsString()
    @IsNotEmpty({ message: "The display name is required" })
    display_name: string;

    @IsString()
    @IsOptional()
    @MinLength(8, { message: "The password must be at least 8 characters long" })
    @MaxLength(20, { message: "The password must be less than 20 characters" })
    password: string;

    @IsEnum(userRoleEnum, { message: "The role must be one of the values ​​(admin, user)" })
    @IsOptional()
    role: userRoleEnum = userRoleEnum.normalUser; // default value is user
}
