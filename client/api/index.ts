import axios from 'axios';
import { LoginDto, RegistrationDto } from './types';

export const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const UserApi = {
    async registration(dto: RegistrationDto) {
        const { data } = await instance.post('auth/registration', dto);
        return data;
    },

    async login(dto: LoginDto) {
        const { data } = await instance.post('auth/login', { login: dto.email, password: dto.password });
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
