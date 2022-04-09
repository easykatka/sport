import { Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { jwtAuthGuard } from 'server/auth/guards/jwt.guard';
import { RegistrationDto } from '../auth/dto/registration.dto';

@ApiTags('Пользователи')
@Controller('api/user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get('/create')
	createUser(dto: RegistrationDto) {
		return this.userService.create(dto);
	}

	@Get('/getUsers')
	getUsers() {
		return this.userService.findAll();
	}

	@Get('/getUserByEmail/:email')
	getUserByEmail(@Param('email') email: string) {
		return this.userService.getUserByEmail(email);
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
