import GamePlayer from "../GamePlayer/GamePlayer.model"

export default class GameProcess {
	players: [GamePlayer, GamePlayer]
	roomId: string

	rounds: number = 0
	roundsLimit: number = 50

	actingPlayer: GamePlayer = null
	waitingPlayer: GamePlayer = null

	constructor(players: [GamePlayer, GamePlayer], roomId: string) {
		this.players = players
		this.roomId = roomId
	}
}
