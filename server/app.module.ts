import { DynamicModule, Module } from '@nestjs/common';
import Next from 'next';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'shared/constants/env';
import { UserRoleModule } from './user-role/user-role.module';
import { UserSourceModule } from './source/source.module';
import { FileModule } from './file/file.module';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';


declare const module: any;
@Module({
	imports: [DatabaseModule]
})
export class AppModule {
	public static initialize(): DynamicModule {
		/* При инициализации модуля попробуем извлечь инстанс RenderModule
			из персистентных данных между перезагрузками модуля */
		const renderModule =
			module.hot?.data?.renderModule ??
			RenderModule.forRootAsync(Next({ dev: NODE_ENV === 'development' }), {
				viewsDir: null,
			});

		if (module.hot) {
			/* При завершении работы старого модуля
				будем кэшировать инстанс RenderModule */
			module.hot.dispose((data: any) => {
				data.renderModule = renderModule;
			});
		}

		return {
			module: AppModule,
			controllers: [AppController],
			providers: [AppService],
			imports: [
				renderModule,
				ConfigModule.forRoot({
					envFilePath: `.${NODE_ENV}.env`,
					validationSchema: Joi.object({
						POSTGRES_HOST: Joi.string().required(),
						POSTGRES_PORT: Joi.number().required(),
						POSTGRES_LOGIN: Joi.string().required(),
						POSTGRES_PASSWORD: Joi.string().required(),
						POSTGRES_DATABASE: Joi.string().required(),
						PORT: Joi.number(),
					}),
				}),

				UserModule,
				RoleModule,
				AuthModule,
				UserSourceModule,
				UserRoleModule,
				FileModule,
			],
		};
	}
}
