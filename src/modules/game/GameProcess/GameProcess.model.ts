import { TGameProcessEvents } from "src/types/gameProccess"
import GamePlayer from "../GamePlayer/GamePlayer.model"
import ws from "src/WSs"

export default class GameProcess {
	players: GamePlayer[]
	roomId: string

	rounds: number = 0
	roundsLimit: number = 50

	actingPlayer: GamePlayer = null
	waitingPlayer: GamePlayer = null

	constructor(players: GamePlayer[], roomId: string) {
		this.players = players
		this.roomId = roomId
	}

	async start() {
		const firstPlayerToStep = this.flipCoin()
		this.actingPlayer = firstPlayerToStep
		this.waitingPlayer = this.players.find(
			player => player.playerInfo.id !== firstPlayerToStep.playerInfo.id
		)

		this.notifyPlayers(firstPlayerToStep.playerInfo.id, "firstAction")

		this.startRound()
	}

	flipCoin() {
		const random = Math.random()
		const playerIndex = random < 0.5 ? 0 : 1
		return this.players[playerIndex]
	}

	startRound() {
		this.rounds++

		const payload = {
			rounds: this.rounds,
			acting: this.actingPlayer.playerInfo.id,
		}

		this.notifyPlayers(payload, "roundStart")
	}

	notifyPlayers(payload: any, event: TGameProcessEvents) {
		ws.io.to(this.roomId).emit(event, payload)
	}
}
