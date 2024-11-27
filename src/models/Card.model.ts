import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { User } from "./User.model"
import { UserCard } from "./UserCard.model"

@Table({ tableName: "cards" })
export class Card extends Model {
	@Column({ allowNull: false, unique: true, type: DataType.STRING, defaultValue: "" })
	name: string

	@Column({ allowNull: false, type: DataType.STRING, defaultValue: "" })
	description: string

	@Column({ allowNull: false, type: DataType.STRING, defaultValue: "" })
	icon: string

	@Column({ allowNull: false, type: DataType.STRING, defaultValue: "#000000" })
	color: string

	@Column({ allowNull: false, type: DataType.JSONB, defaultValue: "{}" })
	specifications: string

	@Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
	price: number

	@Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
	active: boolean

	@BelongsToMany(() => User, () => UserCard)
	users: User[]
}
