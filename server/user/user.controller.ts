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

    @UseGuards(jwtAuthGuard)
    @Get('me')
    async getProfile(@Request() req) {
        const profile = await this.userService.findById(req.user.id);
        profile.password = undefined;
        return profile;
    }

    @UseGuards(jwtAuthGuard)
    @Patch('/me')
    updateProfile(@Request() req) {
        return req.user;
    }
}
