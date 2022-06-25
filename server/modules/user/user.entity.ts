import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Rolemapping } from '../rolemapping/rolemapping.entity';
import { Source } from '../source/source.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn() public id: number;
	@CreateDateColumn({ name: 'createdat' }) public createdAt: Date;
	@UpdateDateColumn({ name: 'updatedat' }) public updatedAt: Date;

	@ApiProperty({ example: 'user@example.com', description: 'email' })
	@Column({ unique: true })
	public email: string;

	@ApiProperty({ example: '1234qwer', description: 'Пароль' })
	@Exclude()
	@Column()
	public password: string;

	@ApiProperty({ example: '433443', description: 'Телеграм' })
	@Column({ nullable: true })
	public telegram: string;

	@ApiProperty({ example: 'image.jpg', description: 'Аватар' })
	@Column({ nullable: true })
	public photo: string;

	@ApiProperty({ example: 'Имя', description: 'Имя' })
	@Column()
	public firstname: string;

	@ApiProperty({ example: 'Фамилия', description: 'Фамилия' })
	@Column()
	public lastname: string;

	@ApiProperty({ example: 'Отчество', description: 'Отчество' })
	@Column({ nullable: true })
	public middlename: string;

	//rel
	@Column({ nullable: true }) public sourceId: number;
	@ManyToOne(() => Source, (source) => source.users) public source: Source;
	@OneToMany(() => Rolemapping, (Rolemapping) => Rolemapping.user) public roles!: Rolemapping[];
}
