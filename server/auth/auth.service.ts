import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { UserService } from '../user/user.service';
import { USER_ALREADY_REGISTERED_ERROR, WRONG_USER_DATA_ERROR } from './auth.constants';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private readonly jwtService: JwtService) {}

    async registration(dto: RegistrationDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new UnauthorizedException(USER_ALREADY_REGISTERED_ERROR);
        }
        const user = await this.userService.createUser(dto);
        return this.generateToken(user);
    }

    async login(dto: LoginDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }

    private generateToken({ email }: Pick<UserModel, 'email'>) {
        try {
            const token = this.jwtService.sign({ email });
            return token;
        } catch (e) {
            console.log(e);
        }
    }

    private async validateUser(dto: LoginDto): Promise<UserModel> {
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
