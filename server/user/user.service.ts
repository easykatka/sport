import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { genSalt, hash } from 'bcryptjs';
import { UserCreateDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { RECORD_ALREADY_EXIST, RECORD_NOT_FOUND } from 'server/constants';

const userResponseFields = ['id', 'firstName', 'lastName', 'avatar', 'telegram', 'email', 'middleName']
@Injectable()
export class UserService {
	constructor(@InjectModel(UserModel) private readonly userRepository: typeof UserModel) { }

	findById(id: number) {
		return this.userRepository.findByPk(id, { include: { all: true }, attributes: userResponseFields });
	}

	findAll() {
		return this.userRepository.findAll({ include: { all: true }, attributes: userResponseFields });
	}

	getUserByEmail(email: string) {
		return this.userRepository.findOne({ where: { email }, include: { all: true } });
	}

	async create(dto: UserCreateDto) {
		try {
			const candidate = await this.getUserByEmail(dto.email);
			if (candidate) throw new UnauthorizedException(RECORD_ALREADY_EXIST);
			const salt = await genSalt(10);
			dto.password = await hash(dto.password, salt);
			const newUser = new this.userRepository(dto);
			return newUser.save();
		}
		catch (e: any) {
			throw new BadRequestException(e?.errors.map(i => i.message).join(', ') || 'Bad request');
		}
	}

	async update(dto: UserDto) {
		try {
			const instance = await this.userRepository.findByPk(dto.id);
			if (!instance) throw new BadRequestException(RECORD_NOT_FOUND)
			if (dto.password) {
				const salt = await genSalt(10);
				dto.password = await hash(dto.password, salt)
			}
			return await instance.update(dto)
		}
		catch (e: any) {
			throw new BadRequestException(e?.errors.map(i => i.message).join(', ') || 'Bad request');
		}
	}

	async delete(id: string) {
		const instance = await this.userRepository.findByPk(id);
		if (!instance) throw new BadRequestException(RECORD_NOT_FOUND)
		return await instance.destroy();
	}
}
