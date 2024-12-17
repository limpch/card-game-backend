import { NextFunction, Request, Response } from "express"
import { ApiError } from "src/common/ApiError"

export default function roleMiddleware(role: string) {
	return (req: Request, res: Response, next: NextFunction) => {
		const user = req.user
		if (user.role !== role) throw new ApiError("Forbidden", 403)
		next()
	}
}
