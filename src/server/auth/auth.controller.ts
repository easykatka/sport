import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('registration')
    registration(@Body() dto: RegistrationDto) {
        console.log('🚀 ~ file: auth.controller.ts ~ line 12 ~ AuthController ~ registration ~ dto', dto);
        return this.authService.registration(dto);
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
