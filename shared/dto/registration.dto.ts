import { IsEmail, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class RegistrationDto {
	@IsEmail()
	email: string;

	@IsString()
	password?: string;

	@IsString()
	firstname: string;

	@IsString()
	@IsOptional()
	middlename?: string | null;

	@IsString()
	lastname: string;
	photo: string | Blob;
	sourceId: number | null;
}
