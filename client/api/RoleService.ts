import { Role } from 'server/modules/role/role.entity';
import { instance } from '.';

export class RoleService {
	static async getAll() {
		const { data } = await instance.get('role/getAll');
		return data;
	}

	static async create(dto: Role) {
		await instance.post('role/create', dto);
	}

	static async update(dto: Role) {
		await instance.patch('role/update', dto);
	}

	static async delete(id: number) {
		await instance.delete('role/delete', { data: { id } });
	}
}