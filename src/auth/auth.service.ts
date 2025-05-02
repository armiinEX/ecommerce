import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import userRoleEnum from "src/users/enums/userRoleEnum";


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register(mobile: string, password: string, display_name: string) {
        const hashedPassword: string = await bcrypt.hash(password, 10);
        return this.usersService.create({
            mobile,
            password: hashedPassword,
            display_name,
            role: userRoleEnum.normalUser
        });
    }
    

    async login(mobile: string, password: string) {
        const user = await this.usersService.findByMobile(mobile);
    
        if (!user) {
            throw new UnauthorizedException("User not found");
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException("Invalid password");
        }
    
        const payload = {
            mobile: user.mobile,
            sub: user.id,
            display_name: user.display_name,
        };
        const token = this.jwtService.sign(payload);
    
        return { accessToken: token };
    }
    
}
