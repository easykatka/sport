import { RolemappingDto } from 'shared/dto/rolemapping.dto';
import { instance } from '.';

export class RoleMappingService {
	model = 'rolemapping';

	static async getAll() {
		const { data } = await instance.get('rolemapping/getAll');
		return data;
	}

	static async create(dto: RolemappingDto) {
		await instance.post('rolemapping/create', dto);
	}

	static async update(dto: RolemappingDto) {
		await instance.patch('rolemapping/update', dto);
	}

	static async delete(id: number) {
		await instance.delete('rolemapping/delete', { data: { id } });
	}
}