import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly userRepository: typeof UserModel) {}

    async getAllUsers() {
        return this.userRepository.findAll({ include: { all: true } });
    }

    async getUserByLogin(login: string) {
        console.log('132')
        return this.userRepository.findOne({ where: { login }, include: { all: true } });
    }

    async createUser(dto: CreateUserDto) {
        const salt = await genSalt(10);
        const newUser = new this.userRepository({
            login: dto.login,
            password: await hash(dto.password, salt),
        });
        return newUser.save();
    }
}
