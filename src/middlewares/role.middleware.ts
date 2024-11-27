import { NextFunction, Request, Response } from "express"

export default function roleMiddleware(role: string) {
	return (req: Request, res: Response, next: NextFunction) => {
		const user = req.user
		if (user.role !== role) throw new Error("Forbidden")
		next()
	}
}
