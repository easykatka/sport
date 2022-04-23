import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
@Entity()
export class Source {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Vkontakte', description: 'Название источника' })
    @Column({ unique: true })
    name: string;

    users: User[];
}
