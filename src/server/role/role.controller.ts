import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';


@ApiTags('Роли')
@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) { }

	@Post()
	create(@Body() dto: CreateRoleDto) {
		return this.roleService.createRole(dto);
	};

	@Get('/:name')
	getByName(@Param('name') name: string) {
		return this.roleService.getRoleByName(name)
	}
}

