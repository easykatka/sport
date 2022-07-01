import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { WRONG_USER_DATA_ERROR } from '../user/user.constants';
import { LoginDto } from '../../../shared/dto/login.dto';
import { RegistrationDto } from 'shared/dto/registration.dto';
import { MFile } from '../file/mfile.class';

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private readonly jwtService: JwtService) { }

	async registration(dto: RegistrationDto, photo: MFile) {
        console.log("🚀 ~ file: auth.service.ts ~ line 16 ~ AuthService ~ registration ~ photo", photo)
		const user = await this.userService.create(dto, photo);
		const token = this.generateToken(user);
		return { user, token };
	}

	async login(dto: LoginDto) {
		const user = await this.validateUser(dto);
		const token = this.generateToken(user);
		return { user, token };
	}

	private generateToken({ email }: Pick<User, 'email'>) {
		try {
			return this.jwtService.sign({ email });
		} catch (e) {
			console.log(e);
		}
	}

	private async validateUser(dto: LoginDto): Promise<User> {
		const user = await this.userService.getUserByEmail(dto.email);
		if (!user) {
			throw new UnauthorizedException(WRONG_USER_DATA_ERROR);
		}
		const isCorrectPassword = await compare(dto.password, user.password);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_USER_DATA_ERROR);
		}
		return user;
	}
}
