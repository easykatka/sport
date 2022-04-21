import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getPostgresConfig = async (ConfigService: ConfigService): Promise<TypeOrmModuleOptions> => {
	return {
		type: 'postgres',
		entities: ["server/**/*.entity.ts"],
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
