export interface UserDto {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	middleName?: string;
	telegram?: string,
	avatar?: string,
	roles?: [];
	id?: number;
};
