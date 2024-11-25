import { Column, DataType, Model, Table } from "sequelize-typescript"

@Table({ tableName: "users" })
export class User extends Model {
	@Column({ allowNull: false, unique: true, type: DataType.STRING })
	telegramLogin: string
}
