import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel) private readonly userModel: typeof UserModel,
        private readonly roleService: RoleService
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userModel.create(dto);
        const defaultRole = await this.roleService.getRoleByName('USER');
        await user.$set('roles', [defaultRole.id]);
        return user;
    }

    async getAllUsers() {
        return this.userModel.findAll({ include: ['roles'] });
    }
}
