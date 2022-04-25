import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { RoleToUser } from '../role-to-user/role-to-user.entity';
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

	@ManyToOne(() => Source )
	public source: User;

	@OneToMany(() => RoleToUser, roleToUser => roleToUser.user)
	public roles!: RoleToUser[];
}
