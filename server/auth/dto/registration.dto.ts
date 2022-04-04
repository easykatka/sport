import { IsString } from 'class-validator';

export class RegistrationDto {
    @IsString()
    login: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    middleName: string;

    @IsString()
    lastName: string;
}
