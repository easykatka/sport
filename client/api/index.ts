import axios from 'axios';
import { LoginDto, RegistrationDto } from 'shared/types/auth';
import { RoleDto } from 'shared/types/RoleDto';
import { UserDto } from 'shared/types/UserDto';
import { UserSourceDto } from '../../server/source/dto/source.dto';

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
	},

	async delete(id: number) {
		await instance.post('user/delete', { id });
	}
}

export const RoleApi = {
	async create(dto: RoleDto) {
		await instance.post('role/create', dto);
	},

	async update(dto: RoleDto) {
		await instance.patch('role/update', dto);
	},

	async delete(id: number) {
		await instance.post('role/delete', { id });
	}
}

export const UserSourceApi = {
	async create(dto: UserSourceDto) {
		await instance.post('usersource/create', dto);
	},

	async update(dto: UserSourceDto) {
		await instance.patch('usersource/update', dto);
	},

	async delete(id: number) {
		await instance.post('usersource/delete', { id });
	}
}
