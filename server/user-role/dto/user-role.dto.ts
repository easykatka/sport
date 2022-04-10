import { IsNumber, IsOptional, } from 'class-validator';

export class UserRoleDto {
	@IsOptional()
	@IsNumber()
	id: number;

	@IsNumber()
	roleId: number;

	@IsNumber()
	userId: number;
}
