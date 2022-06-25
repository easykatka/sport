import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegistrationDto {

	@IsEmail()
	readonly email: string;

	@IsString()
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
	readonly photo: string | null;

	@IsNumber()
	readonly sourceId: number | null;
}
