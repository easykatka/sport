import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from '../models/role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDto } from './dto/role.dto';
import { ALREADY_REGISTERED_ERROR, ROLE_NOT_FOUNDED } from './role.constants';

@Injectable()
export class RoleService {
	constructor(@InjectModel(RoleModel) private readonly roleModel: typeof RoleModel) { }

	async getRoleByName(name: string) {
		return await this.roleModel.findOne({ where: { name } });
	}

	async getAll() {
		return await this.roleModel.findAll();
	}

	findById(id: number) {
		return this.roleModel.findByPk(id)
	}


	async create(dto: CreateRoleDto) {
		try {
			const oldRole = await this.getRoleByName(dto.name);
			if (oldRole) throw new BadRequestException(ALREADY_REGISTERED_ERROR);
			return await this.roleModel.create(dto);
		} catch (e: any) {
			throw new BadRequestException(e?.errors.map(i => i.message).join(', ') || 'Bad request');
		}
	}

	async update(dto: RoleDto) {
		try {
			const instance = await this.roleModel.findByPk(dto.id);
			if (!instance) throw new BadRequestException(ROLE_NOT_FOUNDED);
			return await instance.update(dto);
		}
		catch (e: any) {
			throw new BadRequestException(e?.errors.map(i => i.message).join(', ') || 'Bad request');
		}
	}

	async delete(id: string) {
		const instance = await this.roleModel.findByPk(id);
		if (!instance) throw new BadRequestException(ROLE_NOT_FOUNDED);
		return await instance.destroy();
	}
}
