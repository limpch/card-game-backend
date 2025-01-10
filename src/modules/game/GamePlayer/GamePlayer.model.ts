import { ICharacter } from "src/types/character"
import { IDeck } from "src/types/deck"
import { IPlayerInfo } from "src/types/player"
import GameCharacterProcess from "../GameCharacterProccess/GameCharacterProcess.model"

export default class GamePlayer {
	playerInfo: IPlayerInfo
	deck: IDeck
	character: ICharacter

	characterProcess: GameCharacterProcess

	constructor(playerInfo: IPlayerInfo, deck: IDeck, character: ICharacter) {
		this.playerInfo = playerInfo
		this.deck = deck
		this.character = character

		this.characterProcess = new GameCharacterProcess(character)
	}

	getPayloadInfo() {
		return {
			...this.playerInfo,
			socketId: undefined,
		}
	}

	reset() {
		this.character = null
	}
}
