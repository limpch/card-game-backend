import { Socket } from "socket.io"
import gameRoomController from "./gameRoom.controller"
import { IWsRoute, wsRouter } from "src/helpers/wsRouter"

export const gameRoomRouter = (socket: Socket) => {
	const routes: IWsRoute[] = [
		{
			route: "room:create",
			handler: gameRoomController.createRoom(socket),
		},
		{
			route: "room:join",
			handler: gameRoomController.joinRoom(socket),
		},
		{
			route: "room:leave",
			handler: gameRoomController.leaveRoom(socket),
		},
	]

	wsRouter(socket, routes)
}
