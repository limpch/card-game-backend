import { Card } from "src/models/Card.model"
import { Character } from "src/models/Character.model"
import { User } from "src/models/User.model"
import { CreateUserDto } from "./dto/create-user.dto"
import { Deck } from "src/models/Deck.model"
import cardsService from "../cards/cards.service"
import { UserCard } from "src/models/UserCard.model"
import { UserCharacter } from "src/models/UserCharacter.model"
import charactersService from "../characters/characters.service"
import { IPlayerFromDb } from "src/types/player"

class UserService {
	async create(createUserDto: CreateUserDto) {
		const createdUser = await User.create({
			telegramId: createUserDto.telegramId,
			role: createUserDto.telegramId === 1 ? "admin" : "user",
		})

		const freeCards = await cardsService.getAllFreeCards()

		await UserCard.bulkCreate(
			freeCards.map(card => ({
				userId: createdUser.id,
				cardId: card.id,
			}))
		)

		const freeCharacters = await charactersService.getAllFreeCharacters()

		await UserCharacter.bulkCreate(
			freeCharacters.map(character => ({
				userId: createdUser.id,
				characterId: character.id,
			}))
		)

		await Deck.create({ user_id: createdUser.id })

		const user = await this.findExtendedOne(createUserDto.telegramId)

		return user
	}

	async findExtendedOne(telegramId: number) {
		const user = await User.findOne({
			where: { telegramId },
			include: [
				{ model: Card, as: "cards", attributes: ["id"], through: { attributes: [] } },
				{ model: Character, as: "characters", attributes: ["id"], through: { attributes: [] } },
				{
					model: Deck,
					as: "decks",
					attributes: ["id"],
					include: [{ model: Card, as: "cards", attributes: ["id"] }],
				},
				{ model: Character, as: "activeCharacter", attributes: ["id"] },
			],
		})

		return user
	}

	async findOneById(id: number) {
		const user = await User.findOne({
			where: { id },
			attributes: ["id", "telegramId", "activeCharacterId"],
			// include: [{ model: Character, as: "activeCharacter", attributes: ["id", "specifications"] }],
		})

		return user.dataValues as IPlayerFromDb
	}
}

export const userService = new UserService()
