import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRoleModel } from '../models/user-role.model';
import { UserRoleDto } from './dto/user-role.dto';
import { RECORD_NOT_FOUNDED } from './user-role.constants';

@Injectable()
export class UserRoleService {
	constructor(@InjectModel(UserRoleModel) private readonly userRepository: typeof UserRoleModel) { }

	findById(id: number) {
		return this.userRepository.findByPk(id, { include: { all: true } });
	}

	findAll() {
		return this.userRepository.findAll({ include: { all: true } });
	}

	async create(dto: UserRoleDto) {
		try {
			const record = new this.userRepository(dto);
			return record.save();
		}
		catch (e: any) {
			throw new BadRequestException(e?.errors.map(i => i.message).join(', ') || 'Bad request');
		}
	}

	async update(dto: UserRoleDto) {
		try {
			const instance = await this.userRepository.findByPk(dto.id);
			if (!instance) throw new BadRequestException(RECORD_NOT_FOUNDED)
			return await instance.update(dto)
		}
		catch (e: any) {
			throw new BadRequestException(e?.errors.map(i => i.message).join(', ') || 'Bad request');
		}
	}

	async delete(id: string) {
		const instance = await this.userRepository.findByPk(id);
		if (!instance) throw new BadRequestException(RECORD_NOT_FOUNDED)
		return await instance.destroy();
	}

}
