import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UserSourceDto {
	@IsOptional()
	@IsNumber()
	id: number;

	@IsString()
	name: string;
}
