import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Subscription } from "./Subscription.model"
import { User } from "./User.model"

@Table({ tableName: "user_subscriptions" })
export class UserSubscription extends Model {
	@Column({ allowNull: false, type: DataType.DATE })
	startDate: Date

	@Column({ allowNull: false, type: DataType.DATE })
	endDate: Date

	@Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: false })
	expired: boolean

	@ForeignKey(() => Subscription)
	@Column({ allowNull: false, type: DataType.INTEGER })
	subscription_id: number

	@BelongsTo(() => Subscription)
	subscription: Subscription

	@ForeignKey(() => User)
	@Column({ allowNull: false, type: DataType.INTEGER })
	user_id: number

	@BelongsTo(() => User)
	user: User
}
