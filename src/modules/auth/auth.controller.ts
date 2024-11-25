import { NextFunction, Request, Response } from "express"
import { authService } from "./auth.service"
import { responseToClient } from "src/helpers/responseToClient"

class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { telegramLogin } = req.body
			const data = await authService.login(telegramLogin)
			res.cookie("token", data.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development",
			})
			responseToClient(res, data)
		} catch (error) {
			next(error)
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			responseToClient(res, "logout")
		} catch (error) {
			next(error)
		}
	}
}

export const authController = new AuthController()
