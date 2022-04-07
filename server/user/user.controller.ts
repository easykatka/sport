import { Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
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

    @Get('me')
    getProfile(@Request() req) {
        return this.userService.findById(req.user.id);
    }

    @Patch('/me')
    updateProfile(@Request() req) {
        console.log('🚀 ~ file: user.controller.ts ~ line 32 ~ UserController ~ updateProfile ~ req', req.user);
        return req.user;
    }
}
