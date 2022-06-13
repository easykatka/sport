import { IsNumber, IsOptional } from 'class-validator';

export class RolemappingDto {
	@IsNumber()
	@IsOptional()
	id?: number;

	@IsNumber()
	userId: number;

	@IsNumber()
	roleId: number;
}
