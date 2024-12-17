import { Column, DataType, Model, Table } from "sequelize-typescript"

@Table({ tableName: "subscriptions" })
export class Subscription extends Model {
	@Column({ allowNull: false, type: DataType.STRING })
	name: string

	@Column({ allowNull: false, type: DataType.STRING })
	description: string

	@Column({ allowNull: false, type: DataType.STRING })
	icon: string

	@Column({ allowNull: false, type: DataType.INTEGER })
	price: number

	@Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
	active: boolean
}
