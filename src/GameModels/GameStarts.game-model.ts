import Room from "./Room.game-model"

export default class GameStarts {
	room: Room

	startTimer: NodeJS.Timeout | null = null
	intervalTimer: NodeJS.Timeout | null = null

	constructor(room: Room) {
		this.room = room
	}

	startGameTimer() {
		this.room.status = "gameStarts"

		this.startTimer = setTimeout(() => {
			this.startGame()
			if (this.intervalTimer) clearInterval(this.intervalTimer)
		}, 5000)

		this.intervalTimer = setInterval(() => {
			this.room.sendToPlayers("gameStarts", this.startTimer)
		}, 1000)
	}

	startGame() {
		this.room.status = "play"
		this.room.sendToPlayers("gameIsStarted", null)
	}
}
