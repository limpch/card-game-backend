import { NextFunction, Request, Response } from "express"
import { ApiError } from "src/common/ApiError"
import { tokenService } from "src/modules/token/token.service"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization

		if (!token) throw new ApiError("Вы не авторизованы. Перезайдите в игру!", 401)

		const userPayload = tokenService.verifyToken(token)

		req.user = userPayload
		next()
	} catch (error) {
		next(error)
	}
}
