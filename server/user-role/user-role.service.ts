import { BadRequestException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RECORD_NOT_FOUND } from 'server/constants';
import { UserRoleDto } from './dto/user-role.dto';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRoleService {
	constructor(@InjectRepository(User) private readonly userRoleRepository: Repository<User>) { }

	findById(id: number) {
		return this.userRoleRepository.findOne(id);
	}

	findAll() {
		return this.userRoleRepository.query(`select UR.id,R.name as "userName", concat(U."lastName",' ',U."firstName") as "roleName" from "UserRole" UR
		left join "Role" R on R.id = UR."roleId"
		left join "User" U on U.id = UR."userId"`)
	}

	async create(post: UserRoleDto) {
		const newRecord = await this.userRoleRepository.create(post);
		return await this.userRoleRepository.save(newRecord);
	}

	async update(dto: UserRoleDto) {
		await this.userRoleRepository.update(dto.id, dto);
		const updatedRecord = await this.userRoleRepository.findOne(dto.id);
		if (updatedRecord) {
			return updatedRecord
		}
		throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
	}

	async delete(id: number) {
		const deleteResponse = await this.userRoleRepository.delete(id);
		if (!deleteResponse.affected) {
			throw new HttpException(RECORD_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}
}
