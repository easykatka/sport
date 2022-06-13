import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../../../shared/dto/login.dto';
import { AuthService } from './auth.service';
import { UserDto } from '../../../shared/dto/user.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('registration')
    registration(@Body() dto: UserDto) {
        return this.authService.registration(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
