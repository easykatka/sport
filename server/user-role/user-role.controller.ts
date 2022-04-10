import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRoleDto } from './dto/user-role.dto';
import { UserRoleService } from './user-role.service';


@ApiTags('Назначение ролей')
@Controller('api/rolemapping')
export class UserRoleController {
	constructor(private readonly userService: UserRoleService) { }

	@Post('/create')
	create(@Body() dto: UserRoleDto) {
		return this.userService.create(dto);
	}
	@Post('/delete')
	delete(@Body() { id }) {
		return this.userService.delete(id);
	}

	@Patch('/update')
	update(@Body() dto: UserRoleDto) {
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
}
