import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RenderService } from 'nest-next';
import { NODE_ENV, PORT } from 'src/shared/constants/env';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule.initialize());

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

    await app.listen(PORT, () => console.log('\x1b[32m', `Server is started on port:${PORT} in ${NODE_ENV} mode`));


    //* замена ошибок у рендер модуля
    const service = app.get(RenderService);
    service.setErrorHandler(async (err, req, res) => {
        console.log(err,'eerr')
        if (err.status !== 404) {
            res.send({
                statusCode: err.status,
                message: err.message
            })
        }
    });
}
bootstrap();
