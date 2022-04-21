import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Role } from 'server/role/role.entity';
import { UserRole } from 'server/user-role/user-role.enitity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [TypeOrmModule.forFeature([User, Role, UserRole])],
	exports: [UserService],
})
export class UserModule { }
