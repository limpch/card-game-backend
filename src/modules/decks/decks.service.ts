import { ApiError } from "src/common/ApiError"
import { Card } from "src/models/Card.model"
import { Deck } from "src/models/Deck.model"
import { DeckCard } from "src/models/DeckCard.model"
import { IDeck } from "src/types/deck"

class DecksService {
	async create(userId: number) {
		const deck = await Deck.create({
			user_id: userId,
		})

		return deck
	}

	async get(userId: number, deckId?: number) {
		const deck = await Deck.findOne({
			where: { user_id: userId },
			include: [{ model: Card, as: "cards", attributes: ["id", "specifications"] }],
		})

		if (!deck) throw new ApiError("Доска не найдена", 404)

		return deck.dataValues
	}

	async getForGame(userId: number) {
		const deck = await Deck.findOne({
			where: { user_id: userId },
			attributes: ["id"],
			include: [{ model: Card, as: "cards", attributes: ["id", "specifications"] }],
		})

		if (!deck) throw new ApiError("Доска не найдена", 404)

		const cards = deck.dataValues.cards.map(card => ({
			...card.dataValues,
			specifications: JSON.parse(card.specifications),
		}))

		const deckData: IDeck = {
			id: deck.dataValues.id,
			cards,
		}

		return deckData
	}

	async update(userId: number, deckId: number, cards: number[]) {
		const deck = await this.get(userId, deckId)

		await DeckCard.destroy({ where: { deck_id: deck.id } })

		await DeckCard.bulkCreate(
			cards.map(card => ({
				deck_id: deck.id,
				card_id: card,
			}))
		)

		await deck.update({ cards })
	}
}

export default new DecksService()
