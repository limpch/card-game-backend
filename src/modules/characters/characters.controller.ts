import { Request, Response } from "express"
import { Character } from "src/models/Character.model"

class CharactersController {
	async getAllCharacters(req: Request, res: Response) {
		const user = req.user
	}

	async getCharactersByPlayer(req: Request, res: Response) {
		const user = req.user
	}
}

export default new CharactersController()
