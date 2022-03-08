import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { RoleModel } from 'src/server/models/role.model';
import { UserRoleModel } from '../models/user-role.model';
import { RoleModule } from '../role/role.module';
@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([UserModel, RoleModel, UserRoleModel]),
        RoleModule
    ],
})
export class UserModule {}
