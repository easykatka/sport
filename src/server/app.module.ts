import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './configs/posrgres-config';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { RenderModule } from 'nest-next';
import next from 'next';
console.log(process.env.NODE_ENV);
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    RenderModule.forRootAsync(next({ dev: process.env.NODE_ENV === 'development' }), {
      viewsDir: null,
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    UserModule,
    RoleModule,
    AuthModule,
  ],
})
export class AppModule {}
