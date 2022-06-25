export class UserDto {
    id?: number;
    email: string;
    password?: string;
    firstname: string;
    middlename?: string | null;
    lastname: string;
    telegram?: string | null;
	photo?: string | null;
    sourceId?: number | null;
}
