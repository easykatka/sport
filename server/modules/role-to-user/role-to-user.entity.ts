import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'server/modules/role/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class RoleToUser {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@PrimaryGeneratedColumn()
	public id: number;

	@ApiProperty({ example: 'admin', description: 'Название роли' })
	public roleId: number;

	@ApiProperty({ example: 'admin', description: 'Название роли' })
	public userId: number;

	@ManyToOne(() => User, user => user.roles)
	public user!: User;

	@ManyToOne(() => Role, role => role.users)
	public role!: Role;

}
