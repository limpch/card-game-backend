import { NextFunction, Request, Response } from "express"
import { tokenService } from "src/modules/token/token.service"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization

	if (!token) return next(new Error("Unauthorized"))

	const userPayload = await tokenService.verifyToken(token)

	req.user = userPayload
}
