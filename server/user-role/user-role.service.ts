import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { RECORD_NOT_FOUND } from 'server/constants';
import { UserRoleModel } from '../models/user-role.model';
import { UserRoleDto } from './dto/user-role.dto';

@Injectable()
export class UserRoleService {
	constructor(@InjectModel(UserRoleModel) private readonly userRepository: typeof UserRoleModel) { }

	findById(id: number) {
		return this.userRepository.findByPk(id, { include: { all: true } });
	}

	findAll() {
		return this.userRepository.sequelize.query(`select UR.id,R.name as "userName", concat(U."lastName",' ',U."firstName") as "roleName" from "UserRole" UR
		left join "Role" R on R.id = UR."roleId"
		left join "User" U on U.id = UR."userId"`, { type: sequelize.QueryTypes.SELECT })
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
			if (!instance) throw new BadRequestException(RECORD_NOT_FOUND)
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
