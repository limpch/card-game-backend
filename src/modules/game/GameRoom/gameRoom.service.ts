import { Socket } from "socket.io"
import gameStateService from "../GameState/gameState.service"
import GameUser from "../GameUser/gameUser.model"
import GameRoom from "./GameRoom.model"
import { ApiError } from "src/common/ApiError"

class GameRoomService {
	createEmptyRoom() {
		return new GameRoom()
	}

	createRoom(user: GameUser, socket: Socket) {
		return async () => {
			const room = new GameRoom()
			gameStateService.addRoom(room)
			socket.emit("room:created", room.id)

			await room.join(user)

			user.joinRoom(room.id)
			socket.join(room.id)
		}
	}

	joinRoom(user: GameUser, socket: Socket) {
		return async (roomId: string) => {
			const userInRoom = user.inRoom()
			if (userInRoom) throw new ApiError("Вы уже в комнате")

			const room = gameStateService.findRoom(roomId)

			await room.join(user)

			user.joinRoom(roomId)
			socket.join(roomId)
		}
	}

	leaveRoom(user: GameUser, socket: Socket) {
		return () => {
			const roomId = user.roomId

			if (!roomId) throw new ApiError("Вы не в комнате")

			socket.leave(roomId)
			user.leaveRoom()

			const room = gameStateService.findRoom(roomId)
			room.leave(user)
		}
	}
}

export default new GameRoomService()
