import { Module } from '@nestjs/common';
import { UserSourceController } from './user-source.controller';
import { UserSourceService } from './user-source.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { UserSourceModel } from '../models/user-source';

@Module({
	controllers: [UserSourceController],
	providers: [UserSourceService],
	imports: [SequelizeModule.forFeature([UserModel, UserSourceModel])],
}
)
export class UserSourceModule { }
