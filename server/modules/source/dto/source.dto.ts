import { IsNumber, IsString, IsOptional } from 'class-validator';

export class SourceDto {
	@IsOptional()
	@IsNumber()
	id: number;

	@IsString()
	name: string;
}
