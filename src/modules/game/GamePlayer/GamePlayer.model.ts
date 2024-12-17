import { ICharacter } from "src/types/character"
import { IDeck } from "src/types/deck"
import { IPlayerInfo } from "src/types/player"

export default class GamePlayer {
	playerInfo: IPlayerInfo
	deck: IDeck
	character: ICharacter

	constructor(playerInfo: IPlayerInfo, deck: IDeck, character: ICharacter) {
		this.playerInfo = playerInfo
		this.deck = deck
		this.character = character
	}

	getPayloadInfo() {
		return {
			playerInfo: this.playerInfo,
			character: this.character,
		}
	}
}
