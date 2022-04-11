import { IsNumber, IsString } from 'class-validator';

export class UserSourceDto {
	@IsNumber()
	id: number;

	@IsString()
	name: string;
}
