import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RECORD_NOT_FOUND } from 'server/constants';
import { Repository } from 'typeorm';
import { RoleToUser } from './role-to-user.entity';

@Injectable()
export class RoleToUserService {
	constructor(@InjectRepository(RoleToUser) private readonly userToRolesRepository: Repository<RoleToUser>) { }


	async create(dto: RoleToUser) {
		try {
			const newRecord = await this.userToRolesRepository.create(dto);
			return this.userToRolesRepository.save(newRecord);
		} catch (e) {
			console.log(e);
		}
	}

	async update(dto: RoleToUser) {
		await this.userToRolesRepository.update(dto.id, dto);
		const updatedRecord = await this.userToRolesRepository.findOneBy({ id: dto.id });
		if (updatedRecord) {
			return updatedRecord;
		}
		throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
	}

	async delete(id: number) {
		const deleteResponse = await this.userToRolesRepository.delete(id);
		if (!deleteResponse.affected) {
			throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	findById(id: number) {
		const user = this.userToRolesRepository.findOne({ where: { id }, relations: ['roles'] });
		if (user) {
			return user;
		}
		throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
	}

	findAll() {
		return this.userToRolesRepository.find({ relations: ['roles', 'users'] });
	}
}
