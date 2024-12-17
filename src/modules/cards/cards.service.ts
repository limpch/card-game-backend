import { Card } from "src/models/Card.model"
import CreateCardDto from "./dto/create-card.dto"
import UpdateCardDto from "./dto/update-card.dto"
import { ApiError } from "src/common/ApiError"

class CardsService {
	async getAllCards() {
		const cards = await Card.findAll({ where: { active: true } })

		return cards
	}

	async getAllFreeCards() {
		const cards = await Card.findAll({ where: { price: 0, active: true } })

		return cards
	}

	async getCardById(id: number) {
		const card = await Card.findOne({ where: { id } })

		return card
	}

	async createCard(dto: CreateCardDto) {
		const card = await Card.create({
			name: dto.name,
			description: dto.description,
			icon: dto.icon,
			color: dto.color,
			price: dto.price,
			specifications: dto.specifications,
		})

		return card
	}

	async updateCard(id: number, dto: UpdateCardDto) {
		const card = await this.getCardById(id)

		if (!card) throw new ApiError("Карта не найдена", 404)

		for (const key in dto) {
			card[key] = dto[key]
		}
		await card.save()

		return card
	}

	async deleteCard(id: number) {
		const card = await this.getCardById(id)

		if (!card) throw new ApiError("Карта не найдена", 404)

		await card.destroy()
	}
}

export default new CardsService()
