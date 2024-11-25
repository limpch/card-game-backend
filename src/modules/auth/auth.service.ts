import { tokenService } from "../token/token.service"
import { userService } from "../user/user.service"

class AuthService {
	async login(telegramLogin: string) {
		let user = await userService.findOne(telegramLogin)

		if (!user) user = await userService.create({ telegramLogin })

		console.log(user)

		const token = await tokenService.generateToken(user.id, user.telegramLogin)

		return { user, token }
	}
}

export const authService = new AuthService()
