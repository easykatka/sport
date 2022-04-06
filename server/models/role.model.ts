import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserRoleModel } from 'server/models/user-role.model';
import { UserModel } from './user.model';

interface RoleModelCreationAttrs {
    name: string;
    description: string;
}

@Table({ tableName: 'Role'})
export class RoleModel extends Model<RoleModel, RoleModelCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'admin', description: 'Название роли' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @ApiProperty({ example: 'Админ сайта', description: 'Описание роли' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @BelongsToMany(() => UserModel, () => UserRoleModel)
    users: UserModel[];
}
