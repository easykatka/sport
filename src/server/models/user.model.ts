import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { RoleModel } from './role.model';
import { UserRoleModel } from './user-role.model';


interface UserCreationAttrs {
    login:string,
    password:string,
}

@Table({ tableName: 'User' })
export class UserModel extends Model<UserModel,UserCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'user@example.com', description: 'логин / почтовый адрес' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    login: string;

    @ApiProperty({ example: '1234qwer', description: 'Пароль пользователя' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @BelongsToMany(() => RoleModel, () => UserRoleModel)
    roles: RoleModel[];
    
}
