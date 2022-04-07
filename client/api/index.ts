import axios from 'axios';
import { LoginDto, RegistrationDto } from './types';

export const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const UserApi = {
    async registration(dto: RegistrationDto) {
        const { data } = await instance.post('auth/registration', dto);
        console.log('🚀 ~ file: index.ts ~ line 11 ~ registration ~ token', data);
        return data;
    },

    async login({ email, password }: LoginDto) {
        const { data } = await instance.post('auth/login', { email, password });
        return data;
    },

    async me(token: string) {
        const { data } = await instance.get('user/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    },
};
