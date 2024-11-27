import { Card } from "src/models/Card.model"
import CreateCardDto from "./dto/create-card.dto"
import UpdateCardDto from "./dto/update-card.dto"

class CardsService {
	async getAllCards() {
		return Card.findAll()
	}

	async getCardById(id: number) {
		return Card.findOne({ where: { id } })
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

		if (!card) throw new Error("Card not found")

		for (const key in dto) {
			card[key] = dto[key]
		}
		await card.save()

		return card
	}

	async toggleActiveCard(id: number, active?: boolean) {
		const card = await this.getCardById(id)

		if (!card) throw new Error("Card not found")

		card.active = active ?? !card.active

		await card.save()

		return card
	}

	async deleteCard(id: number) {
		const card = await this.getCardById(id)

		if (!card) throw new Error("Card not found")

		await card.destroy()
	}
}

export default new CardsService()
