import { DataType, ForeignKey, Column, Table, Model } from "sequelize-typescript"
import { User } from "./User.model"
import { Character } from "./Character.model"

@Table({ tableName: "user_characters" })
export class UserCharacter extends Model {
	@ForeignKey(() => User)
	@Column({ allowNull: false, type: DataType.INTEGER })
	userId: number

	@ForeignKey(() => Character)
	@Column({ allowNull: false, type: DataType.INTEGER })
	characterId: number
}
