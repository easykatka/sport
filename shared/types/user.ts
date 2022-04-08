export type LoginDto = {
    email: string;
    password: string;
};

export type UserDto = LoginDto & {
    firstName: string;
    lastName: string;
    middleName: string;
    roles?: [];
};
