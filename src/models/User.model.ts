import { Column, DataType, Model, Table, BelongsToMany } from "sequelize-typescript"
import { Character } from "./Character.model"
import { UserCharacter } from "./UserCharacter.model"
import { Card } from "./Card.model"
import { UserCard } from "./UserCard.model"

@Table({ tableName: "users" })
export class User extends Model {
	@Column({ allowNull: false, unique: true, type: DataType.STRING })
	telegramLogin: string

	@Column({ allowNull: false, type: DataType.STRING, defaultValue: "user" })
	role: string

	@BelongsToMany(() => Character, () => UserCharacter)
	characters: Character[]

	@BelongsToMany(() => Card, () => UserCard)
	cards: Card[]
}
