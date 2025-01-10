import {
	Column,
	DataType,
	Model,
	Table,
	BelongsToMany,
	HasMany,
	BelongsTo,
	ForeignKey,
} from "sequelize-typescript"
import { Character } from "./Character.model"
import { UserCharacter } from "./UserCharacter.model"
import { Card } from "./Card.model"
import { UserCard } from "./UserCard.model"
import { UserSubscription } from "./UserSubscription.model"
import { Deck } from "./Deck.model"

@Table({ tableName: "users" })
export class User extends Model {
	@Column({ allowNull: false, unique: true, type: DataType.INTEGER })
	telegramId: number

	@Column({ allowNull: false, type: DataType.STRING, defaultValue: "user" })
	role: string

	@Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
	coins: number

	@BelongsToMany(() => Character, () => UserCharacter)
	characters: Character[]

	@BelongsToMany(() => Card, () => UserCard)
	cards: Card[]

	@HasMany(() => UserSubscription)
	subscriptions: UserSubscription[]

	@HasMany(() => Deck)
	decks: Deck[]

	@Column({ allowNull: true, type: DataType.INTEGER, defaultValue: null })
	@ForeignKey(() => Character)
	activeCharacterId: number | null

	@BelongsTo(() => Character)
	activeCharacter: Character | null
}
