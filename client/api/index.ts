import axios from 'axios';
import { LoginDto, RegistrationDto } from 'shared/types/auth';
import { UserDto } from 'shared/types/user';

export const instance = axios.create({
	baseURL: 'http://localhost:3000/api',
});

export const AuthApi = {
	async registration(dto: RegistrationDto) {
		const { data } = await instance.post('auth/registration', dto);
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

export const UserApi = {
	async create(dto: UserDto) {
		await instance.post('user/create', dto);
	},

	async update(dto: UserDto) {
		await instance.patch('user/update', dto);
	}
}
