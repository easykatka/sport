import { Module } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { User } from '../user/user.entity';
import { UserRole } from '../user-role/user-role.entity';
@Module({
	controllers: [RoleController],
	providers: [RoleService],
	imports: [TypeOrmModule.forFeature([Role, User, UserRole])],
	exports: [RoleService],
})
export class RoleModule { }
