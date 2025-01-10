import { Socket } from "socket.io"
import gameStateService from "../GameState/gameState.service"
import GameUser from "../GameUser/gameUser.model"
import GameRoom from "./GameRoom.model"
import { ApiError } from "src/common/ApiError"

class GameRoomController {
	createRoom(socket: Socket) {
		return async () => {
			const user = socket.data.user as GameUser
			const room = new GameRoom()
			gameStateService.addRoom(room)

			await room.join(user)

			user.joinRoom(room.id)
			socket.join(room.id)

			socket.emit("room:created", room.getRoomInfo())
		}
	}

	joinRoom(socket: Socket) {
		return async (roomId: string) => {
			const user = socket.data.user as GameUser
			const userInRoom = user.inRoom()
			if (userInRoom) throw new ApiError("Вы уже в комнате")

			const room = gameStateService.findRoom(roomId)

			await room.join(user)

			const roomInfoPayload = room.getRoomInfo()

			room.notifyPlayers(roomInfoPayload, "joined")

			user.joinRoom(roomId)
			await socket.join(roomId)
			socket.emit("room:joined", roomInfoPayload)
		}
	}

	leaveRoom(socket: Socket) {
		return async () => {
			const user = socket.data.user as GameUser
			const roomId = user.roomId

			if (!roomId) throw new ApiError("Вы не в комнате")

			const room = gameStateService.findRoom(roomId)

			if (room.isFromMatchmaking) {
				room.leave(user)

				await socket.leave(roomId)

				user.leaveRoom()

				room.notifyPlayers("matchmaking", "destroyed")
			} else {
				room.leave(user)

				await socket.leave(roomId)
				user.leaveRoom()

				room.notifyPlayers(room.getRoomInfo(), "leaved")
			}
		}
	}
}

export default new GameRoomController()
