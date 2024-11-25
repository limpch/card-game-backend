import { Character } from "src/models/Character.model"
import { UserCharacter } from "src/models/UserCharacter.model"
import CreateCharacterDto from "./dto/create-character.dto"

class CharactersService {
	async getAllCharacters() {
		return Character.findAll()
	}

	async getCharactersByUser(userId: number) {
		return Character.findAll({
			include: [{ model: UserCharacter, where: { userId } }],
		})
	}

	async createCharacter(dto: CreateCharacterDto) {}
}

export default new CharactersService()
