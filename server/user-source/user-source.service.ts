import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RECORD_ALREADY_EXIST, RECORD_NOT_FOUND } from 'server/constants';
import { UserSourceDto } from './dto/user-source.dto';
import { UserSourceModel } from '../models/user-source';

@Injectable()
export class UserSourceService {
	constructor(@InjectModel(UserSourceModel) private readonly userSourceRepository: typeof UserSourceModel) { }

	findById(id: number) {
		return this.userSourceRepository.findByPk(id);
	}

	findAll() {
		return this.userSourceRepository.findAll();
	}

	getUserByName(name: string) {
		return this.userSourceRepository.findOne({ where: { name } });
	}

	async create(dto: UserSourceDto) {
		try {

			const candidate = await this.getUserByName(dto.name);
			if (candidate) throw new BadRequestException(RECORD_ALREADY_EXIST);
			const record = new this.userSourceRepository(dto);
			return record.save();
		}
		catch (e: any) {
			throw new BadRequestException(e?.errors.map(i => i.message).join(', ') || 'Bad request');
		}
	}

	async update(dto: UserSourceDto) {
		try {
			const instance = await this.userSourceRepository.findByPk(dto.id);
			if (!instance) throw new BadRequestException(RECORD_NOT_FOUND)
			return await instance.update(dto)
		}
		catch (e: any) {
			throw new BadRequestException(e?.errors.map(i => i.message).join(', ') || 'Bad request');
		}
	}

	async delete(id: string) {
		const instance = await this.userSourceRepository.findByPk(id);
		if (!instance) throw new BadRequestException(RECORD_NOT_FOUND)
		return await instance.destroy();
	}
}
