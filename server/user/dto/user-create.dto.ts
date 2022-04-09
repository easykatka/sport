import { IsEmail, IsEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsNull } from 'sequelize-typescript';

export class UserDto {
	@IsNumber()
	@IsOptional()
	id?: number | null;

	@IsEmail()
	email: string;

	@IsString()
	password: string;

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
