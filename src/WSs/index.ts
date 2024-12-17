import { instrument } from "@socket.io/admin-ui"
import { Server } from "socket.io"
import { ApiError } from "src/common/ApiError"
import { gameRoomRouter } from "src/modules/game/GameRoom/GameRoom.router"
import gameStateService from "src/modules/game/GameState/gameState.service"
import gameUserService from "src/modules/game/GameUser/GameUser.service"
import { tokenService } from "src/modules/token/token.service"

export class WSs {
	io: Server

	constructor(server: any) {
		this.io = new Server(server, {
			cors: {
				origin: ["http://localhost:3000", "https://admin.socket.io"],
				credentials: true,
			},
		})

		instrument(this.io, {
			auth: false,
			mode: "development",
		})

		this.io.use((socket, next) => {
			const token = socket.handshake.headers.authorization
			if (!token) return next(new ApiError("Unauthorized"))
			const user = tokenService.verifyToken(token)
			socket.data.user = user
			next()
		})

		this.serveConnection()
	}

	serveConnection() {
		setInterval(() => {
			this.io.emit("state:online", gameStateService.getOnline())
		}, 1000)

		this.io.on("connection", socket => {
			const userPayload = socket.data.user
			const user = gameUserService.createUser(userPayload, socket.id)

			console.log(user)

			gameStateService.addUser(user)

			socket.on("disconnect", () => {
				gameStateService.removeUser(user.id)
			})

			gameRoomRouter(socket, user)
		})
	}
}
