import GameUser from "src/modules/game/GameUser/gameUser.model"
import { ICharacter } from "./character"

export interface IPlayerFromDb {
	id: number
	telegramLogin: string
	activeCharacter: ICharacter
}

export interface IPlayerInfo extends IPlayerFromDb {
	name: string
	socketId: string
}
