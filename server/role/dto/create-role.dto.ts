import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
	@IsString()
	readonly name: string;

	@IsString()
	@IsOptional()
	readonly description?: string;
}

export class RoleDto extends CreateRoleDto {
	@IsNumber()
	@IsOptional()
	id?: number
}