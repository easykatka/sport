import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserSourceModelCreationAttrs {
	name: string
}
@Table({ tableName: 'UserSource', createdAt: false, updatedAt: false })
export class UserSourceModel extends Model<UserSourceModel | UserSourceModelCreationAttrs> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'Vkontakte', description: 'Название источника' })
	@Column({ type: DataType.STRING, unique: true, allowNull: true })
	name: string;
}
