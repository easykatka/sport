import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com', description: 'Почтовый адрес' })
    readonly login: string;

    @ApiProperty({ example: 'pass123word', description: 'Пароль пользователя' })
    readonly password: string;
}
