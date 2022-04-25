import { Module } from '@nestjs/common';
import { Role } from '../role/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleToUser } from './role-to-user.entity';
import { RoleToUserController } from './role-to-user.controller';
import { User } from '../user/user.entity';
import { RoleToUserService } from './role-to-user.service';

@Module({
	controllers: [RoleToUserController],
	providers: [RoleToUserService],
	imports: [TypeOrmModule.forFeature([User, Role, RoleToUser])],
})
export class RoleToUserModule { }
