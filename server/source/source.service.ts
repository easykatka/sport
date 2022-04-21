import { BadRequestException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RECORD_ALREADY_EXIST, RECORD_NOT_FOUND } from 'server/constants';
import { Repository } from 'typeorm';
import { SourceDto } from './dto/source.dto';
import { Source } from './sourse.entity';
@Injectable()
export class UserSourceService {
	constructor(@InjectRepository(Source) private readonly sourceRepository: Repository<Source>) { }

	findById(id: number) {
		return this.sourceRepository.findOne(id);
	}

	findAll() {
		return this.sourceRepository.find();
	}

	getSourceByName(name: string) {
		return this.sourceRepository.findOne({ where: { name } });
	}

	async create(dto: SourceDto) {
		const newRecord = await this.sourceRepository.create(dto);
		return await this.sourceRepository.save(newRecord);
	}

	async update(dto: SourceDto) {
		await this.sourceRepository.update(dto.id, dto);
		const updatedRecord = await this.sourceRepository.findOne(dto.id);
		if (updatedRecord) {
			return updatedRecord
		}
		throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
	}

	async delete(id: number) {
		const deleteResponse = await this.sourceRepository.delete(id);
		if (!deleteResponse.affected) {
			throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}
}
