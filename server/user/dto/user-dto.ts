import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
	@IsNumber()
	id: number;

	@IsEmail()
	email: string;

	@IsString()
	@IsOptional()
	password?: string;

	@IsString()
	firstName: string;

	@IsString()
	@IsOptional()
	middleName?: string | null;

	@IsString()
	lastName: string;

	@IsString()
	@IsOptional()
	telegram?: string | null;

	@IsString()
	@IsOptional()
	avatar?: string | null;
}
