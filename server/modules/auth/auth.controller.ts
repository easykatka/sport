import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { LoginDto } from '../../../shared/dto/login.dto';
import { AuthService } from './auth.service';
import { RegistrationDto } from 'shared/dto/registration.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MFile } from '../file/mfile.class';
import { UserDto } from 'shared/dto/user.dto';



@Controller('api/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@UseInterceptors(FileInterceptor('photo'))
	@Post('registration')
	registration(@Body() dto: UserDto, @UploadedFile() photo: MFile) {
		return this.authService.registration(dto, photo);
	}

	@Post('login')
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto);
	}
}
