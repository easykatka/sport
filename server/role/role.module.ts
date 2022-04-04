import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleController } from './role.controller';
import { RoleModel } from '../models/role.model';
import { RoleService } from './role.service';
import { UserModel } from '../models/user.model';
import { UserRoleModel } from 'server/models/user-role.model';
@Module({
    controllers: [RoleController],
    providers: [RoleService],
    imports: [SequelizeModule.forFeature([RoleModel, UserModel, UserRoleModel])],
    exports: [RoleService],
})
export class RoleModule {}
