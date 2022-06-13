import axios from 'axios';
import { Role as RoleEntity } from 'server/modules/role/role.entity';
import { Source as SourceEntity } from 'server/modules/source/source.entity';
import { User as UserEntity } from 'server/modules/user/user.entity';
import { LoginDto } from 'shared/dto/login.dto';
import { RegistrationDto } from 'server/modules/auth/dto/registration.dto';

export const instance = axios.create({
	baseURL: 'http://localhost:3000/api',
});

const Auth = {
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

const User = {
	async getAll() {
		const { data } = await instance.get('user/getAll');
		return data;
	},

	async create(dto: UserEntity) {
		await instance.post('user/create', dto);
	},

	async update(dto: UserEntity) {
		await instance.patch('user/update', dto);
	},

	async delete(id: number) {
		await instance.delete('user/delete', { data: { id } });
	},
};

const Role = {
	async getAll() {
		const { data } = await instance.get('role/getAll');
		return data;
	},

	async create(dto: RoleEntity) {
		await instance.post('role/create', dto);
	},

	async update(dto: RoleEntity) {
		await instance.patch('role/update', dto);
	},

	async delete(id: number) {
		await instance.delete('role/delete', { data: { id } });
	},
};

const Source = {
	async getAll() {
		const { data } = await instance.get('source/getAll');
		return data;
	},

	async create(dto: SourceEntity) {
		await instance.post('source/create', dto);
	},

	async update(dto: SourceEntity) {
		await instance.patch('source/update', dto);
	},

	async delete(id: number) {
		await instance.delete('source/delete', { data: { id } });
	},
};

const RoleMapping = {
	async getAll() {
		const { data } = await instance.get('rolemapping/getAll');
		return data;
	},

	async create(dto: SourceEntity) {
		await instance.post('rolemapping/create', dto);
	},

	async update(dto: SourceEntity) {
		await instance.patch('rolemapping/update', dto);
	},

	async delete(id: number) {
		await instance.delete('rolemapping/delete', { data: { id } });
	},
};

export const API = {
	Auth,
	Source,
	User,
	Role,
	RoleMapping
};
