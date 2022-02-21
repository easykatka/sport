import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleModel } from './role.model';

@Injectable()
export class RoleService {
	constructor(@InjectModel(RoleModel) private readonly roleModel: typeof RoleModel) { }

	async createRole(CreateRoleDto) {
		return await this.roleModel.create(CreateRoleDto);
	}

	async getRoleByName(name: string) {
		return await this.roleModel.findOne({ where: { name } })
	}
}
