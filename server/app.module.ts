import { DynamicModule, Module } from '@nestjs/common';
import Next from 'next';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'shared/constants/env';
import { SourceModule } from './modules/source/source.module';
import { FileModule } from './modules/file/file.module';
import { DatabaseModule } from './modules/database/database.module';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { RenderSiteController } from './render-site.controller';
import { RolemappingModule } from './modules/rolemapping/rolemapping.module';
import { RenderAdminController } from './render-admin.controller';
import Joi from 'joi';

declare const module: any;
@Module({})
export class AppModule {
	public static initialize(): DynamicModule {
		// При инициализации модуля попробуем извлечь инстанс RenderModuleиз персистентных данных между перезагрузками модуля 
		const renderModule =
			module.hot?.data?.renderModule ??
			RenderModule.forRootAsync(Next({ dev: NODE_ENV === 'development' }), {
				viewsDir: null,
			});

		if (module.hot) {
			// При завершении работы старого модуля будем кэшировать инстанс RenderModule
			module.hot.dispose((data: any) => {
				data.renderModule = renderModule;
			});
		}

		return {
			module: AppModule,
			controllers: [RenderAdminController, RenderSiteController],
			providers: [AppService, JwtStrategy],
			imports: [
				renderModule,
				ConfigModule.forRoot({
					envFilePath: `./envs/.${NODE_ENV}.env`,
					validationSchema: Joi.object({
						POSTGRES_HOST: Joi.string().required(),
						POSTGRES_PORT: Joi.number().required(),
						POSTGRES_LOGIN: Joi.string().required(),
						POSTGRES_PASSWORD: Joi.string().required(),
						POSTGRES_DATABASE: Joi.string().required(),
						PORT: Joi.number(),
						JWT_SECRET: Joi.string().required(),
					}),
				}),
				UserModule,
				RoleModule,
				AuthModule,
				SourceModule,
				FileModule,
				DatabaseModule,
				RolemappingModule,
			],
		};
	}
}
