export type LoginDto = {
    email: string;
    password: string;
};

export type RegistrationDto = LoginDto & {
    firstname: string;
    lastname: string;
    middlename: string;
    sourceId: number;
};
