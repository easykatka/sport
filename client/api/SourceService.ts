import { Source } from 'server/modules/source/source.entity';
import { instance } from '.';

export class SourceService {
	static async getAll() {
		const { data } = await instance.get('source/getAll');
		return data;
	}

	static async create(dto: Source) {
		await instance.post('source/create', dto);
	}

	static async update(dto: Source) {
		await instance.patch('source/update', dto);
	}

	static async delete(id: number) {
		await instance.delete('source/delete', { data: { id } });
	}
};