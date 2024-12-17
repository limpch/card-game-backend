import GameRoom from "../GameRoom/GameRoom.model"
import GameUser from "../GameUser/gameUser.model"

export default class GameState {
	rooms: Map<string, GameRoom> = new Map()
	users: Map<number, GameUser> = new Map()
}
