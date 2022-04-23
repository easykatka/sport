import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany,ManyToOne, JoinTable } from 'typeorm';
import { Role } from '../role/role.entity';
import { Source } from '../source/source.entity';

@Entity()
export class User {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@PrimaryGeneratedColumn()
	public id?: number;

	@ApiProperty({ example: 'user@example.com', description: 'Почтовый адрес пользователя' })
	@Column({ unique: true, })
	public email: string;

	@ApiProperty({ example: '1234qwer', description: 'Пароль пользователя' })
	@Exclude()
	@Column()
	public password: string;

	@ApiProperty({ example: '433443', description: 'Телеграм пользователя' })
	@Column({ nullable: true })
	public telegram: string;

	@ApiProperty({ example: 'image.jpg', description: 'Аватар пользователя' })
	@Column({ nullable: true })
	public avatar: string;

	@ApiProperty({ example: 'Имя', description: 'Имя пользователя' })
	@Column()
	public firstName: string;

	@ApiProperty({ example: 'Фамилия', description: 'Фамилия пользователя' })
	@Column()
	public lastName: string;

	@ApiProperty({ example: 'Отчество', description: 'Отчество пользователя' })
	@Column({ nullable: true })
	public middleName: string;

	@ManyToMany(() => Role, (role: Role) => role.users)
	@JoinTable()
	public roles: Role[];

	@ManyToOne(() => Source, (source: Source) => source.users)
	public author: User;
}
