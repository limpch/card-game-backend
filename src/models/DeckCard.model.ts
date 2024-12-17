import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Deck } from "./Deck.model"
import { Card } from "./Card.model"

@Table({ tableName: "deck_cards" })
export class DeckCard extends Model {
	@ForeignKey(() => Deck)
	@Column({ allowNull: false, type: DataType.INTEGER })
	deck_id: number

	@ForeignKey(() => Card)
	@Column({ allowNull: false, type: DataType.INTEGER })
	card_id: number
}
