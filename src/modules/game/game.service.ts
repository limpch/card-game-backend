import Game from "src/GameModels/Game.game-model"
import { IPlayerBase } from "src/types/player"

class GameService {
	game: Game

	constructor() {
		this.game = new Game()
	}

	createRoom() {
		const id = this.game.createRoom()
		return id
	}

	connectToRoom(id: string, player: IPlayerBase) {
		const room = this.game.getRoom(id)
		if (!room) throw new Error("Комната не найдена")

		room.playerConnect(player)
	}

	disconnectFromRoom(id: string, playerId: IPlayerBase) {
		const room = this.game.getRoom(id)
		if (!room) throw new Error("Комната не найдена")

		room.playerDisconnect(playerId)
	}
}

export default new GameService()
