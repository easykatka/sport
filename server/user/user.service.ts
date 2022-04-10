import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { genSalt, hash } from 'bcryptjs';
import { UserDto } from './dto/user-create.dto';
import { USER_ALREADY_REGISTERED_ERROR } from './user-constants';

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
			include: { all: true }
		});
	}

	async create(dto: UserDto) {
		try {
			const candidate = await this.getUserByEmail(dto.email);
			if (candidate) {
				throw new UnauthorizedException(USER_ALREADY_REGISTERED_ERROR);
			}
			const salt = await genSalt(10);
			const newUser = new this.userRepository({
				...dto,
				password: await hash(dto.password, salt),
			});
			return newUser.save();
		}
		catch (e: any) {
			throw new BadRequestException(e?.errors.map(i => i.message).join(', ') || 'Bad request');
		}
	}

	async update(dto: UserDto) {
		try {
			const instance = await this.userRepository.findByPk(dto.id);
			if (instance) {
				const salt = await genSalt(10);
				return await instance.update({
					...dto,
					...dto.password ? { password: await hash(dto.password, salt) } : {}
				})
			}
		}
		catch (e: any) {
			throw new BadRequestException(e?.errors.map(i => i.message).join(', ') || 'Bad request');
		}
	}

	async delete(id: string) {
		try {
			const instance = await this.userRepository.findByPk(id);
			if (instance) {
				return await instance.destroy();;
			}
		}
		catch (e: any) {
			//TODO почитать про ошибки, явно не так должно быть
			throw new BadRequestException(e?.errors.map(i => i.message).join(', ') || 'Bad request');
		}
	}
}
