import { NextFunction, Request, Response } from "express"
import charactersService from "./characters.service"
import { responseToClient } from "src/helpers/responseToClient"
import CreateCharacterDto from "./dto/create-character.dto"
import UpdateCharacterDto from "./dto/update-character.dto"

class CharactersController {
	async getAllCharacters(req: Request, res: Response, next: NextFunction) {
		try {
			const characters = await charactersService.getAllCharacters()

			responseToClient(res, characters)
		} catch (error) {
			next(error)
		}
	}

	async createCharacter(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = new CreateCharacterDto(req.body)

			const character = await charactersService.createCharacter(dto)

			responseToClient(res, character)
		} catch (error) {
			next(error)
		}
	}

	async updateCharacter(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = new UpdateCharacterDto(req.body)
			const id = Number(req.params.id)

			const character = await charactersService.updateCharacter(id, dto)

			responseToClient(res, character)
		} catch (error) {
			next(error)
		}
	}

	async toggleActiveCharacter(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)
			const active = req.query.active ? Boolean(req.query.active) : undefined

			const character = await charactersService.toggleActiveCharacter(id, active)

			responseToClient(res, character)
		} catch (error) {
			next(error)
		}
	}

	async deleteCharacter(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			await charactersService.deleteCharacter(id)

			responseToClient(res, null)
		} catch (error) {
			next(error)
		}
	}
}

export default new CharactersController()
