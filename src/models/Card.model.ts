import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { User } from "./User.model"
import { UserCard } from "./UserCard.model"

@Table({ tableName: "cards" })
export class Card extends Model {
	@Column({ allowNull: false, unique: true, type: DataType.STRING })
	name: string

	@Column({ allowNull: false, type: DataType.STRING })
	description: string

	@Column({ allowNull: false, type: DataType.STRING })
	icon: string

	@Column({ allowNull: false, type: DataType.STRING })
	color: string

	@Column({ allowNull: false, type: DataType.JSONB })
	specifications: string

	@Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
	price: number

	@BelongsToMany(() => User, () => UserCard)
	users: User[]
}
