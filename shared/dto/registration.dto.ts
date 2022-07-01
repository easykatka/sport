import { IsEmail, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

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
	readonly photo: string | Blob;
	readonly sourceId: number | null;

}
