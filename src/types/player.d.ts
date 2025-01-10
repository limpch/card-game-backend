import GameUser from "src/modules/game/GameUser/gameUser.model"
import { ICharacter } from "./character"
import GameCharacterProcess from "src/modules/game/GameCharacterProccess/GameCharacterProcess.model"
import GamePlayer from "src/modules/game/GamePlayer/GamePlayer.model"

export interface IPlayerFromDb {
	id: number
	telegramId: string
	activeCharacter: ICharacter
}

export interface IPlayerInfo extends IPlayerFromDb {
	name: string
	socketId: string
}
