import { v4 } from "uuid"
import Player from "./Player.game-model"
import { IPlayerBase } from "src/types/player"
import { TRoomStep } from "src/types/room"
import GameStarts from "./GameStarts.game-model"

export default class Room {
	id: string
	players: [Player, Player] = [null, null]

	status: TRoomStep = "setup"
	isFull: boolean = false

	gameStarts: GameStarts = new GameStarts(this)

	private closeRoomCallbacks: (() => void)[] = []

	constructor() {
		this.id = v4()
	}

	playerConnect(playerData: IPlayerBase): boolean {
		if (this.isFull) return false

		const player = new Player(playerData.id, playerData.name, playerData.socket, this)

		if (this.players[0] === null) this.players[0] = player
		else this.players[1] = player

		this.updateStatuses()
		this.sendToPlayers("playerConnect", playerData)

		return true
	}

	playerDisconnect(playerData: IPlayerBase) {
		const playerToDisconnect = this.players.findIndex(p => p?.id === playerData.id)
		if (playerToDisconnect === -1) return

		this.players[playerToDisconnect] = null
		this.updateStatuses()
		this.sendToPlayers("playerDisconnect", playerData)
	}

	connectCloseRoom(cb: () => void) {
		this.closeRoomCallbacks.push(cb)
	}

	updateStatuses() {
		this.isFull = this.players.every(player => player !== null)
		const isCanStart = this.isFull && this.players.every(player => player?.ready)

		if (isCanStart) this.gameStarts.startGameTimer()

		const isRoomClear = this.players.every(player => player === null)
		if (isRoomClear) this.closeRoomCallbacks.forEach(cb => cb())
	}

	castCardOnAnotherPlayer(playerId: number, cardId: number) {
		const playerToCast = this.players.find(player => player?.id !== playerId)
		if (!playerToCast) return

		playerToCast.activateCard(cardId)
	}

	sendToPlayers(event: string, ...args: any[]) {
		this.players.forEach(player => player?.socket.emit(event, ...args))
	}
}
