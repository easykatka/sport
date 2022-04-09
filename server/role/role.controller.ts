import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@ApiTags('Роли')
@Controller('api/role')
export class RoleController {
	constructor(private readonly roleService: RoleService) { }

	@Get('/getRoles')
	getRoles() {
		return this.roleService.getRoles();
	}

	@Post()
	create(@Body() dto: CreateRoleDto) {
		return this.roleService.createRole(dto);
	}

	@Get('/:name')
	getByName(@Param('name') name: string) {
		return this.roleService.getRoleByName(name);
	}
}
