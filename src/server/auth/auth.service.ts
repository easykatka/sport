import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { compare } from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { UserService } from '../user/user.service';
import { USER_ALREADY_REGISTERED_ERROR, USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { AuthDto } from './dto/auth.tdo';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(login: string, password: string): Promise<Pick<UserModel, 'login'>> {
        const user = await this.userService.getUserByLogin(login);
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
        }
        const isCorrectPassword = await compare(password, user.password);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
        }
        return { login: user.login };
    }

    async login(dto: AuthDto) {
        const { login } = await this.validateUser(dto.login, dto.password);
        return {
            access_token: await this.jwtService.signAsync(login),
        };
    }

    async registration(dto: AuthDto) {
        const candidate = await this.userService.getUserByLogin(dto.login);
        if (candidate) {
            throw new HttpException(USER_ALREADY_REGISTERED_ERROR,401);
        }
        const user = await this.userService.createUser(dto);
        return this.generateToken(user);
    }

    generateToken({ login, id, roles }: UserModel) {
        const payload = { login, id, roles };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
