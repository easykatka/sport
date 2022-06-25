import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/storage`,
			serveRoot: `/storage/`,
		}),
	],
	providers: [FileService],
	exports: [FileService]
})
export class FileModule { }
