import GameState from "./GameState.model"
import GameUser from "../GameUser/gameUser.model"
import GameRoom from "../GameRoom/GameRoom.model"
import { ApiError } from "src/common/ApiError"

class GameStateService {
	gameState: GameState

	roomsLimit: number = 50

	constructor() {
		this.gameState = new GameState()
	}

	addUser(user: GameUser) {
		this.gameState.users.set(user.id, user)
	}

	removeUser(userId: number) {
		this.gameState.users.delete(userId)
	}

	addRoom(room: GameRoom) {
		this.gameState.rooms.set(room.id, room)
	}

	removeRoom(roomId: string) {
		this.gameState.rooms.delete(roomId)
	}

	findRoom(roomId: string) {
		const room = this.gameState.rooms.get(roomId)

		if (!room) throw new ApiError("Комната не найдена")
		return room
	}

	isRoomsUnderLimit() {
		return this.gameState.rooms.size < this.roomsLimit
	}

	getOnline() {
		return this.gameState.users.size
	}
}

export default new GameStateService()
