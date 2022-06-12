import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role_User } from '../role_user/role_user.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn() public id: number;
    @CreateDateColumn({ name: 'createdat' }) public createdAt: Date;
    @UpdateDateColumn({ name: 'updatedat' }) public updatedAt: Date;

    @ApiProperty({ example: 'admin', description: 'Название роли' })
    @Column({ unique: true })
    public name: string;

    @ApiProperty({ example: 'Админ сайта', description: 'Описание роли' })
    @Column()
    public description: string;

    @ApiProperty({ example: '#ffffff', description: 'Цвет роли' })
    @Column({ nullable: true })
    public color: string;

    //rel
    @OneToMany(() => Role_User, (Role_User) => Role_User.role) public users!: Role_User[];
}
