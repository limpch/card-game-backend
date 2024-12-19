import { Socket } from "socket.io"
import gameMatchmakingController from "./gameMatchmaking.controller"
import { IWsRoute, wsRouter } from "src/helpers/wsRouter"

export const gameMatchmakingRouter = (socket: Socket) => {
	const routes: IWsRoute[] = [
		{
			route: "matchmaking:start",
			handler: gameMatchmakingController.startMatchmaking(socket),
		},
		{
			route: "matchmaking:leave",
			handler: gameMatchmakingController.leaveMatchmaking(socket),
		},
	]

	wsRouter(socket, routes)
}
