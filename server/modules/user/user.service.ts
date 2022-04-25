import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import { CreateUserDto } from './dto/createUser.dto';
import { RECORD_ALREADY_EXIST, RECORD_NOT_FOUND } from 'server/constants';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USER_NOT_FOUND } from './user.constants';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    findById(id: number) {
        const user = this.userRepository.findOne({ where: { id }, relations: ['roles'] });
        if (user) {
            return user;
        }
        throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    findAll() {
        return this.userRepository.find();
    }

    getUserByEmail(email: string): Promise<User> {
        const user = this.userRepository.findOne({ where: { email }, relations: ['roles'] });
        if (user) {
            return user;
        }
        throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    async create(dto: CreateUserDto) {
        const candidate = await this.getUserByEmail(dto.email);
        if (candidate) throw new UnauthorizedException(RECORD_ALREADY_EXIST);
        const salt = await genSalt(10);
        dto.password = await hash(dto.password, salt);
        const newUser = await this.userRepository.create(dto);
        return this.userRepository.save(newUser);
    }

    async update(dto: User) {
        await this.userRepository.update(dto.id, dto);
        const updatedRecord = await this.userRepository.findOne(dto.id);
        if (updatedRecord) {
            return updatedRecord;
        }
        throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    async delete(id: number) {
        const deleteResponse = await this.userRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }
}
