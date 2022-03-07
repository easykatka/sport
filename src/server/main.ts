import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const PORT = process.env.PORT || 3000;

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}

	const config = new DocumentBuilder()
		.setTitle('Приложение для организации спортивных мероприятий')
		.setDescription('Документация REST API')
		.setVersion('1.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document);

	await app.listen(PORT, () => console.log('\x1b[32m', `Server is started on port:${PORT}`));
}
bootstrap();
