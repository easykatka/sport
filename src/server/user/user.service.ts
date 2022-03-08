import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel) private readonly userRepository: typeof UserModel,
        // private readonly roleService: RoleService
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        // const defaultRole = await this.roleService.getRoleByName('USER');
        // if (defaultRole) {
        //     await user.$set('roles', [defaultRole.id]);
        // }
        return user;
    }

    async getAllUsers() {
        return this.userRepository.findAll({ include: ['roles'] });
    }

    async findUser(email: string) {
		return this.userRepository.findOne({ email });
	};
}
