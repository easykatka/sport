import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { genSalt, hash } from 'bcryptjs';
import { RegistrationDto } from '../auth/dto/registration.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly userRepository: typeof UserModel) {}

    async getAllUsers() {
        return this.userRepository.findAll({ include: { all: true } });
    }

    async getUserByLogin(login: string) {
        return this.userRepository.findOne({ where: { login }, include: { all: true } });
    }

    async createUser(dto: RegistrationDto) {
        const salt = await genSalt(10);
        const newUser = new this.userRepository({
            ...dto,
            password: await hash(dto.password, salt),
        });
        return newUser.save();
    }
}
