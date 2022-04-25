import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'server/modules/role/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class RoleToUser {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@PrimaryGeneratedColumn()
	public id: number;

	@ApiProperty({ example: 'admin', description: 'Название роли' })
	@Column()
	public roleId: number;

	@ApiProperty({ example: 'admin', description: 'Название роли' })
	@Column()
	public userId: number;

	@ManyToOne(() => User, user => user.roles , {
		eager: true,
	})
	public user: User;

	@ManyToOne(() => Role, role => role.users, {
		eager: true,
	})
	public role: Role;

}
