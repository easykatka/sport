import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserModel } from '../models/user.model';

@ApiTags('Пользователи')
@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}
}
