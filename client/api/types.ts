export type LoginDto = {
    email: string;
    password: string;
};

export type RegistrationDto = {
    firstName: string;
    lastName: string;
    middleName: string;
} & LoginDto;
