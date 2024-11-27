import { Character } from "src/models/Character.model"
import CreateCharacterDto from "./dto/create-character.dto"
import UpdateCharacterDto from "./dto/update-character.dto"

class CharactersService {
	async getAllCharacters() {
		return Character.findAll()
	}

	async getCharacterById(id: number) {
		return Character.findOne({ where: { id } })
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

		if (!character) throw new Error("Character not found")

		for (const key in dto) {
			character[key] = dto[key]
		}
		await character.save()

		return character
	}

	async toggleActiveCharacter(id: number, active?: boolean) {
		const character = await this.getCharacterById(id)

		if (!character) throw new Error("Character not found")

		character.active = active ?? !character.active

		await character.save()

		return character
	}

	async deleteCharacter(id: number) {
		const character = await this.getCharacterById(id)

		if (!character) throw new Error("Character not found")

		await character.destroy()
	}
}

export default new CharactersService()
