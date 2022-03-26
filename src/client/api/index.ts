import axios from 'axios';
import { LoginDto } from './types';

export const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const UserApi = {
    async registration(dto: LoginDto) {
        const { data } = await instance.post('auth/registration', dto);
        return data;
    },

    async login(dto: LoginDto) {
        const { data } = await instance.post('auth/login', dto);
        return data;
    },
};
