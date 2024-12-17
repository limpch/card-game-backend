import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { User } from "./User.model"
import { UserCharacter } from "./UserCharacter.model"

@Table({ tableName: "characters" })
export class Character extends Model {
	@Column({ allowNull: false, unique: true, type: DataType.STRING, defaultValue: "" })
	name: string

	@Column({ allowNull: false, type: DataType.STRING, defaultValue: "" })
	description: string

	@Column({ allowNull: false, type: DataType.STRING, defaultValue: "" })
	image: string

	@Column({ allowNull: false, type: DataType.JSONB, defaultValue: "{}" })
	specifications: string

	@Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
	price: number

	@Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
	active: boolean

	@Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: false })
	public: boolean

	@BelongsToMany(() => User, () => UserCharacter)
	users: User[]

	@HasMany(() => User)
	usersActiveCharacter: User[]
}
