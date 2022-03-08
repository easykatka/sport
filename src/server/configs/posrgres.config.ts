import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { MODELS } from '../models/models';

export const getPostgresConfig = async (ConfigService: ConfigService): Promise<SequelizeModuleOptions> => {
    return {
        dialect: 'postgres',
        autoLoadModels: true,
        synchronize: true,
        sync: { alter: true },
        models: MODELS,
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