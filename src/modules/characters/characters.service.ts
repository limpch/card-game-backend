import { Character } from "src/models/Character.model"
import CreateCharacterDto from "./dto/create-character.dto"
import UpdateCharacterDto from "./dto/update-character.dto"
import { ApiError } from "src/common/ApiError"

class CharactersService {
	async getAllCharacters() {
		const characters = await Character.findAll({ where: { active: true } })

		return characters
	}

	async getAllFreeCharacters() {
		const characters = await Character.findAll({ where: { price: 0, active: true } })

		return characters
	}

	async getCharacterById(id: number) {
		const character = await Character.findOne({ where: { id } })

		return character
	}

	async createCharacter(dto: CreateCharacterDto) {
		const character = await Character.create({
			name: dto.name,
			description: dto.description,
			image: dto.image,
			price: dto.price,
			specifications: dto.specifications,
		})

		return character
	}

	async updateCharacter(id: number, dto: UpdateCharacterDto) {
		const character = await this.getCharacterById(id)

		if (!character) throw new ApiError("Персонаж не найден", 404)

		for (const key in dto) {
			character[key] = dto[key]
		}
		await character.save()

		return character
	}

	async deleteCharacter(id: number) {
		const character = await this.getCharacterById(id)

		if (!character) throw new ApiError("Персонаж не найден", 404)

		await character.destroy()
	}
}

export default new CharactersService()
