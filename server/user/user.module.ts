import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Role } from '../role/role.entity';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([User, Role])],
    exports: [UserService],
})
export class UserModule {}
