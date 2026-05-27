import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { appconfig } from 'src/utils/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req?.cookies?.access_token ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: appconfig.auth.jwtSecret
        });
    }

    async validate(payload: any) {
        return { id: payload.id, email: payload.email };
    }
}