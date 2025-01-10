import { TGameProcessEvents } from "src/types/gameProccess"
import GameProcess from "./GameProcess.model"
import ws from "src/WSs"
import { Socket } from "socket.io"
import { ICastPayload } from "src/types/cast"
import { ApiError } from "src/common/ApiError"
import gameCharacterProcessService from "../GameCharacterProccess/gameCharacterProcess.service"

class GameProcessService {
	// Game process actions

	start(gameProcess: GameProcess) {
		const firstPlayerToStep = this.flipCoin(gameProcess)
		gameProcess.actingPlayer = firstPlayerToStep
		gameProcess.waitingPlayer = gameProcess.players.find(
			player => player.playerInfo.id !== firstPlayerToStep.playerInfo.id
		)

		this.notifyPlayers(gameProcess.roomId, firstPlayerToStep.playerInfo.id, "firstAction")

		this.startRound(gameProcess)
	}

	flipCoin(gameProcess: GameProcess) {
		const random = Math.random()
		const playerIndex = random < 0.5 ? 0 : 1
		return gameProcess.players[playerIndex]
	}

	startRound(gameProcess: GameProcess) {
		gameProcess.rounds++

		const payload = {
			rounds: gameProcess.rounds,
			acting: gameProcess.actingPlayer.playerInfo.id,
			playersInfo: gameProcess.players.map(player => player.playerInfo),
		}

		this.notifyPlayers(gameProcess.roomId, payload, "roundStart")
	}

	// Player actions

	cast(gameProcess: GameProcess, actingPlayerId: number, payload: ICastPayload) {
		this.notifyPlayers(gameProcess.roomId, payload, "castStarts")

		const isRightActingPlayer = gameProcess.actingPlayer.playerInfo.id === actingPlayerId

		if (!isRightActingPlayer) throw new ApiError("Сейчас не ваш ход!")

		setTimeout(() => {
			const card = this.getCard(gameProcess, payload.cardId)

			const target = payload.target === "me" ? gameProcess.actingPlayer : gameProcess.waitingPlayer

			if (!target) throw new ApiError("Цель не найдена")

			const onTargetResult = gameCharacterProcessService.castCard(
				target.characterProcess,
				card.specifications.ap,
				card.specifications.onTarget
			)
			let onCasterResult = null

			if (card.specifications.onCaster)
				onCasterResult = gameCharacterProcessService.castCard(
					gameProcess.actingPlayer.characterProcess,
					card.specifications.ap,
					card.specifications.onCaster
				)

			this.notifyPlayers(
				gameProcess.roomId,
				{
					castResult: {
						targetResult: onTargetResult,
						actingPlayerResult: onCasterResult,
						ap: card.specifications.ap,
					},
				},
				"castResults"
			)
		}, 300)
	}

	// helpers

	private getCard(gameProcess: GameProcess, cardId: number) {
		const card = gameProcess.actingPlayer.deck.cards.find(card => card.id === cardId)
		if (!card) throw new ApiError("У вас нет этой карты в колоде")
		return card
	}

	private getTarget(gameProcess: GameProcess, targetId: number) {
		const target = gameProcess.players.find(player => player.playerInfo.id === targetId)
		if (!target) throw new ApiError("Цель не найдена")

		return target
	}

	// notify

	private notifyPlayers(roomId: string, payload: any, event: TGameProcessEvents) {
		ws.io.to(roomId).emit(event, payload)
	}
}

export default new GameProcessService()
