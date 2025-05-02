import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import userRoleEnum from "../enums/userRoleEnum";


export class UpdateUserDto {
    @IsString()
    @IsNotEmpty({ message: "The display name is required" })
    display_name: string;

    @IsEnum(userRoleEnum, { message: "The role must be one of the values ​​(admin, user)" })
    @IsOptional()
    role: userRoleEnum = userRoleEnum.normalUser; // default value is user
}
