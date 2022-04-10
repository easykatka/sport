import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from 'server/models/role.model';
import { UserRoleModel } from 'server/models/user-role.model';
import { UserModel } from 'server/models/user.model';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';

@Module({
	controllers: [UserRoleController],
	providers: [UserRoleService],
	imports: [SequelizeModule.forFeature([UserModel, RoleModel, UserRoleModel])]
})

export class UserRoleModule {}
