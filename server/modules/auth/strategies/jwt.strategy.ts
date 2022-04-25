import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'server/modules/user/user.service';
import { User } from '../../user/user.entity';
import { Request } from "express";

export interface RequestWithCookie extends Request {
	cookies: {
		token: string
	};
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
		super({
			jwtFromRequest:

				ExtractJwt.fromExtractors([
					ExtractJwt.fromAuthHeaderAsBearerToken(),
					(request: RequestWithCookie) => {
						return request?.cookies?.token;
					},
				]),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate({ email }: Pick<User, 'email'>) {
		console.log('try to validate')
		return await this.userService.getUserByEmail(email);
	}
}
