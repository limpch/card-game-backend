import { Socket } from "socket.io"
import GameUser from "../GameUser/gameUser.model"
import gameMatchmakingModel from "./gameMatchmaking.model"

class GameMatchmakingService {
	startMatchmaking(user: GameUser, socket: Socket) {
		return () => {
			gameMatchmakingModel.addUserToQueue(user, socket)
			socket.emit("matchmaking:started")
		}
	}

	leaveMatchmaking(user: GameUser, socket: Socket) {
		return () => {
			gameMatchmakingModel.removeUserFromQueue(user)
			socket.emit("matchmaking:left")
		}
	}
}

export default new GameMatchmakingService()
