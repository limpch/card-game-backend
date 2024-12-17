import { Socket } from "socket.io"
import gameRoomService from "../GameRoom/gameRoom.service"
import gameStateService from "../GameState/gameState.service"
import GameUser from "../GameUser/gameUser.model"

interface UserWithSocket {
	user: GameUser
	socket: Socket
}

class GameMatchmaking {
	usersInQueue: UserWithSocket[] = []

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

	private startMatchmakingTimer() {
		const isRoomsUnderLimit = gameStateService.isRoomsUnderLimit()
		const isUsersInQueueEnough = this.usersInQueue.length < 2

		const isCreateRoom = isUsersInQueueEnough && isRoomsUnderLimit

		let intervalTime = isCreateRoom ? 300 : 3000

		setTimeout(() => {
			if (isCreateRoom) {
				const firstUser = this.usersInQueue.shift()
				const secondUser = this.usersInQueue.shift()

				const room = gameRoomService.createEmptyRoom()
				gameStateService.addRoom(room)

				room.join(firstUser.user)
				room.join(secondUser.user)

				// TODO: start game
			}

			this.startMatchmakingTimer()
		}, intervalTime)
	}
}

export default new GameMatchmaking()
