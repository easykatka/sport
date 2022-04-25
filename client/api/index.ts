import axios from 'axios';
import { Role } from 'server/modules/role/role.entity';
import { Source } from 'server/modules/source/source.entity';
import { User } from 'server/modules/user/user.entity';
import { LoginDto, RegistrationDto } from 'shared/types/auth';

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
	async create(dto: User) {
		await instance.post('user/create', dto);
	},

	async update(dto: User) {
		await instance.patch('user/update', dto);
	},

	async delete(id: number) {
		await instance.post('user/delete', { id });
	},
};

export const RoleApi = {
	async create(dto: Role) {
		await instance.post('role/create', dto);
	},

	async update(dto: Role) {
		await instance.patch('role/update', dto);
	},

	async delete(id: number) {
		await instance.post('role/delete', { id });
	},
};

export const UserSourceApi = {
	async create(dto: Source) {
		await instance.post('usersource/create', dto);
	},

	async update(dto: Source) {
		await instance.patch('usersource/update', dto);
	},

	async delete(id: number) {
		await instance.post('usersource/delete', { id });
	},
};
