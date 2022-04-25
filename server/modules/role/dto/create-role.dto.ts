import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsString()
	@IsOptional()
	color: string;
}

