import { User } from 'server/modules/user/user.entity';
import { instance } from '.';

export class UserService {
	static async getAll() {
		const { data } = await instance.get('user/getAll');
		return data;
	}

	static async create(dto: User) {
		await instance.post('user/create', dto);
	}

	static async update(dto: User) {
		await instance.patch('user/update', dto);
	}

	static async delete(id: number) {
		await instance.delete('user/delete', { data: { id } });
	}
}
