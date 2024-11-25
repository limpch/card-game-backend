import { User } from "src/models/User.model"

class UserService {
	create(createUserDto: any) {
		const user = User.create(createUserDto)
		return user
	}

	findOne(telegramLogin: string) {
		const user = User.findOne({ where: { telegramLogin } })
		return user
	}
}

export const userService = new UserService()
