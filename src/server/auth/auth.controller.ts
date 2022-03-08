import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.tdo';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('registration')
    registration(@Body() dto: AuthDto) {
        return this.authService.registration(dto);
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto);
    }
}
