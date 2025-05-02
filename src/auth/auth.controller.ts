import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { Response } from 'express';


@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Body() registerDTO: RegisterDto, @Res() res: Response) {
        const register = await this.authService.register(
            registerDTO.mobile,
            registerDTO.password,
            registerDTO.display_name
        );
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: register,
            message: "user registered",
          });
    }

    @Post("login")
    async login(@Body() loginDTO: LoginDto, @Res() res: Response,) {
        const login = await this.authService.login(
            loginDTO.mobile,
            loginDTO.password, 
        );
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: login,
            message: "user logged in",
          });
    }
}
