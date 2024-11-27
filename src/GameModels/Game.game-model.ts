import Room from "./Room.game-model"

export default class Game {
	private rooms: Map<string, Room> = new Map()

	createRoom() {
		const room = new Room()
		this.rooms.set(room.id, room)

		room.connectCloseRoom(() => {
			this.rooms.delete(room.id)
		})

		return room.id
	}

	getRoom(id: string) {
		return this.rooms.get(id)
	}
}
