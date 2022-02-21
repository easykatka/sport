import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { RoleModel } from '../role/role.model';
import { UserRoleModel } from './user-role.model';

interface UserModelCreationAttrs {
	email: string,
	password: string
}

@Table({ tableName: 'User' })
export class UserModel extends Model<UserModel, UserModelCreationAttrs> {


	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'user@example.com', description: 'Почтовый адрес' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@ApiProperty({ example: 'pass123word', description: 'Пароль пользователя' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string;


	//* создать отдельную таблицу забанненых
	@ApiProperty({ example: 'true', description: 'Флаг бана' })
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	banned: boolean;

	@ApiProperty({ example: 'За хулиганство', description: 'Причина бана' })
	@Column({ type: DataType.STRING, allowNull: true })
	banReason: string;

	@BelongsToMany(() => RoleModel, () => UserRoleModel)
	roles: RoleModel[]
}
