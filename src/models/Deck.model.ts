import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
	BelongsTo,
	BelongsToMany,
} from "sequelize-typescript"
import { Card } from "./Card.model"
import { User } from "./User.model"
import { DeckCard } from "./DeckCard.model"

@Table({ tableName: "decks" })
export class Deck extends Model {
	@BelongsToMany(() => Card, () => DeckCard)
	cards: Card[]

	@ForeignKey(() => User)
	@Column({ allowNull: false, type: DataType.INTEGER })
	user_id: number

	@BelongsTo(() => User)
	user: User

	@Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 20 })
	limit: number
}
