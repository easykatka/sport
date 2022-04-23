import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Role {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty({ example: 'admin', description: 'Название роли' })
    @Column({ unique: true })
    public name: string;

    @ApiProperty({ example: 'Админ сайта', description: 'Описание роли' })
    @Column()
    public description: string;

    @ApiProperty({ example: '#ffffff', description: 'Цвет роли' })
    @Column({ nullable: true })
    public color: string;

	@ManyToMany(() => User, (user: User) => user.roles)
	public users: User[];
}
