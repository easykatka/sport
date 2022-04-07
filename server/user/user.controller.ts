import { Controller, Post, Get, UseInterceptors, Param, UseGuards, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import { jwtAuthGuard } from 'server/auth/guards/jwt.guard';

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

    @UseGuards(jwtAuthGuard)
    @Patch('me')
    update(updateUserDto: UpdateUserDto) {
        return this.userService.update(+req.user.id, updateUserDto);
    }
}
