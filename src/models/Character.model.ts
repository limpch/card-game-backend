import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { User } from "./User.model"
import { UserCharacter } from "./UserCharacter.model"

@Table({ tableName: "characters" })
export class Character extends Model {
	@Column({ allowNull: false, unique: true, type: DataType.STRING })
	name: string

	@Column({ allowNull: false, type: DataType.STRING })
	description: string

	@Column({ allowNull: false, type: DataType.STRING })
	image: string

	@Column({ allowNull: false, type: DataType.JSONB })
	specifications: string

	@Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
	price: number

	@BelongsToMany(() => User, () => UserCharacter)
	users: User[]
}
