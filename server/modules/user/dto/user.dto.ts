import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    firstname: string;

    @IsString()
    @IsOptional()
    middlename?: string | null;

    @IsString()
    lastname: string;

    @IsString()
    @IsOptional()
    telegram?: string | null;

    @IsString()
    @IsOptional()
    avatar?: string | null;

    @IsNumber()
    @IsOptional()
    sourceId?: number | null;
}
