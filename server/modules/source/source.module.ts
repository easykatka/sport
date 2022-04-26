import { Module } from '@nestjs/common';
import { SourceController } from './source.controller';
import { SourceService } from './source.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Source } from './source.entity';


@Module({
	controllers: [SourceController],
	providers: [SourceService],
	imports: [TypeOrmModule.forFeature([User, Source])],
})
export class SourceModule { }
