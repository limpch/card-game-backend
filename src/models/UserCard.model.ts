import { ForeignKey, DataType, Column, Model, Table } from "sequelize-typescript"
import { User } from "./User.model"
import { Card } from "./Card.model"

@Table({ tableName: "user_cards" })
export class UserCard extends Model {
	@ForeignKey(() => User)
	@Column({ allowNull: false, type: DataType.INTEGER })
	userId: number

	@ForeignKey(() => Card)
	@Column({ allowNull: false, type: DataType.INTEGER })
	cardId: number
}
