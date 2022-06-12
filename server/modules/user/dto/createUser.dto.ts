import { IsEmail, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

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
}
