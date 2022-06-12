import { Module } from '@nestjs/common';
import { Role } from '../role/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role_User } from './role_user.entity';
import { Role_UserController } from './role_user.controller';
import { User } from '../user/user.entity';
import { Role_UserService } from './role_user.service';

@Module({
    controllers: [Role_UserController],
    providers: [Role_UserService],
    imports: [TypeOrmModule.forFeature([User, Role, Role_User])],
})
export class Role_UserModule {}
