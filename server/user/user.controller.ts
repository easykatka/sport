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
	create(dto: RegistrationDto) {
		return this.userService.create(dto);
	}
	@Get('/update')
	update(dto: RegistrationDto) {
		return this.userService.update(dto);
	}

	@Get('/getAll')
	getAll() {
		return this.userService.findAll();
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
