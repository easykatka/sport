import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { genSalt, hash } from 'bcryptjs';
import { RegistrationDto } from '../auth/dto/registration.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly userRepository: typeof UserModel) {}

    async findById(id: number) {
        return this.userRepository.findByPk(id, { include: { all: true } });;
    }

    findAll() {
        return this.userRepository.findAll();
    }

    async update(id: number, dto) {
        const instance = await this.findById(id);
        if (id) {
            return instance.update(dto);
        }
    }

    getAllUsers() {
        return this.userRepository.findAll({ include: { all: true } });
    }

    getUserByEmail(email: string) {
        return this.userRepository.findOne({ where: { email }, include: { all: true } });
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
