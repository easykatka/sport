import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../../configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	controllers: [AuthController],
	imports: [
		TypeOrmModule.forFeature([User, Role]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		PassportModule,
		UserModule,
	],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
