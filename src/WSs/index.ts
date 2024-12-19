import { instrument } from "@socket.io/admin-ui"
import { Server } from "socket.io"
import { ApiError } from "src/common/ApiError"
import { gameMatchmakingRouter } from "src/modules/game/GameMatchmaking/gameMatchmaking.router"
import { gameRoomRouter } from "src/modules/game/GameRoom/GameRoom.router"
import gameStateService from "src/modules/game/GameState/gameState.service"
import GameUser from "src/modules/game/GameUser/gameUser.model"
import { tokenService } from "src/modules/token/token.service"

class WSs {
	io: Server = null

	setupServer(server: any) {
		this.io = new Server(server, {
			cors: {
				origin: ["http://localhost:3000", "https://admin.socket.io"],
				credentials: true,
			},
		})

		// instrument(this.io, {
		// 	auth: false,
		// 	mode: "development",
		// })

		this.setupAuthMiddleware()
		this.serveConnection()
	}

	private setupAuthMiddleware() {
		this.io.use((socket, next) => {
			const token = socket.handshake.headers.authorization
			if (!token) return next(new ApiError("Unauthorized"))
			const _user = tokenService.verifyToken(token)

			const user = new GameUser(_user, socket.id)

			socket.data.user = user
			next()
		})
	}

	private serveConnection() {
		setInterval(() => {
			this.io.emit("state:online", gameStateService.getOnline())
		}, 1000)

		this.io.on("connection", socket => {
			const user = socket.data.user

			gameStateService.addUser(user)

			socket.on("disconnect", () => {
				gameStateService.removeUser(user.id)
			})

			gameRoomRouter(socket)
			gameMatchmakingRouter(socket)
		})
	}
}

const ws = new WSs()

export default ws
