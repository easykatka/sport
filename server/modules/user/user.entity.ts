import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Rolemapping } from '../rolemapping/rolemapping.entity';
import { Source } from '../source/source.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn() public id: number;
	@CreateDateColumn({ name: 'createdat' }) public createdAt: Date;
	@UpdateDateColumn({ name: 'updatedat' }) public updatedAt: Date;

	@Column({ unique: true })
	public email: string;

	@Exclude()
	@Column()
	public password: string;

	@Column({ nullable: true })
	public telegram: string;

	@Column({ nullable: true })
	public photo: string;

	@Column()
	public firstname: string;

	@Column()
	public lastname: string;

	@Column({ nullable: true })
	public middlename: string;

	//rel
	@Column({ nullable: true }) public sourceId: number;
	@ManyToOne(() => Source, (source) => source.users) public source: Source;
	@OneToMany(() => Rolemapping, (Rolemapping) => Rolemapping.user) public roles!: Rolemapping[];
}
