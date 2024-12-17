import { Socket } from "socket.io"
import GameUser from "../GameUser/gameUser.model"
import gameMatchmakingService from "./gameMatchmaking.service"
import { IWsRoute, wsRouter } from "src/helpers/wsRouter"

export const gameRoomRouter = (socket: Socket, user: GameUser) => {
	const routes: IWsRoute[] = [
		{
			route: "matchmaking:start",
			handler: gameMatchmakingService.startMatchmaking(user, socket),
		},
		{
			route: "matchmaking:leave",
			handler: gameMatchmakingService.leaveMatchmaking(user, socket),
		},
	]

	wsRouter(socket, routes)
}
