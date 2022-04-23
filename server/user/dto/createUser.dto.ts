import { IsEmail, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
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
