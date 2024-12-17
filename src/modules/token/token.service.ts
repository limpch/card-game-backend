import jwt from "jsonwebtoken"
import { jwtConfig } from "src/configs/jwt.config"
import { IUserPayload } from "src/types/user-payload"

class TokenService {
	generateToken(payload: IUserPayload) {
		return jwt.sign(payload, jwtConfig().secret, {
			expiresIn: jwtConfig().expiresIn,
		})
	}

	verifyToken(token: string) {
		return jwt.verify(token.split(" ")[1], jwtConfig().secret) as IUserPayload
	}
}

export const tokenService = new TokenService()
