import { User } from 'server/modules/user/user.entity';
import { instance } from '.';

export class UserService {
	static entity = 'user';
	static async getAll() {
		const { data } = await instance.get(this.entity + '/getAll');
		return data;
	}

	static async create(dto: User) {
		await instance.post(this.entity + '/create', dto);
	}

	static async update(dto: User) {
		await instance.patch(this.entity + '/update', dto);
	}

	static async delete(id: number) {
		await instance.delete(this.entity + '/delete', { data: { id } });
	}

	static async uploadPhoto(id: any, photo: any) {
		// const formData = new FormData([c]);
		// formData.append('photo', photo, photo.name);
		// formData.append('id', String(id));
		// await instance.post(this.entity + '/uploadPhoto', { photo });
	}
}
