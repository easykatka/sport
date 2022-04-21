
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRole {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	roleId: number;

	@Column()
	userId: number;
}
