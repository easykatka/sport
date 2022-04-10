import { Body, Controller, Get, Param, Patch, Request, UseGuards, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { jwtAuthGuard } from 'server/auth/guards/jwt.guard';
import { UserCreateDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Пользователи')
@Controller('api/user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post('/create')
	create(@Body() dto: UserCreateDto) {
		return this.userService.create(dto);
	}
	@Post('/delete')
	delete(@Body() { id }) {
		return this.userService.delete(id);
	}

	@Patch('/update')
	update(@Body() dto: UserDto) {
		return this.userService.update(dto);
	}

	@Get('/getAll')
	getAll() {
		return this.userService.findAll();
	}

	@Get('/getById/:id')
	getById(@Param('id') id: number) {
		return this.userService.findById(id);
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
