import { Role } from 'server/modules/role/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Role_User {
    @PrimaryGeneratedColumn() public id: number;
    @CreateDateColumn() public createdAt: Date;
    @UpdateDateColumn() public updatedAt: Date;
    @Column() public roleId: number;
    @Column() public userId: number;
    @ManyToOne(() => User, (user) => user.roles, { eager: true }) public user: User;
    @ManyToOne(() => Role, (role) => role.users, { eager: true }) public role: Role;
}
