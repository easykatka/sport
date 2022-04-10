import { IsNumber, IsOptional } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class RoleDto extends CreateRoleDto {
	@IsNumber()
	@IsOptional()
	id?: number
}