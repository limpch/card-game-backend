import { Socket } from "socket.io"
import gameStateService from "../GameState/gameState.service"
import GameUser from "../GameUser/gameUser.model"
import GameRoom from "../GameRoom/GameRoom.model"
import ws from "src/WSs"

interface IMatchmakingUser {
	user: GameUser
	socket: Socket
}

class GameMatchmaking {
	usersInQueue: IMatchmakingUser[] = []

	constructor() {
		this.usersInQueue = []

		this.startMatchmakingTimer()
	}

	async addUserToQueue(user: GameUser, socket: Socket) {
		this.usersInQueue.push({ user, socket })
	}

	async removeUserFromQueue(user: GameUser) {
		this.usersInQueue = this.usersInQueue.filter(u => u.user.id !== user.id)
	}

	private async startMatchmakingTimer() {
		const isRoomsUnderLimit = gameStateService.isRoomsUnderLimit()
		const isUsersInQueueEnough = this.usersInQueue.length > 1

		const isCreateRoom = isUsersInQueueEnough && isRoomsUnderLimit

		let intervalTime = isCreateRoom ? 300 : 3000

		setTimeout(async () => {
			if (isCreateRoom) {
				const firstUser = this.usersInQueue.shift()
				const secondUser = this.usersInQueue.shift()

				const room = new GameRoom()
				room.isFromMatchmaking = true
				gameStateService.addRoom(room)

				firstUser.user.joinRoom(room.id)
				await room.join(firstUser.user)
				firstUser.socket.join(room.id)

				secondUser.user.joinRoom(room.id)
				await room.join(secondUser.user)
				secondUser.socket.join(room.id)

				room.notifyPlayers(room.getRoomInfo(), "matched")
			}

			this.startMatchmakingTimer()
		}, intervalTime)
	}
}

export default new GameMatchmaking()
