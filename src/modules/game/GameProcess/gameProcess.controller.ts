import { Socket } from "socket.io"
import gameProcessService from "./gameProcess.service"
import { ICastPayload } from "src/types/cast"
import GameUser from "../GameUser/gameUser.model"
import { ApiError } from "src/common/ApiError"
import gameStateService from "../GameState/gameState.service"

class GameProcessController {
	cast(socket: Socket) {
		return (payload: ICastPayload) => {
			const user = socket.data.user as GameUser
			const inRoom = user.inRoom()
			if (!inRoom) throw new ApiError("Вы не в комнате")

			const room = gameStateService.findRoom(user.roomId)

			const gameProcess = room.gameProcess

			gameProcessService.cast(gameProcess, user.id, payload)
		}
	}
}

export default new GameProcessController()
