import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
	@IsOptional()
	@IsNumber()
	readonly id?: number;

	@IsEmail()
	readonly email: string;

	@IsString()
	@IsOptional()
	password?: string;

	@IsString()
	readonly firstname: string;

	@IsString()
	@IsOptional()
	readonly middlename?: string | null;

	@IsString()
	readonly lastname: string;

	@IsString()
	@IsOptional()
	readonly telegram?: string | null;

	@IsString()
	@IsOptional()
	readonly photo?: string | null;

	@IsNumber()
	@IsOptional()
	readonly sourceId?: number | null;
}
