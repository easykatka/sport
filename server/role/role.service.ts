import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from '../models/role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { ALREADY_REGISTERED_ERROR } from './role.constants';

@Injectable()
export class RoleService {
    constructor(@InjectModel(RoleModel) private readonly roleModel: typeof RoleModel) {}

    async createRole(dto: CreateRoleDto) {
        const oldRole = await this.getRoleByName(dto.name);
        if (oldRole) {
            throw new BadRequestException(ALREADY_REGISTERED_ERROR);
        }
        return await this.roleModel.create(dto);
    }

    async getRoleByName(name: string) {
        return await this.roleModel.findOne({ where: { name } });
    }
}
