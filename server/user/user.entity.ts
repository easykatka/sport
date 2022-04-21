// import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
	// @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@PrimaryGeneratedColumn()
	id: number;

	// @ApiProperty({ example: 'user@example.com', description: 'Почтовый адрес пользователя' })
	@Column({ unique: true, })
	email: string;

	// @ApiProperty({ example: '1234qwer', description: 'Пароль пользователя' })
	@Column()
	password: string;

	// @ApiProperty({ example: '433443', description: 'Телеграм пользователя' })
	@Column({ nullable: true })
	telegram: string;

	// @ApiProperty({ example: 'image.jpg', description: 'Аватар пользователя' })
	@Column({ nullable: true })
	avatar: string;

	// @ApiProperty({ example: 'Имя', description: 'Имя пользователя' })
	@Column()
	firstName: string;

	// @ApiProperty({ example: 'Фамилия', description: 'Фамилия пользователя' })
	@Column()
	lastName: string;

	// @ApiProperty({ example: 'Отчество', description: 'Отчество пользователя' })
	@Column({ nullable: true })
	middleName: string;

	@ManyToMany(() => Role)
	@JoinTable()
	public roles: Role[];

	// @ForeignKey(() => UserSourceModel)
	// @Column({ type: DataType.INTEGER })
	// sourceId: number;
}
