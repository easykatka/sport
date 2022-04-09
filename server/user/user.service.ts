import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { genSalt, hash } from 'bcryptjs';
import { RegistrationDto } from '../auth/dto/registration.dto';

const userResponseFields = ['id', 'firstName', 'lastName', 'avatar', 'telegram', 'email', 'middleName']
@Injectable()
export class UserService {
	constructor(@InjectModel(UserModel) private readonly userRepository: typeof UserModel) { }

	findById(id: number) {
		return this.userRepository.findByPk(id, {
			include: { all: true },
			attributes: userResponseFields
		});
	}

	findAll() {
		return this.userRepository.findAll({
			include: { all: true },
			attributes: userResponseFields
		});
	}

	getUserByEmail(email: string) {
		return this.userRepository.findOne({
			where: { email },
			attributes: userResponseFields,
			include: { all: true }
		});
	}

	async create(@Body() dto: RegistrationDto) {
		const salt = await genSalt(10);
		const newUser = new this.userRepository({
			...dto,
			password: await hash(dto.password, salt),
		});
		return newUser.save();
	}

	async update(dto) {
		const instance = await this.findById(dto.id);
		if (dto.id) {
			return instance.update(dto);
		}
	}
}
