export type LoginDto = {
	email: string;
	password: string;
};

export type RegistrationDto = LoginDto & {
	firstName: string;
	lastName: string;
	middleName: string;
}