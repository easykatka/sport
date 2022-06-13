import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RegistrationDto {
	@IsString()
	email: string;

	@IsString()
	password: string;

	@IsString()
	firstname: string;

	@IsString()
	lastname: string;

	@IsString()
	@IsOptional()
	middlename: string;

	@IsNumber()
	sourceId: number;
}
