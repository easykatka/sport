import { Body, Controller, Post, Get, UseInterceptors, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserModel } from '../models/user.model';
import { ParamsInterceptor } from 'server/interceptors/params.interceptor';

@ApiTags('Пользователи')
@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/getAllUsers')
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    
    getUserByEmail(email: string) {
        return this.userService.getUserByEmail(email);
    }
    @Get('/getUserByEmail/:id')
    getUserByEmail2(@Param('id') id: string) {
        return this.userService.getUserByEmail(id);
    }
}
