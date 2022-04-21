import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'server/user/user.service';
import { NO_TOKEN, USER_NOT_FOUND } from '../auth.constants';
import { User } from '../../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate({ email }: Pick<User, 'email'>) {
		try {
			if (!email) throw new Error(NO_TOKEN);
			const user = await this.userService.getUserByEmail(email);
			if (!user) {
				throw new UnauthorizedException(USER_NOT_FOUND);
			}
			return { id: user.id };
		} catch (e) {
			console.log(e);
		}
	}
}
