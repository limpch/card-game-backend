import { Server } from "socket.io"
import PlayerSetup from "./PlayerSetup.game-model"
import { IRoomCharacter } from "src/types/character"
import { IRoomCard } from "src/types/room"
import Room from "./Room.game-model"

export default class Player {
	id: number
	name: string
	socket: Server
	ready: boolean = false
	room: Room

	setup: PlayerSetup = new PlayerSetup()

	constructor(id: number, name: string, socket: Server, room: Room) {
		this.id = id
		this.name = name
		this.socket = socket
		this.room = room

		this.setupSocket()
	}

	setReady(ready: boolean) {
		if (ready && (!this.setup.isFull() || this.room.status !== "setup")) return false
		this.ready = ready
		this.room.updateStatuses()

		return true
	}

	setDeck(deck: IRoomCard[] | null) {
		this.setup.setDeck(deck)
		this.setReady(false)
	}

	setCharacter(character: IRoomCharacter | null) {
		this.setup.setCharacter(character)
		this.setReady(false)
	}

	private setupSocket() {
		this.socket.on("setDeck", (deck: IRoomCard[]) => {
			if (this.room.status === "setup") this.setDeck(deck)
			else this.socket.emit("message", "Нельзя менять колоду во время игры")
		})

		this.socket.on("setCharacter", (character: IRoomCharacter) => {
			if (this.room.status === "setup") this.setCharacter(character)
			else this.socket.emit("message", "Нельзя менять персонажа во время игры")
		})

		this.socket.on("setReady", (ready: boolean) => {
			const isSet = this.setReady(ready)
			if (!isSet) this.socket.emit("message", "Вы не до конца настроили колоду и персонажа")
		})

		this.socket.on("castCard", (cardId: number, self?: boolean) => {
			if (!this.setup.haveCard(cardId)) return this.socket.emit("message", "У вас нет такой карты")

			this.room.sendToPlayers("playerCast", this.id, cardId, self)

			let results: any = null
			if (self) results = this.activateCard(cardId)
			else results = this.room.castCardOnAnotherPlayer(this.id, cardId)

			this.room.sendToPlayers("playerCastResults", results)
		})
	}

	activateCard(cardId: number) {
		return this.setup.useCard(cardId)
	}
}
