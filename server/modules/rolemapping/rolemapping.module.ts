import { Module } from '@nestjs/common';
import { Role } from '../role/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rolemapping } from './rolemapping.entity';
import { RolemappingController } from './rolemapping.controller';
import { User } from '../user/user.entity';
import { RolemappingService } from './rolemapping.service';

@Module({
	controllers: [RolemappingController],
	providers: [RolemappingService],
	imports: [TypeOrmModule.forFeature([User, Role, Rolemapping])],
})
export class RolemappingModule { }
