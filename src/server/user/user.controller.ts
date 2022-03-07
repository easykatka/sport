import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserModel } from './user.model';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: UserModel })
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto);
    }

    @ApiOperation({ summary: 'Получение пользователей' })
    @ApiResponse({ status: 200, type: [UserModel] })
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }
}
