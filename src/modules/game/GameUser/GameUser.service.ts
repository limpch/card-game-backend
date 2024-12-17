import { IUserPayload } from "src/types/user-payload"
import GameUser from "./gameUser.model"

class GameUserService {
	createUser(user: IUserPayload, socketId: string) {
		return new GameUser(user, socketId)
	}
}

export default new GameUserService()
