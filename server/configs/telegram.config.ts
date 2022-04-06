import { ITelegramOptions } from '../telegram/telegram.interface';
import { ConfigService } from '@nestjs/config';

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
    const token = configService.get('TELEGRAM_TOKEN');
    console.log(configService.get('CHAT_ID'), 'chatid');
    if (!token) throw new Error('TELEGRAM_TOKEN не задан');
    return {
        token: token,
        chatId: configService.get('CHAT_ID') ?? '',
    };
};
