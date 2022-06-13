import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RECORD_NOT_FOUND } from 'server/constants';
import { Repository } from 'typeorm';
import { Rolemapping } from './rolemapping.entity';

@Injectable()
export class RolemappingService {
	constructor(@InjectRepository(Rolemapping) private readonly rolemappingRepository: Repository<Rolemapping>) { }

	async create(dto: Rolemapping) {
		try {
			const newRecord = await this.rolemappingRepository.create(dto);
			return this.rolemappingRepository.save(newRecord);
		} catch (e) {
			console.log(e);
		}
	}

	async update(dto: Rolemapping) {
		await this.rolemappingRepository.update(dto.id, dto);
		const updatedRecord = await this.rolemappingRepository.findOneBy({ id: dto.id });
		if (updatedRecord) {
			return updatedRecord;
		}
		throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
	}

	async delete(id: number) {
		const deleteResponse = await this.rolemappingRepository.delete(id);
		if (!deleteResponse.affected) {
			throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	findById(id: number) {
		const user = this.rolemappingRepository.findOne({ where: { id }, relations: ['role', 'user'] });
		if (user) {
			return user;
		}
		throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
	}

	findAll() {
		return this.rolemappingRepository.find({ relations: ['role', 'user'] });
	}
}
