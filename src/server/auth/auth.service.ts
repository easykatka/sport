import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { UserService } from '../user/user.service';
import { USER_ALREADY_REGISTERED_ERROR, WRONG_USER_DATA_ERROR } from './auth.constants';
import { AuthDto } from './dto/auth.tdo';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private readonly jwtService: JwtService) {}

    async registration(dto: AuthDto) {
        const candidate = await this.userService.getUserByLogin(dto.login);
        if (candidate) {
            throw new UnauthorizedException(USER_ALREADY_REGISTERED_ERROR);
        }
        const user = await this.userService.createUser(dto);
        return this.generateToken(user);
    }

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }

    private generateToken({ login, id, roles }: UserModel) {
        const payload = { login, id, roles };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(dto: AuthDto): Promise<UserModel> {
        const user = await this.userService.getUserByLogin(dto.login);
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
