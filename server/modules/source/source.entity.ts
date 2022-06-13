import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
@Entity()
export class Source {
    @PrimaryGeneratedColumn() id: number;
    @CreateDateColumn({ name: 'createdat' }) public createdAt: Date;
    @UpdateDateColumn({ name: 'updatedat' }) public updatedAt: Date;

    @ApiProperty({ example: 'Vkontakte', description: 'Название' })
    @Column({ unique: true })
    public name: string;

    @OneToMany(() => User, (user) => user.source) users: User[];
}
