import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Source } from '../source/source.entity';
import { Role } from '../role/role.entity';
import { Rolemapping } from '../rolemapping/rolemapping.entity';

export const getPostgresConfig = async (ConfigService: ConfigService): Promise<TypeOrmModuleOptions> => {
	return {
		type: 'postgres',
		entities: [Role, Source, User, Rolemapping],
		synchronize: true,
		...getConfigOptions(ConfigService),
	};
};

const getConfigOptions = (configService: ConfigService) => ({
	host: configService.get('POSTGRES_HOST'),
	port: configService.get('POSTGRES_PORT'),
	username: configService.get('POSTGRES_LOGIN'),
	password: configService.get('POSTGRES_PASSWORD'),
	database: configService.get('POSTGRES_DATABASE'),
});
