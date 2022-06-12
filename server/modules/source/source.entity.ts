import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Source {
    @PrimaryGeneratedColumn() id: number;
    @CreateDateColumn() public createdAt: Date;
    @UpdateDateColumn() public updatedAt: Date;

    @ApiProperty({ example: 'Vkontakte', description: 'Название' })
    @Column({ unique: true })
    public name: string;
}
