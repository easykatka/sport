import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional } from 'class-validator';

export class UserDto {
	readonly id: number;
	@IsEmail()
	readonly email: string;
	@IsOptional()
	@Exclude()
	password?: string;
	readonly firstname: string;
	readonly middlename?: string | null;
	readonly lastname: string;
	readonly telegram?: string | null;
	readonly photo: string | null;
	readonly sourceId: number | null;
}
