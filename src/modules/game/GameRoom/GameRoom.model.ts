import GameUser from "../GameUser/gameUser.model"
import { nanoid } from "nanoid"
import { ApiError } from "src/common/ApiError"
import { ws } from "src/app"
import { userService } from "src/modules/user/user.service"
import decksService from "src/modules/decks/decks.service"
import GamePlayer from "../GamePlayer/GamePlayer.model"
import { IPlayerInfo } from "src/types/player"
import gameStateService from "../GameState/gameState.service"

export default class GameRoom {
	id: string
	players: [GamePlayer, GamePlayer] = [null, null]

	startTimerNumber: number = 60
	startTimerInterval: NodeJS.Timeout

	destroyRoomTimerNumber: number = 60
	destroyRoomTimerInterval: NodeJS.Timeout

	gameProcess = null

	constructor() {
		this.id = nanoid(8)
	}

	async join(user: GameUser) {
		if (!this.canJoin()) throw new ApiError("Комната заполнена")

		const extendedUser = await userService.findOneById(user.id)
		const userDeck = await decksService.getForGame(extendedUser.id)

		const _playerInfo: IPlayerInfo = {
			...extendedUser,
			activeCharacter: undefined,
			name: user.name,
			socketId: user.socketId,
		}

		const player = new GamePlayer(_playerInfo, userDeck, extendedUser.activeCharacter)

		const emptySlotIndex = this.players[0] === null ? 0 : 1
		this.players[emptySlotIndex] = player

		const roomInfoPayload = {
			players: this.players.map(player => player?.getPayloadInfo() || null),
			roomId: this.id,
		}

		ws.io.to(user.socketId).emit("room:joined", roomInfoPayload)
		ws.io.to(this.id).emit("room:update:joined", roomInfoPayload)

		// TODO: start game
		if (this.isFull()) this.startGame()
	}

	leave(user: GameUser) {
		if (this.players[0].playerInfo.id === user.id) this.players[0] = null
		else this.players[1] = null

		const roomInfoPayload = {
			players: this.players.map(player => player?.getPayloadInfo() || null),
			roomId: this.id,
		}

		ws.io.to(this.id).emit("room:update:leaved", roomInfoPayload)

		if (this.startTimerInterval) clearInterval(this.startTimerInterval)

		if (this.isEmpty()) gameStateService.removeRoom(this.id)
	}

	private startGame() {
		if (this.startTimerInterval) clearInterval(this.startTimerInterval)
		this.startTimerNumber = 60

		this.startTimerInterval = setInterval(() => {
			this.startTimerNumber--
			if (this.startTimerNumber === 0) {
				clearInterval(this.startTimerInterval)
				// TODO: start game
				// this.gameProcess = new GameProcess()
			}

			ws.io.to(this.id).emit("room:update:startTimer", this.startTimerNumber)
		}, 1000)
	}

	private isEmpty() {
		return this.players[0] === null && this.players[1] === null
	}

	private canJoin() {
		return this.players[0] === null || this.players[1] === null
	}

	private isFull() {
		return this.players[0] !== null && this.players[1] !== null
	}
}
