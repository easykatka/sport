import axios from 'axios';
import { LoginDto } from './types';

export const instance = axios.create({
    baseURL: 'localhost:3000',
});

export const UserApi = {
    async register(dto: LoginDto) {
        const { data } = await instance.post('auth/register', dto);
        return data;
    },

    async login(dto: LoginDto) {
        const { data } = await instance.post('auth/login', dto);
        return data;
    },
};
