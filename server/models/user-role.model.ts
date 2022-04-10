import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { RoleModel } from './role.model';
import { UserModel } from './user.model';

interface UserRoleModelCreationAttrs {
	roleId: number,
	userId: number
}
@Table({ tableName: 'UserRole', createdAt: false, updatedAt: false })
export class UserRoleModel extends Model<UserRoleModel | UserRoleModelCreationAttrs> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ForeignKey(() => RoleModel)
	@Column({ type: DataType.INTEGER })
	roleId: number;

	@ForeignKey(() => UserModel)
	@Column({ type: DataType.INTEGER })
	userId: number;
}
