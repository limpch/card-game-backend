import jwt from "jsonwebtoken"
import { jwtConfig } from "src/configs/jwt.config"

class TokenService {
	async generateToken(userId: number, telegramLogin: string, role: string) {
		return jwt.sign({ id: userId, telegramLogin, role }, jwtConfig().secret, {
			expiresIn: jwtConfig().expiresIn,
		})
	}

	async verifyToken(token: string) {
		return jwt.verify(token, jwtConfig().secret)
	}
}

export const tokenService = new TokenService()
