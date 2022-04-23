import { Injectable, BadRequestException, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import { UserCreateDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { RECORD_ALREADY_EXIST, RECORD_NOT_FOUND } from 'server/constants';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    findById(id: number) {
        return this.userRepository.findOne(id);
    }

    findAll() {
        return this.userRepository.find();
    }

    getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(dto: UserCreateDto) {
        const candidate = await this.getUserByEmail(dto.email);
        if (candidate) throw new UnauthorizedException(RECORD_ALREADY_EXIST);
        const salt = await genSalt(10);
        dto.password = await hash(dto.password, salt);
        const newUser = await this.userRepository.create(dto);
        return this.userRepository.save(newUser);
    }

    async update(dto: UserDto) {
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
