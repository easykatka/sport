import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { RoleModel } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
    constructor(@InjectModel(RoleModel) private readonly roleModel: typeof RoleModel) {}

    async createRole(dto:CreateRoleDto) {
        return await this.roleModel.create(dto);
    }

    async getRoleByName(name: string) {
        return await this.roleModel.findOne({ where: { name } });
    }
}
