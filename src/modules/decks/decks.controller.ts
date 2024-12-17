import { NextFunction, Request, Response } from "express"
import decksService from "./decks.service"
import { responseToClient } from "src/helpers/responseToClient"
import { ApiError } from "src/common/ApiError"
import { validationResult } from "express-validator"

class DecksController {
	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) throw new ApiError("Ошибка валидации", 400)

			const id = Number(req.params.id)
			const user = req.user
			const cards = req.body.cards

			await decksService.update(user.id, id, cards)

			return responseToClient(res, true)
		} catch (error) {
			next(error)
		}
	}
}

export default new DecksController()
