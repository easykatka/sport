import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RenderService } from 'nest-next';
import { NODE_ENV, PORT } from 'shared/constants/env';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule.initialize());
    app.use(cookieParser());
    //* HMR
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    //* SWAGGER
    const config = new DocumentBuilder()
        .setTitle('Приложение для организации спортивных мероприятий')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    //* SERVER
    // app.setGlobalPrefix('api')

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    app.enableCors({
        origin: [/^(.*)/],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 200,
        credentials: true,
        allowedHeaders: 'Origin,X-Requested-With,Conent-Type,Accept,Authorization,authorization,X-forwarded-for',
    });
    await app.listen(PORT, () => console.log('\x1b[32m', `Server is started on port:${PORT} in ${NODE_ENV} mode`));

    //* замена ошибок у рендер модуля
    const service = app.get(RenderService);
    service.setErrorHandler(async (err, req, res) => {
        console.log(err, 'err');
        if (![404].includes(err.status)) {
            res.send(err.response);
        }
    });
}
bootstrap();
