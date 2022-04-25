import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoleToUser } from './role-to-user.entity';
import { RoleToUserService } from './role-to-user.service';

@Controller('api/rolemapping')
export class RoleToUserController {
	constructor(private readonly roleToUserService: RoleToUserService) { }

	@Post('/create')
	create(@Body() dto: RoleToUser) {
		return this.roleToUserService.create(dto);
	}
	@Delete('/delete')
	delete(@Body() { id }) {
		return this.roleToUserService.delete(id);
	}

	@Patch('/update')
	update(@Body() dto: RoleToUser) {
		return this.roleToUserService.update(dto);
	}

	@Get('/getAll')
	getAll() {
		
		return this.roleToUserService.findAll();
	}

	@Get('/getById/:id')
	getById(@Param('id') id: number) {
		return this.roleToUserService.findById(id);
	}
}
