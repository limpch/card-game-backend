import { tokenService } from "../token/token.service"
import { userService } from "../user/user.service"
import { ITelegramUser } from "src/types/user"
import { IUserPayload } from "src/types/user-payload"

class AuthService {
	async login(telegramUser: ITelegramUser) {
		let user = await userService.findExtendedOne(telegramUser.username)
		if (!user) user = await userService.create({ telegramLogin: telegramUser.username })

		const payload: IUserPayload = {
			id: user.id,
			telegramLogin: user.telegramLogin,
			role: user.role,
			name: `${telegramUser.first_name} ${telegramUser.last_name}`,
		}

		const token = tokenService.generateToken(payload)

		return { user: { ...user.dataValues, ...telegramUser }, token }
	}
}

export const authService = new AuthService()
