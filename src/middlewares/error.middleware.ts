import { NextFunction, Request, Response } from "express"

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
	console.log(err)

	res.status(400).json({ message: err.message })
}
