import { NextFunction, Request, Response } from "express"
import { authService } from "./auth.service"
import { responseToClient } from "src/helpers/responseToClient"
import { validationResult } from "express-validator"
import { ApiError } from "src/common/ApiError"
import queryString from "query-string"
import { ITelegramUser } from "src/types/user"

class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) throw new ApiError(errors.array()[0].msg)

			const { telegramUserData } = req.body
			const { user } = queryString.parse(telegramUserData)

			const telegramUser = JSON.parse(user as string) as ITelegramUser

			const data = await authService.login(telegramUser)
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
