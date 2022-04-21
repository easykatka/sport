import { Module } from '@nestjs/common';
import { UserSourceController } from './source.controller';
import { UserSourceService } from './source.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'server/user/user.entity';
import { Source } from './sourse.entity';


@Module({
	controllers: [UserSourceController],
	providers: [UserSourceService],
	imports: [TypeOrmModule.forFeature([User, Source])],
})
export class UserSourceModule { }
