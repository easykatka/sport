import { ModuleMetadata } from '@nestjs/common';

export interface ITelegramOptions {
	chatId: string,
	token: string
}

export interface ITelegramAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...args: any[]) => Promise<ITelegramOptions> | ITelegramOptions;
	inject?: any[]
}