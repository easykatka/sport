import { Module } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';
import { Role } from '../role/role.entity';
import { UserRole } from './user-role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	controllers: [UserRoleController],
	providers: [UserRoleService],
	imports: [TypeOrmModule.forFeature([User, Role, UserRole])]
})
export class UserRoleModule { }
