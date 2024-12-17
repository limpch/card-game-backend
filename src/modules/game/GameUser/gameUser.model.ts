import { IUserPayload } from "src/types/user-payload"

export default class GameUser {
	readonly id: number
	readonly name: string
	readonly socketId: string

	roomId: string | null = null

	constructor(player: IUserPayload, socketId: string) {
		this.id = player.id
		this.name = player.name
		this.socketId = socketId
	}

	inRoom() {
		return this.roomId !== null
	}

	joinRoom(roomId: string) {
		this.roomId = roomId
	}

	leaveRoom() {
		this.roomId = null
	}
}
