import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("JWT-SECRET-key"),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        return {
            userID: payload.sub,
            mobile: payload.mobile,
            display_name: payload.display_name,
        };
    }
}   