import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../../../shared/dto/login.dto';
import { AuthService } from './auth.service';
import { RegistrationDto } from 'shared/dto/registration.dto';

@Controller('api/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('registration')
	registration(@Body() dto: RegistrationDto) {
		return this.authService.registration(dto);
	}

	@Post('login')
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto);
	}
}
