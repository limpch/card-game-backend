import { Response } from "express"

export const responseToClient = (res: Response, data: any, statusCode: number = 200) => {
	res.status(statusCode).json(data)
}
