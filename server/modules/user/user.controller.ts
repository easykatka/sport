import { Body, Controller, Get, Param, Patch, Request, UseGuards, Post, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { jwtAuthGuard } from 'server/guards/jwt.guard';
import { User } from './user.entity';
import { UserDto } from '../../../shared/dto/user.dto';

@ApiTags('Пользователи')
@Controller('api/user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post('/create')
	create(@Body() dto: UserDto) {
		return this.userService.create(dto, photo);
	}
	@Delete('/delete')
	delete(@Body() { id }) {
		return this.userService.delete(id);
	}

	@Patch('/update')
	update(@Body() dto: User) {
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
	getProfile(@Request() req) {
		return this.userService.findById(req.user.id);
	}

	@UseGuards(jwtAuthGuard)
	@Patch('/me')
	updateProfile(@Request() req) {
		return req.user;
	}
}
