import { Socket } from "socket.io"
import GameUser from "../GameUser/gameUser.model"
import gameRoomService from "./gameRoom.service"
import { IWsRoute, wsRouter } from "src/helpers/wsRouter"

export const gameRoomRouter = (socket: Socket, user: GameUser) => {
	const routes: IWsRoute[] = [
		{
			route: "room:create",
			handler: gameRoomService.createRoom(user, socket),
		},
		{
			route: "room:join",
			handler: gameRoomService.joinRoom(user, socket),
		},
		{
			route: "room:leave",
			handler: gameRoomService.leaveRoom(user, socket),
		},
	]

	wsRouter(socket, routes)
}
