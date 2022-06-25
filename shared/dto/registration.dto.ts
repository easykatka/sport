import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RegistrationDto {
	@IsString()
	readonly email: string;

	@IsString()
	password: string;

	@IsString()
	readonly firstname: string;

	@IsString()
	readonly lastname: string;

	@IsString()
	@IsOptional()
	readonly middlename: string;

	@IsNumber()
	readonly sourceId: number;

	@IsString()
	@IsOptional()
	readonly photo?: string;
}

