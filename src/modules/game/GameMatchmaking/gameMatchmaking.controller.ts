import { Socket } from "socket.io"
import gameMatchmakingModel from "./gameMatchmaking.model"

class GameMatchmakingController {
	startMatchmaking(socket: Socket) {
		return () => {
			const user = socket.data.user

			gameMatchmakingModel.addUserToQueue(user, socket)
			socket.emit("matchmaking:started")
		}
	}

	leaveMatchmaking(socket: Socket) {
		return () => {
			const user = socket.data.user

			gameMatchmakingModel.removeUserFromQueue(user)
			socket.emit("matchmaking:left")
		}
	}
}

export default new GameMatchmakingController()
