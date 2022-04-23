import { Module } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { User } from '../user/user.entity';

@Module({
	controllers: [RoleController],
	providers: [RoleService],
	imports: [TypeOrmModule.forFeature([Role, User])],
	exports: [RoleService],
})
export class RoleModule { }
