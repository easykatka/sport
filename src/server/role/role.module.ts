import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleController } from './role.controller';
import { RoleModel } from './role.model';
import { RoleService } from './role.service';
import { UserModel } from '../user/user.model';
import { UserRoleModel } from 'src/server/user/user-role.model';
@Module({
    controllers: [RoleController],
    providers: [RoleService],
    imports: [SequelizeModule.forFeature([RoleModel, UserModel, UserRoleModel])],
    exports: [RoleService],
})
export class RoleModule {}
