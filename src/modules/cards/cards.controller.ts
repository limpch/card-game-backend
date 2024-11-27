import { NextFunction, Request, Response } from "express"
import { responseToClient } from "src/helpers/responseToClient"
import CreateCardDto from "./dto/create-card.dto"
import UpdateCardDto from "./dto/update-card.dto"
import cardsService from "./cards.service"

class CardsController {
	async getAllCards(req: Request, res: Response, next: NextFunction) {
		try {
			const cards = await cardsService.getAllCards()

			responseToClient(res, cards)
		} catch (error) {
			next(error)
		}
	}

	async createCard(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = new CreateCardDto(req.body)

			const card = await cardsService.createCard(dto)

			responseToClient(res, card)
		} catch (error) {
			next(error)
		}
	}

	async updateCard(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = new UpdateCardDto(req.body)
			const id = Number(req.params.id)

			const card = await cardsService.updateCard(id, dto)

			responseToClient(res, card)
		} catch (error) {
			next(error)
		}
	}

	async toggleActiveCard(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)
			const active = req.query.active ? Boolean(req.query.active) : undefined

			const card = await cardsService.toggleActiveCard(id, active)

			responseToClient(res, card)
		} catch (error) {
			next(error)
		}
	}

	async deleteCard(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			await cardsService.deleteCard(id)

			responseToClient(res, null)
		} catch (error) {
			next(error)
		}
	}
}

export default new CardsController()
