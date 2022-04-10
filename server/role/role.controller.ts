import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@ApiTags('Роли')
@Controller('api/role')
export class RoleController {
	constructor(private readonly roleService: RoleService) { }

	@Post('/create')
	create(@Body() dto:CreateRoleDto ) {
		return this.roleService.create(dto);
	}
	@Post('/delete')
	delete(@Body() { id }) {
		return this.roleService.delete(id);
	}

	@Patch('/update')
	update(@Body() dto: CreateRoleDto) {
		return this.roleService.update(dto);
	}

	@Get('/getAll')
	getAll() {
		return this.roleService.getAll();
	}

	@Get('/getById/:id')
	getById(@Param('id') id: number) {
		return this.roleService.findById(id);
	}

	@Get('/:name')
	getByName(@Param('name') name: string) {
		return this.roleService.getRoleByName(name);
	}
}
