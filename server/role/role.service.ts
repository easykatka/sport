import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { RECORD_NOT_FOUND } from 'server/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private readonly roleModel: Repository<Role>) {}

    async getRoleByName(name: string) {
        return await this.roleModel.findOne({ where: { name } });
    }

    async getAll() {
        return await this.roleModel.find();
    }

    findById(id: number) {
        return this.roleModel.findOne(id);
    }

    async create(dto: CreateRoleDto) {
        try {
            const newRecord = await this.roleModel.create(dto);
            return this.roleModel.save(newRecord);
        } catch (e) {
            console.log(e);
        }
    }

    async update(dto: RoleDto) {
        await this.roleModel.update(dto.id, dto);
        const updatedRecord = await this.roleModel.findOne(dto.id);
        if (updatedRecord) {
            return updatedRecord;
        }
        throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    async delete(id: number) {
        const deleteResponse = await this.roleModel.delete(id);
        if (!deleteResponse.affected) {
            throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }
}
