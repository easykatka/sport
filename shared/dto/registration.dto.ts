import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegistrationDto {
	@IsString()
	readonly email: string;

	@IsString()
	@MinLength(6)
	@MaxLength(20)
	password: string;

	@IsString()
	readonly firstname: string;

	@IsString()
	readonly lastname: string;

	@IsString()
	@IsOptional()
	readonly middlename: string;

	@IsNumber()
	@IsOptional()
	readonly sourceId: number;

	@IsString()
	@IsOptional()
	readonly photo?: string;
}

